# Vitals Report

Always wanted to keep track on your friend's diabetes vitals?  
Well, us too :)

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Run the Project](#run-the-project)
- [Project Structure](#project-structure)
- [Built With](#built-with)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development purposes.

## Prerequisites

Make sure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/) (version 21.x or higher)
- [npm](https://www.npmjs.com/) (or [Yarn](https://yarnpkg.com/))
- [Git](https://git-scm.com/)

## Environment Variables 

Create a `.env` file in the root of both the backend (api-proxy) and frontend (web) directories and add the necessary environment variables:
**Backend**   
```js
PORT=5000                                 // if you change the port, remember to change it in the .env file of the frontend, too
API_URL=https://api.example.com           // use a real url of the api where you get the vitals data from (if you don't know, use the dummy data)
OPENAI_API_KEY=your_openai_api_key        // use a real openAI private api key if you have one (if not use the dummy data)
USE_DUMMY_DATA=true                       // set this to false if you want to make the actual api calls. Leave it to true if you want to have the dummy data returned
```

**Frontend**   
```js
VITE_API_URL=http://localhost:5000          // use the real url of where your server is running. If you use the backend you started locally, you can use localhost and the port you chose.
```

## Run the Project

🚨 Install all dependencies with `npm install` in the respective `web` and `api-proxy` folders if you run the server/frontend for the first time.  


**Backend**   

The backend is a small server that proxies the api requests.  
Navigate into the backend folder, the `api-proxy` folder, and run the server.  
```
cd api-proxy
node index.js
```

**Frontend**  

The frontend is a react app running with vite.  
Navigate into the frontend folder, the `web` folder, and run the react app.  
```
cd web
npm run dev
```

## Project Structure

```js
project-root   
├── api-proxy  // backend    
│   ├── index.js   // server file      
│   ├── .env       // write your environment varibales here
│   ├── package.json    
│   └── ...
├── web   // frontend    
│   ├── src
│   │   ├── assets   // put any img, svg etc here
│   │   ├── components   // put any component files here (feel free to nest it further)
│   │   ├── hooks    // put any custom hooks here
│   │   ├── styles    // put any styles of components here
│   │   └── ...    
│   ├── .env    // write your environment varibales here
│   ├── package.json    
│   └── ...    
└── README.md 
```

## Built With

**Backend**   
- Node.js
- Express

**Frontend**
- React
- Vite
- SCSS
- Typescript
