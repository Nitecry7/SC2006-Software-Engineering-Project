# SG Homie 🏠

Welcome to **SG Homie**, a web application designed to simplify the housing journey in Singapore. Whether you're looking to buy, rent, or sell a property, SG Homie provides personalized recommendations, real-time property information, and seamless communication tools to connect buyers and sellers.

<p align="center">
  <img src="src/assets/img/logo.jpeg" alt="SG Homie Logo" width="200"/>
</p>

<div align="center">

[Frontend](frontend/) | [Backend](backend/) | [Demo Video](https://youtu.be/DUjzc5ec98E)

</div>

---

## Table of Contents
- [About SG Homie](#about-sg-homie)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
  - [Frontend Setup](#frontend-setup)
  - [Supabase Setup](#supabase-setup)
- [How It Works](#how-it-works)
- [External APIs](#external-apis)
- [Contributors](#contributors)

---

## About SG Homie

SG Homie is a one-stop platform for all your housing needs in Singapore. It allows users to:
- Browse properties for sale or rent.
- View detailed property information, including images, specifications, and interactive maps.
- List properties for sale or rent as a seller.
- Communicate with buyers or sellers through integrated tools.

---

## Features

- **Personalized Recommendations**: AI-powered suggestions based on user preferences.
- **Property Listings**: Browse and filter properties by location, price, and type.
- **Interactive Maps**: View property locations and nearby amenities.
- **Seller Dashboard**: Manage property listings and track buyer interest.
- **Admin Dashboard**: Approve or reject property listings and manage users.
- **Secure Authentication**: Sign up and log in using email or Google OAuth.

---

## Tech Stack

### Frontend
- **React**: For building the user interface.
- **TailwindCSS**: For styling and responsive design.
- **React Router**: For navigation between pages.
- **Vite**: For fast development and build tooling.

### Backend
- **Supabase**: For authentication, database management, and serverless functions.

### External APIs
- **OneMap API**: For geocoding and location-based services.

---

## Setup Instructions

Follow these steps to set up SG Homie on your local machine.

### Prerequisites
Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher) and npm (for the frontend).

---

### Frontend Setup

1. **Clone the Repository**
   ```bash
   git clone [repository-url]
   cd SGHomie Updated
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in the root directory and add:
   ```env
   VITE_SUPABASE_URL=https://your-supabase-url.supabase.co
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **Start the Development Server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

---

### Supabase Setup

1. **Create a Supabase Project**
   - Go to [Supabase](https://supabase.com/) and create a new project.
   - Note down your `SUPABASE_URL` and `SUPABASE_ANON_KEY`.

2. **Set Up Database**
   - Use the SQL migration files in the `supabase/migrations/` folder to set up your database schema.
   - Navigate to the SQL editor in Supabase and run the migration scripts in order.

3. **Configure Supabase Functions**
   - Deploy the serverless functions in the `supabase/functions/` folder using the Supabase CLI:
     ```bash
     supabase functions deploy [function-name]
     ```

4. **Set Up Environment Variables**
   - Add your Supabase credentials to the `.env` file as shown in the [Frontend Setup](#frontend-setup).

---

## How It Works

### For Buyers
1. **Sign Up**: Create an account using your email or Google.
2. **Browse Properties**: Use filters to find properties that match your preferences.
3. **View Details**: Click on a property to see images, specifications, and location.
4. **Contact Sellers**: Use the integrated tools to connect with sellers.

### For Sellers
1. **Sign Up**: Create an account and complete the seller verification.
2. **List Properties**: Add property details, upload images, and submit for approval.
3. **Manage Listings**: Use the Seller Dashboard to edit or delete listings.
4. **Track Interest**: View buyer interest and respond to inquiries.

### For Admins
1. **Log In**: Access the Admin Dashboard.
2. **Manage Listings**: Approve or reject property submissions.
3. **Manage Users**: View and manage user accounts.

---

## External APIs

### Supabase
- **Authentication**: Handles user sign-up, login, and session management.
- **Database**: Stores user profiles, property listings, and interactions.

### OneMap API
- **Geocoding**: Converts addresses into coordinates for map integration.
- **Location Services**: Provides nearby amenities and transport options.

---

## Contributors

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/faheemfaizal">
        <img src="https://github.com/faheemfaizal.png" width="100" height="100" style="border-radius: 50%;"><br />
        <sub><b>Faheem Faizal</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/HeHao">
        <img src="https://github.com/HeHao.png" width="100" height="100" style="border-radius: 50%;"><br />
        <sub><b>He Hao</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/Steven">
        <img src="https://github.com/Steven.png" width="100" height="100" style="border-radius: 50%;"><br />
        <sub><b>Steven</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/Eishani">
        <img src="https://github.com/Eishani.png" width="100" height="100" style="border-radius: 50%;"><br />
        <sub><b>Eishani</b></sub>
      </a>
    </td>
  </tr>
</table>