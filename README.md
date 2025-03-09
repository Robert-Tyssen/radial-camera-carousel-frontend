# Radial Camera Carousel Frontend Repository

## Project Overview

This repository is the frontend component of the Radial Camera Carousel proof-of-concept, developed using Vite and React frameworks. More detail on the backend application and overall design of the Radial Camera Carousel can be found at its Github repository, [here](https://github.com/Robert-Tyssen/Radial-Camera-Carousel-API).

The front-end provides a simple form interface, where a user uses a dropdown interface to edit details for a set of sixteen photo slots. For each photo slot, a set of eight checkboxes can be used to identify which cameras should analyze the photo, and an optional photo can be submitted. Once all details are completed, the data can be submitted to the backend via its API.

After submission, a separate screen shows the status of the ongoing analysis, including which photos / cameras have completed their analyses, and time remaining for any ongoing analyses.

The frontend connects to the backend server by a user-inputted address field, which can be validated that a successful connection to the server was established. The default address is `http://127.0.0.1:8000` which is the default IP and port for the backend when deployed locally.

## Libraries Used

- Vite for TypeScript support and development server
- React for interactivity
- React-Router-DOM for routing
- Zod for schema validation and transformation
- Material-UI for user interface components and styling 

## Pre-Requisites
Before you begin, ensure you have the following software installed:
- Node.js (v16 or higher, 22.12.0 recommended): [Download Node.js](https://nodejs.org/)
- npm (comes with Node.js)
  
## Setup Instructions

1. **Clone the repository**
```
git clone https://github.com/Robert-Tyssen/radial-camera-carousel-frontend.git
cd radial-camera-carousel-frontend
```

2. **Install dependencies**
```
npm install
```

3. **Run the development server**
```
npm run dev
```

4. **(Optional) Run in production mode**

Create a production-ready version of the app by running the following command:
```
npm run build
```
This will generate a `\dist ` folder with the bundled application. The production-ready application can be previewed locally using:
```
npm run preview
```

## License
This project is licensed under the MIT license.
