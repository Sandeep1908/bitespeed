title: Interactive API Documentation

sections:
  - title: Prerequisites
    content: |
      Before using the API, ensure you have the following set up:
      - Node.js installed on your machine
      - MongoDB database running and accessible
      - Environment variables configured (if applicable)

  - title: Getting Started
    steps:
      - title: Clone the repository
        content: |
          ```bash
          git clone https://github.com/yourusername/yourrepository.git
          cd yourrepository
          ```

      - title: Install dependencies
        content: |
          ```bash
          npm install
          ```

      - title: Set environment variables
        content: |
          Create a `.env` file in the root directory with the following variables:
          ```dotenv
          MONGO_URI: mongodb://localhost:27017/bitespeed
          PORT: 3000
          ```
          Replace `MONGO_URI` with your MongoDB connection string.

      - title: Start the server
        content: |
          ```bash
          npm start
          ```
          The server will start at `http://localhost:3000`.

  - title: Endpoint: `/api/identify`
    content: |
      This endpoint identifies and manages contacts based on provided `email` and `phoneNumber`.

    sub_sections:
      - title: `POST /api/identify`
        content: |
          #### Request Body

          ```yaml
          email: example@email.com
          phoneNumber: "+123456789"
          ```

          #### Example

          ```yaml
          curl -X POST http://localhost:3000/api/identify \
            -H "Content-Type: application/json" \
            -d '{"email": "example@email.com", "phoneNumber": "+123456789"}'
          ```

          #### Response

          - **200 OK**: Contact identified and managed successfully.
            ```yaml
            {
              message: "Contact updated"
            }
            ```

          - **500 Internal Server Error**: An error occurred during contact identification or management.
            ```yaml
            {
              error: "Error message"
            }
            ```

  - title: Error Handling
    content: |
      If an error occurs during identification or database operations, the API will respond with a `500` status code and an error message.

  - title: License
    content: |
      This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
