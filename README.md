# Passport

An Express-based API for applying for and issuing passports online.

Passport is the first service in the Digital City project, which aims to bring government (serikali) services online. The next service, for issuing national IDs, is [Identity](https://github.com/protmasat/identity).

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **Authentication:** JWT

## Prerequisites

Make sure you have the following installed before running the project:

- [Node.js](https://nodejs.org) v20.0.0 or higher
- [npm](https://npmjs.com) or yarn
- [MongoDB](https://www.mongodb.com/try/download/community) running locally

## Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/protmasat/passport
   cd passport
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**

   Copy the example environment file, then update the values with your local credentials.

   ```bash
   cp .env.example .env
   ```

4. **Create the admin account:**

   This uses the `EMAIL`, `PASSWORD` and `FULLNAME` values from your `.env` file.

   ```bash
   node scripts/createAdmin.js
   ```

5. **Start the development server:**

   ```bash
   npm run dev
   ```

   The server starts on `http://localhost:3400`.

## API Documentation

With the server running, the API documentation is available at [http://localhost:3400/docs](http://localhost:3400/docs).


## License

This project is licensed under the [MIT License](LICENSE).