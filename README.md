# PF - Videogames

Welcome to the ecommerce GameStore, an exciting and user-friendly web application where gamers can explore, buy, and gift their favorite video games. This README file will guide you through the features and technologies used in our project.

## Features
1. Search and Browse Videogames: Users can easily search for their favorite video games using our intuitive search feature. Browse through a vast collection of games to find the perfect ones to add to your collection.

2. User Authentication with Google: Enjoy a seamless and secure login experience with Google authentication provided by Auth0. Sign in using your Google account to access personalized features and manage your profile.

3. User Profile Editing: Customize your profile with ease. Users can edit their profile information, including usernames, avatars, and other details, ensuring a personalized experience.

4. Adding to Favorites: Never lose track of your most loved games. Users can save their favorite video games to a dedicated favorites list, making it easy to revisit them later.

5. Shopping Cart: The shopping cart feature allows users to add their desired video games to their cart before proceeding to checkout. It ensures a smooth and efficient buying process.

6. Secure Payments with Stripe: Seamlessly complete transactions with the secure payment gateway Stripe. Purchase your favorite video games with confidence.

7. Gift a Video Game: Surprise your friends by sending them video games as gifts. Our "Send as Gift" feature makes sharing the joy of gaming easy and fun.

8. Admin Dashboard: For administrators, we offer a dedicated admin section where they can manage and update the video game inventory. Stay in control of the website's content effortlessly.

9. User-to-User Chat: Connect and interact with other users through our real-time chat feature. Discuss gaming, share recommendations, and make new friends within the VideoGame Emporium community.

## Technologies Used
Our project harnesses the power of various technologies to provide you with a seamless and enjoyable experience:

- React.js: The frontend of our web application is built using React.js, enabling fast and interactive user interfaces.

- Redux Toolkit: We utilize Redux Toolkit for efficient state management, ensuring a smooth and consistent user experience.

- Express.js & Node.js: Our backend is powered by Express.js and Node.js, enabling robust server-side operations and data handling.

- Sequelize: Sequelize is the ORM (Object-Relational Mapping) tool used to interact with the PostgreSQL database effectively.

- PostgreSQL: We rely on PostgreSQL as our database management system, ensuring reliable and secure data storage.

- Auth0: User authentication is handled seamlessly by Auth0, allowing users to login with their Google accounts.

- Stripe: For secure and reliable payment processing, we use Stripe as our payment gateway.

## Project Structure

The project follows a typical directory structure for a PERN stack application. Here's an overview:

```bash
client
├── public
└── src
    ├── components
    ├── hooks
    ├── pages
    ├── reducers
    ├── redux
    ├── services
    ├── utils
    ├── App.jsx
    └── main.jsx

api
└── src
   ├── controllers
   ├── models
   ├── routes
   ├── socket
   ├── utils
   └── index.js
```

## Getting Started
To run this project on your local machine, follow these steps:

To start using the Recipe Management Web Application, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project's root directory.
3. Set up the PostgreSQL database, auth0, stripe, socket io,  and configure the connection details in the server's `.env` file.
4. Install the dependencies for both the client and server by running `npm install` in the `client` and `server` directories.
5. Start the client-side development server by running `npm run dev` in the `client` directory.
6. Start the server-side development server by running `npm start` in the `server` directory.
7. Open your browser and visit `http://localhost:5173` to access the GameStore Web Application.

## Contact Us
If you encounter any issues, have questions, or wish to provide feedback, please feel free to reach out to us at danielricra.dev@gmail.com We'd love to hear from you!

Thank you for choosing GameStore Happy gaming! 🎮🎉