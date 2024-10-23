![Cubos Academy](https://i.imgur.com/xG74tOh.png)

# **Point of Sale API**
This project is an API developed in Node.js using the Express framework, designed for managing orders, customers, products, and categories. The API implements JWT authentication and data validation with Joi. The application uses a PostgreSQL database and image storage on AWS S3.

## :arrow_forward: Visit my API
### [Access here](https://pdv-api-h6zg.onrender.com)

## 📂 Project Structure
```
src/
│
├── controllers/
│   ├── clients/
│   ├── orders/
│   ├── products/
│   └── users/
│
├── libs/
│   └── s3-service.js
│
├── middlewares/
│   ├── verify-body.js
│   └── verify-jwt.js
│
├── routes/
│   ├── categories.js
│   ├── clients.js
│   ├── orders.js
│   ├── products.js
│   └── users.js
│
├── schemas/
│   ├── clients/
│   ├── orders/
│   ├── products/
│   └── users/
│
├── templates/
│   └── send-email-order.html
│
├── utils/
│   ├── compiler-Html.js
│   ├── delete-image-bucket.js
│   ├── remove-special-characters.js
│   └── upload-image-bucket.js
│
├── .editorconfig
├── .env
├── .env.example
├── .eslintrc.json
├── .gitignore
├── .prettierrc
└── dump.sql

```
## ⚙️ Environment Setup
1. **Install Dependencies**
   * Make sure you have Node.js and npm installed.
   * Run the following command at the root of the project:
     ```
     npm run dev

     ```
2. **Database Setup**
   * Create a PostgreSQL database and configure the environment variables in the ```.env``` file according to your environment.
3. **AWS Configuration**
   * Set up AWS credentials in the ```.env``` file to allow uploading and deleting images in S3.
4. **Run the Application**
   * Start the server with the command:
     ```
      npm run dev
     ```
     
  ## 🧭 Routes
  The API has routes to manage users, clients, products, and orders. You can find detailed implementations in the routes and controllers folders.

  ## ⚠️ Error Messages
  The API uses custom error messages based on validation performed by Joi. Here are some examples:
  * **Validation Error**
    * Message: ```O campo nome é obrigatório.```
  * **Authentication Error**
    * Message: ```Token obrigatório.```
   
  # 📧 Contact
  For questions or suggestions, please contact me.

<a href= "mailto:joaov.lac.medeiros@gmail.com"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white"></a>  
