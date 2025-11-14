import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Internship Management System API",
      version: "1.0.0",
      description: `
        ## 📚 Complete API Documentation for Internship Management System
        
        ### 🔄 Testing Flow (Recommended Order):
        
        **1. Health Check** → **2. Authentication** → **3. Student Operations** → 
        **4. Progress Reports** → **5. Internships** → **6. Lecturer Operations** → 
        **7. Company Operations** → **8. Admin Operations** → **9. Notifications**
        
        ### 🔐 Authentication
        Most endpoints require authentication using Bearer tokens. Use the login endpoint to obtain a token.
        
        ### 👥 User Roles
        - **Student**: Can register for internships, submit progress reports
        - **Lecturer**: Can review student progress, manage evaluations  
        - **Company**: Can manage student assignments, provide evaluations
        - **Admin**: Full system access, user management, system configuration
        
        ### 📝 Testing Tips
        1. Start with Health Check to verify system status
        2. Register/Login users to get authentication tokens
        3. Copy tokens to use in subsequent requests
        4. Test endpoints in the recommended order for best results
      `,
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: [
    "./src/docs/*.js",
    "./src/docs/complete-api.docs.js",
    "./src/docs/admin-complete.docs.js",
    "./src/docs/schemas.docs.js",
  ],
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };
