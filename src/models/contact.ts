import mongoose, { Document, Schema } from "mongoose";

// Define an interface for the Contact document
interface IContact extends Document {
  phoneNumber: string;
  email: string;
  linkedId: mongoose.Types.ObjectId;
  linkPrecedence: "primary" | "secondary";
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

// Define Mongoose schema for Contact
const contactSchema: Schema<IContact> = new Schema({
  phoneNumber: { type: String },
  email: { type: String },
  linkedId: { type: mongoose.Schema.Types.ObjectId },
  linkPrecedence: { type: String, enum: ["primary", "secondary"] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date },
});

// Create Contact model
const Contact = mongoose.model<IContact>("Contact", contactSchema);

export default Contact;
