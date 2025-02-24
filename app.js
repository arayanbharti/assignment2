const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const productRoutes = require("./routes/productRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const PORT = process.env.PORT || 5001;

// Enable CORS for all routes
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

// Swagger setup
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Product API",
    version: "1.0.0",
    description: "API documentation for the product-related operations",
  },
  servers: [
    {
      url: `http://localhost:${PORT}`,
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"], // Specify the path to your route files for Swagger annotations
};

const swaggerSpec = swaggerJSDoc(options);

// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use("/api/products", productRoutes);
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
