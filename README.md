title: Bitespeed Backend Task: Identity Reconciliation

sections:
  - title: Overview
    content: |
      You are required to design a web service with an endpoint `/identify` that will receive HTTP POST requests with JSON body containing either an `email` or `phoneNumber` or both. The service should consolidate contacts based on the provided data and return a JSON payload in a specific format.

  - title: Endpoint: `/identify`
    content: |
      This endpoint processes identity reconciliation based on provided `email` and `phoneNumber`.

    sub_sections:
      - title: `POST /identify`
        content: |
          #### Request Body

          ```yaml
          {
            "email": "example@email.com",
            "phoneNumber": "+123456789"
          }
          ```

          - **email** (optional): Contact's email address.
          - **phoneNumber** (optional): Contact's phone number.

          #### Example

          ```yaml
          curl -X POST http://localhost:3000/identify \
            -H "Content-Type: application/json" \
            -d '{"email": "example@email.com", "phoneNumber": "+123456789"}'
          ```

          #### Response

          - **200 OK**: Identity reconciliation successful.
            ```yaml
            {
              "contact": {
                "primaryContactId": 1,
                "emails": ["example@email.com"],
                "phoneNumbers": ["+123456789"],
                "secondaryContactIds": [2, 3]
              }
            }
            ```

            - **primaryContactId**: ID of the primary contact.
            - **emails**: Array of email addresses, with the first element being the email of the primary contact.
            - **phoneNumbers**: Array of phone numbers, with the first element being the phone number of the primary contact.
            - **secondaryContactIds**: Array of IDs of secondary contacts.

  - title: Error Handling
    content: |
      If an error occurs during identification or database operations, the API will respond with a `500` status code and an error message.

  - title: License
    content: |
      This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
