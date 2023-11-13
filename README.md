
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
  - [react js .env](#react-js-(.env))
  - [node js config](#node-js-(config))
  - [Database setup](#database-setup)
  - [Razorpay setup](#razorpay-setup)
  - [Mail Setup for OTP](#mail-setup-for-otp)

- [Contribute](#contribute)
- [License](#license)

## Introduction

Hey there, I'm Kunal Lokhande, the guy who put together teeHaven, this MERN-powered eCommerce thing. Spent a good three months of my life on it, you know? It's not just code; it's a labor of love, making sure every bit feels just right. teeHaven isn't just a tech project; it's my take on creating a smooth, feature-packed online shopping trip. Pumped to share it with everyone!

And guess what? TeeHaven is open-source and totally free to use. I'm all about that community vibe, so if you're into tweaking, improving, or just curious, feel free to dive in. Let's make this thing even better together!

## Features

- all eCommerce features
- user login
- admin login
- email otp features
- invoice generator 
- product filter ( catogery and search )
- paymetgetway ( Razorpay )
- full dashboard

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
   git https://github.com/LinuxKunaL/eCommerce-TeeHaven-MERN.git
   cd eCommerce-TeeHaven-MERN
   ```

2. Install dependencies (*frontend / backend*) : 

   ```bash
   npm install
   ```

3. Run the development server (*frontend / backend*) : 
 
 - for react js ( frontend ) 
   ```bash
   npm start

   ```
    - for node js ( backend ) 
   ```bash
   node src/server.js

    # also use

   nodemon src/server.js

   ```

   The application will be accessible frontend at `http://localhost:3000` and backend at `http://localhost:9090` .

## react js ( .env )

Create a `.env` file in the root of the project and add the following variables:

```
REACT_APP_API_URL = "your_backend_api_url"
REACT_APP_CONTACT_EMAIL = "teeHaven@contact.com"
REACT_APP_CONTACT_NUMBER = "+91 344 432 3445"
```

Make sure to replace `your_backend_api_url` with your actual API URL .

## node js ( config )

open the ` backend/config/index.js ` of the project and replace the object pairs:

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

Make sure to replace `backend_web_url` , `secretKey_of_jwt` ,`Razorpay_key_id` ,`Razorpay_key_secret` ,`google_gmail_address` and `google_app_pass` .

## Database setup

open the ` backend/config/index.js ` of the project and replace the object pairs:

```
export default {
    ...

  Database: {
    url: "mongodb://127.0.0.1:27017", //mongodb server url
    db: "teeHaven" // Database name
  },

  ...
};

``` 
- #### add admin credentials  

make  `adminData` named collection in your Database and add this object data : 

```
{
  "_id": {
    "$oid": "6530f4431c009e9bc1f33243"
  },
  "userName": "adminUserName",
  "password": "adminPassword"
}

```
## Razorpay setup

- #### Create a Razorpay Account

1. Visit the [Razorpay website](https://razorpay.com/).
2. Sign up for a new account.
3. Complete the verification process.

- #### Get API Keys

1. Log in to your Razorpay Dashboard.
2. you can use **Test mode** for testing purpose
3. Navigate to the **Settings** > **API Keys** section.
4. Note down your **Key ID** and **Key Secret**.


## mail Setup for OTP 

we use free mail service by google

- #### Generate App Password

1. Go to your [Google Account](https://myaccount.google.com/).
2. search **App passwords** in TopBar
3. Enter a app name (e.g., "teeHaven SMTP") and click **Create**.
4. Note down the generated 16-digit **App password**.
5. if **App passwords** is not visible so Enable a **2 steps verification** on your google account

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
Feel free to customize the content as needed for your project.
