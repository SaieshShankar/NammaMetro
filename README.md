# NammaMetro

**Web application · React · Express · MongoDB**

A metro application with user accounts, station information, fare calculation, booking pages, a map view, and lost-and-found features.

This repository is a fork of [Rotion769/NammaMetro](https://github.com/Rotion769/NammaMetro). The fork relationship does not establish individual authorship of every component.

## Explore the code

| Path | Purpose |
| --- | --- |
| [frontend/src/components/](frontend/src/components/) | Booking, fare, station, map, and account views |
| [frontend/src/context/](frontend/src/context/) | Authentication and theme state |
| [backend/routes/](backend/routes/) | Station, user, booking, and lost-and-found routes |
| [backend/models/](backend/models/) | MongoDB models |
| [backend/server.js](backend/server.js) | Express entry point |

## Local setup

Install Node.js and provide a MongoDB instance. In `backend/`, install dependencies and create a local `.env` with your own values:

```dotenv
MONGO_URI=mongodb://127.0.0.1:27017/nammametro
JWT_SECRET=replace-with-your-own-long-random-secret
PORT=5001
```

```bash
cd backend
npm install
node server.js
```

In another terminal:

```bash
cd frontend
npm install
npm start
```

The backend defaults to port 5001. Check frontend API addresses against your local backend before demonstrating.

## Current setup limitation

The committed `backend/server.js` ends with two stray backtick characters, which must be removed before Node can parse the entry point. This README records the issue; the application has not been launched or retested as part of the presentation cleanup.

This is a learning project. Screens and route names describe the implementation, rather than an affiliation with the metro operator or a live payment service.
