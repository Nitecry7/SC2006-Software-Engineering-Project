SG Homie 🏠
Welcome to SG Homie – a web application designed to simplify your housing journey in Singapore. Whether you're looking to buy, rent, or sell a property, SG Homie provides personalized recommendations, real-time property information, and seamless communication tools to connect buyers and sellers.


Frontend | Backend | Demo Video

Table of Contents
About SG Homie

Features

Tech Stack

Accessing the Application

Setup Instructions

Frontend Setup

Supabase Setup

How It Works

External APIs

Contributors

About SG Homie
SG Homie is your one-stop platform for all your housing needs in Singapore. It lets you:

🔍 Browse properties for sale or rent.

📸 View detailed property information, including images, specifications, and interactive maps.

🏠 List properties for sale or rent if you're a seller.

💬 Communicate with buyers or sellers via integrated tools.

Features
Personalized Recommendations: 🤖 AI-powered suggestions based on your preferences.

Property Listings: 🏢 Browse and filter properties by location, price, and type.

Interactive Maps: 📍 View property locations and nearby amenities.

Seller Dashboard: 📊 Manage property listings and track buyer interest.

Admin Dashboard: 🛠️ Approve or reject property listings and manage users.

Secure Authentication: 🔐 Sign up and log in using email or Google OAuth.

Tech Stack
Frontend
React: For building the dynamic user interface.

TailwindCSS: For styling and responsive design.

React Router: For navigating between pages.

Vite: For fast development and build tooling.

Backend
Supabase: For authentication, database management, and serverless functions.

Accessing the Application
Main Option: Access the Live Site
👉 SG Homie Live Site

Secondary Option: Clone and Set Up Locally
If you'd like to run the application on your local machine, follow the instructions below.

Setup Instructions
Prerequisites
Before you begin, ensure you have:

Node.js (v14 or higher)

npm (for the frontend)

Frontend Setup
Clone the Repository:

bash
Copy
git clone [repository-url]
cd SGHomie-Updated
Install Dependencies:

bash
Copy
npm install
Set Up Environment Variables:

Create a .env file in the root directory and add:

env
Copy
VITE_SUPABASE_URL=https://your-supabase-url.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
Start the Development Server:

bash
Copy
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

bash
Copy
supabase functions deploy [function-name]
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
List your contributors here.

Enhancements made:

Emojis and Icons: Added to headers and bullet points to make the document more engaging.

Section Headers: Clearly defined and styled to improve navigation through the README.

Code Blocks: Used for commands and environment variable examples, enhancing readability.

Interactive Links: Provided clear call-to-action links (e.g., Live Site).

Overall Styling: Improved overall layout and use of whitespace for better visual appeal.

This enhanced README design should be more interactive and aesthetically pleasing while maintaining the original structure and outline, helping your project stand out for a high mark!
