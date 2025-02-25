# Vitals Report

Always wanted to keep track on your friend's diabetes vitals?  
Well, same :)

![Logo](application-screenshot.png)

## Table of Contents

- [Known Problems](#-known-problems)
- [Getting Started](#-setup)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Email Config](#email-config)
  - [Data Storage](#data-storage)
- [Run the Project](#-run-the-project)
- [Project Structure](#-project-structure)
- [Tests](#-tests)
- [Built With](#-built-with)


## 🚧 Known Problems

Some problems or issues that the project has currently and are on the to-do list.  
- ⚠️ Sending email doesn't seem to work anymore for outlook or any other service besides gmail. 
- The UI in the admin panel is still not optimized for mobile and has some usability issues  
- The _dark_ and _unicorn_ themes are not updated  
- The backend dummy data needs some refactoring  
- The name of the report owner should be customizable  

## 🏁 Setup

These instructions will get you a copy of the project up and running on your local machine for development purposes.

### Prerequisites

Make sure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/) (version 21.x or higher)
- [npm](https://www.npmjs.com/) (or [Yarn](https://yarnpkg.com/))
- [Git](https://git-scm.com/)

### Environment Variables 

Create a `.env` file in the root of both the backend (api-proxy) and frontend (web) directories and add the necessary environment variables:
#### Backend  
```env
PORT=5000                                 # if you change the port, remember to change it in the .env file of the frontend, too
API_URL=https://api.example.com           # use a real url of the api where you get the vitals data from (if you don't know, use the dummy data)
FRONTEND_URL=http://localhost:5173        # use the real url of where your frontend is running (for local developing leave localhost)
OPENAI_API_KEY=your_openai_api_key        # use a real openAI private api key if you have one (if not use the dummy data)
USE_DUMMY_DATA=true                       # set this to false if you want to make the actual api calls. Leave it to true if you want to have the dummy data returned                
EMAIL_SERVICE=gmail                       # your email service (gmail, outlook, yahoo etc)
EMAIL_PASSWORD=your_email_password        # your email password
EMAIL_USER=your@gmail.de                  # the email you want to send confirmation emails from to the user
APP_PASSWORD=ashfndssldievhth             # the app password generated from your Google account to allow third parties access to gmail
JWT_SECRET=jwt_secret_key                 # some random string. (https://dev.to/tkirwa/generate-a-random-jwt-secret-key-39j4)
INITIAL_USER_USERNAME=Hyunbin             # the username of your initial user (it will be an admin with full rights)
INITIAL_USER_EMAIL=hyunbin@cute.com       # the email of the initial user
INITIAL_USER_PASSWORD=password123         # the password of the initial user
MONGODB_URI=mongodb://cluster             # the key to the MongoDB database (connection string)
```    
#### Frontend
```env
VITE_API_URL=http://localhost:5000        # use the real url of where your server is running. If you use the backend you started locally, you can use localhost and the port you chose.
```

### Email Config
> 🚨 Sending Emails works only through a **gmail** account at the moment 🚨

There are still some problems with the nodemailer and sending the registration invitation.   
Right now it works for **gmail** only.  
If you are using a gmail account to send emails from you need to:
1. allow 2 factor authentication for your Google account
2. create an _app password_ 
3. store the _app password_ as the `APP_PASSWORD` variable in your `.env` file

Look at these if you are confused:  
- [How to create an app password](https://knowledge.workspace.google.com/kb/how-to-create-app-passwords-000009237?hl=en)
- [Sending Emails in Node.js with Nodemailer & Gmail | Step-by-Step Tutorial](https://www.youtube.com/watch?v=QDIOBsMBEI0)


### Data Storage 

#### 🚨 **OLD METHOD** 🚨
The Node.js backend persists data simply by storing it into a json file.  
This file is not pushed to github, instead it will be created automatically if it doesn't exist already.  
It will also create a user with the information you stored in the environmental variables `INITIAL_USER_USERNAME`, `INITIAL_USER_EMAIL`, `INITIAL_USER_PASSWORD` and all the rights there are. The user will thus be an admin with full rights, so choose carefully.

> **NOTE**
> only history data is still stored in the `store.json`file. Users and guesses are taken from the database, this means that the initial user is not important anymore and will be removed in the future.

An example of the content of the `store.json` file after it is created:  
```json
{
  "users": [
    {
      "username": "Hyunbin",
      "email": "hyunbin@cute.com",
      "password": "$2a$08$GqS47t9eJ2519d0VOU4SH.jHUS7jXW4USF8GM61kz3sKhHN9tRmM.",
      "rights": [
        "chart",
        "vitals-details",
        "create-account"
      ]
    }
  ]
}
```

#### 🚨 **NEW METHOD** 🚨

The backend stores data in a MongoDB database.  
For the database operations [mongoose](https://mongoosejs.com/) is used instead of the mongodb package.  

Since the connection to the database is limited to specific IP addresses, the server logs the current IP address when it is started.  
If the connection to the database doesn't work, one issue might be that the IP address was changed. In that case copy the logged IP address and grant it access in the MongoDB interface.   


## 🚀 Run the Project

🚨 Install all dependencies with `npm install` in the respective `web` and `api-proxy` folders if you run the api-proxy/frontend for the first time.  

### Backend

Navigate into the `api-proxy` folder and start the server.  
```
cd api-proxy
node index.js
```
if you want the server to restart every time you change something in the backend files, run this instead: 
```
cd api-proxy
npm run server
```
### Frontend

The frontend is a react app running with vite.  
Navigate into the frontend folder, the `web` folder, and run the react app.  
```
cd web
npm run dev
```

## 📂 Project Structure

```js
project-root   
├── api-proxy  // backend api-proxy (Node.js)
│   ├── index.js    // server entry file
│   ├── store.json  // will be created and populated automatically when running the server for the first time
│   ├── .env        // write your environment varibales here     
│   ├── controllers   // all controllers: logic of the api calls
│   ├── middleware   // middleware software like authorization checks
│   ├── models   // all models defined to store data in the mongodb database
│   ├── routes   // all routes of the api that can be used by the frontend
│   ├── services   // all services that handle interactions with the database
│   ├── utils   // all utils functions
│   ├── config.json    // put here any global constants
│   ├── db.js   // initialization and connection of the database
│   ├── package.json    
│   └── ...
├── web   // frontend    
│   ├── src
│   │   ├── assets   // put any img, svg etc here
│   │   ├── components   // put any component files here (feel free to nest it further)
│   │   ├── pages   // put any page files here 
│   │   ├── hooks    // put any custom hooks here
│   │   ├── providers    // put any contexts or providers here
│   │   ├── styles    // put any styles of components here
│   │   └── ...    
│   ├── .env    // write your environment varibales here
│   ├── package.json    
│   └── ...    
└── README.md 
```

## 🧪 Tests

### Backend

The Node.js backend has some very basic tests, implemented just for fun and for learning.  
Feel free to check it out on the **node-tests** branch.  

To run the tests simply run
```
npm run test
```

## 🔨 Built With

**Backend**   
- Node.js
- Express
- Jest
- Supertest

**Frontend**
- React
- Vite
- SCSS
- Typescript
- Tanstack Query
- Recharts
- Radix 
