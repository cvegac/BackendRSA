export const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Encript API",
            version: "1.0.0",
            description: "IBM test API",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["./src/routes/*.ts"],
};