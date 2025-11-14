export const swaggerComponents = {
  securitySchemes: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
      description: "Enter JWT token in format: Bearer <token>"
    }
  },
  responses: {
    UnauthorizedError: {
      description: "Access token is missing or invalid",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: { type: "boolean", example: false },
              message: { type: "string", example: "Unauthorized" }
            }
          }
        }
      }
    },
    ValidationError: {
      description: "Validation error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: { type: "boolean", example: false },
              message: { type: "string", example: "Validation failed" },
              errors: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    field: { type: "string" },
                    message: { type: "string" }
                  }
                }
              }
            }
          }
        }
      }
    },
    NotFoundError: {
      description: "Resource not found",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: { type: "boolean", example: false },
              message: { type: "string", example: "Resource not found" }
            }
          }
        }
      }
    }
  },
  parameters: {
    PageParam: {
      in: "query",
      name: "page",
      schema: {
        type: "integer",
        minimum: 1,
        default: 1
      },
      description: "Page number for pagination"
    },
    LimitParam: {
      in: "query",
      name: "limit",
      schema: {
        type: "integer",
        minimum: 1,
        maximum: 100,
        default: 10
      },
      description: "Number of items per page"
    },
    SearchParam: {
      in: "query",
      name: "search",
      schema: {
        type: "string"
      },
      description: "Search term"
    }
  }
};