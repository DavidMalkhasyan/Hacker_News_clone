Hacker News Clone - Backend
This is the backend of a Hacker News clone built with Node.js, Express, and MongoDB.
It supports user authentication, post creation, nested comments, and basic search functionality.

🚀 Features
🔒 User registration and login using JWT authentication

📝 Create, Read, Update, and Delete (CRUD) operations for posts

💬 Add and fetch comments under posts (supports nested comments)

🔍 Search posts by title

🗄️ MongoDB integration for storing users, posts, and comments

🛡️ Basic route protection for authenticated actions

🛠️ Technologies Used
Node.js (JavaScript runtime)

Express.js (Web framework)

MongoDB with Mongoose (Database and ORM)

bcryptjs for password hashing

jsonwebtoken (JWT) for authentication

dotenv for environment variables

cors for Cross-Origin Resource Sharing

React 

📦 Installation
Clone the repository:

bash
git clone https://github.com/DavidMalkhasyan/Hacker_News_clone
cd Hacker_News_clone
Install dependencies:

bash
npm install
Set up environment variables:

Create a .env file in the root directory and add the following:

ini
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
Start the server:

bash
npm run dev
(Server will run by default on http://localhost:5000)

🧩 API Endpoints

Method	Endpoint	Description	Protected
POST	/api/auth/register	Register a new user	❌
POST	/api/auth/login	Login user and get token	❌
GET	/api/posts	Get all posts	❌
GET	/api/posts/:id	Get single post by ID	❌
POST	/api/posts	Create new post	✅
PUT	/api/posts/:id	Update post by ID	✅
DELETE	/api/posts/:id	Delete post by ID	✅
POST	/api/posts/:id/comments	Add comment to post	✅
GET	/api/posts/:id/comments	Get all comments for post	❌
⚙️ Scripts

Command	Purpose
npm start	Start server in production mode
npm run dev	Start server in development mode (using nodemon)
🔥 Project Structure
bash


/Hacker_News_clone
 ├── /controllers
 ├── /models
 ├── /routes
 ├── /middleware
 ├── /services
 ├── /config
 ├── server.js
 └── .env
 
🌟 Future Improvements
Add password reset functionality

Improve input validation (using Joi or express-validator)

Rate limiting & security hardening

Deployment on cloud (Render, Vercel, Railway, AWS)

📜 License
This project is licensed under the MIT License.
