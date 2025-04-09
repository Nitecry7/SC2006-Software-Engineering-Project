# SG Homie 🏠

Welcome to **SG Homie** – a web application designed to simplify your housing journey in Singapore. Whether you're looking to buy, rent, or sell a property, SG Homie provides personalized recommendations, real-time property information, and seamless communication tools to connect buyers and sellers.

<p align="center">
  <img src="frontend/src/assets/img/logo.jpeg" alt="SG Homie Logo" width="200"/>
</p>

<div align="center">

[Frontend](frontend/) | [Backend](backend/) | [Demo Video](https://youtu.be/DUjzc5ec98E)

</div>

---

## Table of Contents
- [About SG Homie](#about-sg-homie)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Accessing the Application](#accessing-the-application)
- [Setup Instructions](#setup-instructions)
  - [Frontend Setup](#frontend-setup)
  - [Supabase Setup](#supabase-setup)
- [How It Works](#how-it-works)
- [External APIs](#external-apis)
- [Contributors](#contributors)

---

## About SG Homie

SG Homie is your one-stop platform for all your housing needs in Singapore. It lets you:

- 🔍 **Browse properties** for sale or rent.
- 📸 **View detailed property information**, including images, specifications, and interactive maps.
- 🏠 **List properties** for sale or rent if you're a seller.
- 💬 **Communicate with buyers or sellers** via integrated tools.

---

## Features

- **Personalized Recommendations**: 🤖 AI-powered suggestions based on your preferences.
- **Property Listings**: 🏢 Browse and filter properties by location, price, and type.
- **Interactive Maps**: 📍 View property locations and nearby amenities.
- **Seller Dashboard**: 📊 Manage property listings and track buyer interest.
- **Admin Dashboard**: 🛠️ Approve or reject property listings and manage users.
- **Secure Authentication**: 🔐 Sign up and log in using email or Google OAuth.

---

## Tech Stack

### Frontend
- **React**: For building the dynamic user interface.
- **TailwindCSS**: For styling and responsive design.
- **React Router**: For navigating between pages.
- **Vite**: For fast development and build tooling.

### Backend
- **Supabase**: For authentication, database management, and serverless functions.

---

## Accessing the Application

### Main Option: Access the Live Site
👉 **[SG Homie Live Site](https://sg-homie.netlify.app)**

### Secondary Option: Clone and Set Up Locally
If you'd like to run the application on your local machine, follow the instructions below.

---

## Setup Instructions

### Prerequisites
Before you begin, ensure you have:
- **Node.js** (v14 or higher)
- **npm** (for the frontend)

---

### Frontend Setup

1. **Clone the Repository**:
   ```bash
   git clone [repository-url]
   cd SGHomie-Updated
   
2. **Install Dependencies**:
  ```bash
  npm install
npm install

3. **Set Up Environment Variables: Create a .env file in the frontend directory and add:**
  ```bash
  VITE_SUPABASE_URL=https://your-supabase-url.supabase.co
  VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

3. Set Up Environment Variables: Create a `.env` file in the root directory and add:
```bash
VITE_SUPABASE_URL=https://your-supabase-url.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

4. Start the Development Server:
```bash
npm run dev

The application will be available at http://localhost:5173.

Supabase Setup
Create a Supabase Project:

Go to Supabase and create a new project.
Note down your SUPABASE_URL and SUPABASE_ANON_KEY.
Set Up Database:

Use the SQL migration files in the supabase/migrations/ folder to set up your database schema.
Navigate to the SQL editor in Supabase and run the migration scripts in order.
Configure Supabase Functions:

Deploy the serverless functions in the supabase/functions/ folder using the Supabase CLI:
Set Up Environment Variables:

Add your Supabase credentials to the .env file as shown in the Frontend Setup.
How It Works
For Buyers
Sign Up: Create an account using your email or Google.
Browse Properties: Use filters to find properties matching your preferences.
View Details: Click on a property to see images, specifications, and location.
Contact Sellers: Use integrated tools to connect with sellers.
For Sellers
Sign Up: Create an account and complete the seller verification process.
List Properties: Add property details, upload images, and submit for approval.
Manage Listings: Use the Seller Dashboard to edit or delete your listings.
Track Interest: View buyer interest and respond to inquiries.
For Admins
Log In: Access the Admin Dashboard.
Manage Listings: Approve or reject property submissions.
Manage Users: View and manage user accounts.
External APIs
Supabase
Authentication: Manages user sign-up, login, and session management.
Database: Stores user profiles, property listings, and interactions.
OneMap API
Geocoding: Converts addresses to coordinates for map integration.
Location Services: Provides nearby amenities and transport options.
Contributors
<table> <tr> <td align="center"> <a href="https://github.com/Nitecry7"> <img src="https://github.com/Nitecry7.png" width="100" height="100" style="border-radius: 50%;"><br /> <sub><b>Faheem</b></sub> </a> </td> <td align="center"> <a href="https://github.com/stevennoctavianus"> <img src="https://github.com/stevennoctavianus.png" width="100" height="100" style="border-radius: 50%;"><br /> <sub><b>Steven</b></sub> </a> </td> <td align="center"> <a href="https://github.com/Eishani"> <img src="https://github.com/Eishani.png" width="100" height="100" style="border-radius: 50%;"><br /> <sub><b>Eishani</b></sub> </a> </td> <td align="center"> <a href="https://github.com/vanillatte11037"> <img src="https://github.com/vanillatte11037.png" width="100" height="100" style="border-radius: 50%;"><br /> <sub><b>He Haoyu</b></sub> </a> </td> </tr> </table> ```


project/
├── frontend/           # Contains all frontend-related files
│   ├── src/            # React components and pages
│   ├── dist/           # Production build output (ignored in .gitignore)
│   ├── node_modules/   # Frontend dependencies (ignored in .gitignore)
│   ├── .vite/          # Vite cache (ignored in .gitignore)
│   ├── package.json    # Frontend dependencies and scripts
│   ├── vite.config.ts  # Vite configuration
│   └── .env            # Frontend environment variables
│
├── backend/            # Contains all backend-related files
│   ├── supabase/       # Supabase migrations and functions
│   ├── node_modules/   # Backend dependencies (if applicable, ignored in .gitignore)
│   ├── package.json    # Backend dependencies and scripts (if applicable)
│   ├── .env            # Backend environment variables
│   └── README.md       # Backend-specific documentation
│
├── .gitignore          # Git ignore rules
└── README.md           # Main project documentation