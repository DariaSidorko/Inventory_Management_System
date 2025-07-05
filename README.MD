
# Inventory Management System

A full-stack web application to manage inventory items, including product creation, editing, deletion, and category-based filtering. 
Built with Node.js, Express, MongoDB, and vanilla JavaScript (with HTML/CSS frontend).

## Features

- User registration and login with JWT authentication
- Add, edit, delete products (CRUD)
- Visual indicator for low-stock items (quantity ≤ minimum)
- Filter products by category
- Responsive design 
- Backend validation and error handling

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens)

## Getting Started

### Requirments

- Node.js and npm
- MongoDB (local or cloud)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/inventory-management-system.git
   cd inventory-management-system


2. Install dependencies:

npm install

3. Create a .env file:

MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Start the server:

4. Open your browser:

http://localhost:3000


### Folder Structure

/controllers - Route handlers for auth and products
/models - Mongoose schemas
/public - Frontend HTML/CSS/JS
/routes - Express routes

