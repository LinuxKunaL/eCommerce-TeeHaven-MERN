
# TeeHaven eCommerce Website

![TeeHaven Logo](https://raw.githubusercontent.com/LinuxKunaL/eCommerce-TeeHaven-MERN/eb0b4dde00a54a0b86fd6c049bcb2652a4960970/frontend/src/assets/svg/logo.svg)

Welcome to teeHaven, an eCommerce website developed using React.js, Node.js, Express.js, Redux, and MongoDB.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
  - [react js .env](#environment-variables)
  - [node js config](#environment-variables)
- [Contribute](#contribute)
- [License](#license)

## Introduction

[Add a brief introduction about teeHaven and its purpose.]

## Features

- [List key features of your eCommerce website.]

## Tech Stack

- React.js ![react logo](https://skillicons.dev/icons?i=react)
- Node.js ![Node.js logo](https://skillicons.dev/icons?i=nodejs)
- Express.js ![Express.js logo](https://skillicons.dev/icons?i=expressjs)
- Redux ![Redux logo](https://skillicons.dev/icons?i=redux)
- MongoDB ![MongoDB logo](https://skillicons.dev/icons?i=mongo)

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/teeHaven.git
   cd teeHaven
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm start
   ```

   The application will be accessible at `http://localhost:3000`.

### react js .env

Create a `.env` file in the root of the project and add the following variables:

```
REACT_APP_API_URL =your_backend_api_url
REACT_APP_CONTACT_EMAIL = "teeHaven@contact.com"
REACT_APP_CONTACT_NUMBER = "+91 344 432 3445"
```

Make sure to replace `your_backend_api_url` with your actual API URL .

### node js config

Create a `.env` file in the root of the project and add the following variables:

```
export default {
  Server: {
    port: 9090,
    webUrl: "backend_web_url", // ex ... http://localhost:9090
  },
  Database: {
    url: "mongodb://127.0.0.1:27017",
    db: "teeHaven"
  },
  Jwt: {
    secretKey: "secretKey_of_jwt",
  },
  Razorpay: {
    key_id: "Razorpay_key_id",
    key_secret: "Razorpay_key_secret",
  },
  GoogleSMTP: {
    host: "smtp.gmail.com",
    port: 465,
    user: "google_gmail_address", // ex .. abcd@gmail.com
    pass: "google_app_pass",  // ex .. gfhd sddf trrv rtri
  },
};

```

Make sure to replace `backend_web_url` , `backend_web_url` ,`backend_web_url` ,`backend_web_url` ,`backend_web_url` `backend_web_url` , and `backend_web_url`  with your actual API URL .

## Contribute

We welcome contributions! To contribute to teeHaven, follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature`.
3. Commit your changes: `git commit -m 'Add your feature'`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
```

Feel free to customize the content as needed for your project. Don't forget to replace placeholders like `your-username`, `your_backend_api_url`, and `your_secret_key` with your actual information.
