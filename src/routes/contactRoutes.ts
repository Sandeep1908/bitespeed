// src/routes/contactRoutes.ts
import { Router, Request, Response } from 'express';
import Contact from '../models/contact.js'

const router = Router();

router.post('/identify', async (req: Request, res: Response) => {
  const { email, phoneNumber } = req.body;

  try {
    let toBePrimary = await Contact.findOne({ email });
    let toBeSecondary = await Contact.findOne({
      phoneNumber,
      $nor: [{ linkPrecedence: 'secondary' }],
    });

    if (toBePrimary && toBeSecondary) {
      await Contact.updateOne(
        { _id: toBeSecondary._id },
        { $set: { linkedId: toBePrimary._id, linkPrecedence: 'secondary' } }
      );
      return res.status(200).json({ message: 'Contact updated' });
    }

    let primaryContact = await Contact.findOne({
      $or: [{ email }, { phoneNumber }],
      linkPrecedence: 'primary',
    });

    if (!primaryContact) {
      primaryContact = await Contact.create({
        email,
        phoneNumber,
        linkedId: null,
        linkPrecedence: 'primary',
      });
    } else {
      let isSecondaryContactPresent = await Contact.findOne({
        $and: [{ email }, { phoneNumber }],
        linkPrecedence: 'secondary',
      });

      if (!isSecondaryContactPresent) {
        await Contact.create({
          email,
          phoneNumber,
          linkedId: primaryContact._id,
          linkPrecedence: 'secondary',
        });
      }
    }

    const allContacts = await Contact.find({
      $or: [{ _id: primaryContact._id }, { linkedId: primaryContact._id }],
    });

    const contactRes = {
      primaryContactId: primaryContact._id,
      emails: [...new Set(allContacts.map((c:any) => c.email).filter(Boolean))],
      phoneNumbers: [...new Set(allContacts.map((c:any) => c.phoneNumber).filter(Boolean))],
      secondaryContactIds: allContacts
        .filter((item:any) => item.linkPrecedence === 'secondary')
        .map((cur:any) => cur._id),
    };

    res.status(200).json({ contact: contactRes });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get('/getcontacts', async (req: Request, res: Response) => {
  const contacts = await Contact.find();
  return res.status(200).json({ message: contacts });
});

export default router;
