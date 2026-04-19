# GenAI-Based Automobile Recommendation System

This project is an enterprise-grade automobile recommendation system integrating Generative AI (LLMs) to enhance the customer experience. The system features a React-based frontend, a Node.js backend with Sequelize, and databases PostgreSQL & MongoDB.





## 🔗 Project Repository  
[GitHub Repository](https://github.com/Akash-chatur/AutoGenAI.git)

🚀 **Want to see the code?** Request access by reaching out!



# Key Features:
*AI-Powered Chatbot*: Users can interact via natural language to get personalized car recommendations.

*Comprehensive Car Listings*: Browse and filter cars by brand, price, and specifications.

*Seamless Checkout*: Securely add cars to the cart, proceed with payments, and track order history.

*LLM Integration with LangChain*: AI agents process queries, call APIs, and enhance recommendations.

# Phase 2 Enhancements:
*Fraud Detection Agent*: Uses OCR and AI models to analyze fraudulent transactions.

*Order Status & Fault Detection Agent*: Evaluates vehicle damage images to suggest repairs, replacements, or escalations.


**Tech Stack**: React, NextUI, Node.js, Sequelize, PostgreSQL, MongoDB, LangChain, OpenAI Models



# Vite & NextUI Template

This is a template for creating applications using Vite and NextUI (v2).

[Try it on CodeSandbox](https://githubbox.com/nextui-org/vite-template)

## Technologies Used

- [Vite](https://vitejs.dev/guide/)
- [NextUI](https://nextui.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Tailwind Variants](https://tailwind-variants.org)
- [TypeScript](https://www.typescriptlang.org)
- [Framer Motion](https://www.framer.com/motion)

## How to Use

To clone the project, run the following command:

```bash
git clone https://github.com/nextui-org/vite-template.git
```

### Install dependencies

You can use one of them `npm`, `yarn`, `pnpm`, `bun`, Example using `npm`:

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

## Backend

### Requirements

- Node.js (v14.x or higher)
- MySQL (v5.7 or higher)
- npm (Node Package Manager)

### Installation

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd AutoGenAI/backend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Database Configuration**

   - Open the `config/database.js` file.
   - Set your database credentials, including the database name, username, and password.

   ```javascript
   const { Sequelize } = require("sequelize");

   const sequelize = new Sequelize("agi", "your_username", "your_password", {
     host: "localhost",
     dialect: "mysql",
   });

   module.exports = sequelize;
   ```

   - Open the `config/config.js` file.
   - Set your database credentials, including the database name, username, and password in the development server.

   ```javascript
   {
    "development": {
   "username": "root",
   "password": "password",
   "database": "NextGenCars",
   "host": "127.0.0.1",
   "dialect": "mysql"
     }
   }
   ```

4. **Create Database**

   Create the MySQL database before running the application.

   ```sql
   CREATE DATABASE agi;
   ```

5. **Run the Server**

   ```bash
   node index.js
   ```

   The server will start on port 3000. You should see a message indicating that the server is running and the database is synced.

### Data Insert

To insert data from a CSV file into the database, use the following command:

```bash
node insertData.js
```

This command will:

- Drop the existing `cars` table if it exists.
- Create a new `cars` table.
- Read data from `temp_data/cars.csv` and insert it into the database.

run:

```bash
npm install dotenv
```

create a .env file in backend main directory
add the following line
OPENAI_API_KEY='YOUR KEY'

### Create Users table and Order table

Run the following command to get the users & order tables in the database:

```bash
npx sequelize-cli db:migrate
```

If for some reason the migrate command does not work use the following command:

```bash
npx sequelize-cli db:migrate:undo
and re-run the migration command
```

### Some working samples of the application

![image](https://gist.github.com/user-attachments/assets/491e56bd-4fe6-4cf0-bd03-68c941a2b9ef)

![image](https://gist.github.com/user-attachments/assets/723adfc8-5d06-4bfc-b69c-953726477282)

![image](https://gist.github.com/user-attachments/assets/b602f0ec-ad7d-4a64-b035-ceb17f4b9162)
