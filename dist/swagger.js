"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Gerenciamento de Serviços Automotivos',
            version: '1.0.0',
            description: 'Documentação da API para gerenciamento de serviços automotivos',
        },
        servers: [
            {
                url: process.env.SWAGGER,
                description: 'Servidor prod',
            },
        ],
    },
    apis: ['./src/routes/*.ts', './src/models/*.ts'],
    components: {
        schemas: {
            Client: {
                type: 'object',
                properties: {
                    _id: {
                        type: 'string',
                        description: 'ID do cliente.',
                    },
                    name: {
                        type: 'string',
                        description: 'Nome do cliente.',
                    },
                    email: {
                        type: 'string',
                        description: 'Email do cliente.',
                    },
                    phone: {
                        type: 'string',
                        description: 'Telefone do cliente.',
                    },
                    createdAt: {
                        type: 'string',
                        format: 'date-time',
                        description: 'Data de criação.',
                    },
                    updatedAt: {
                        type: 'string',
                        format: 'date-time',
                        description: 'Data de atualização.',
                    },
                },
            },
            Vehicle: {
                type: 'object',
                properties: {
                    _id: {
                        type: 'string',
                        description: 'ID do veículo.',
                    },
                    year: {
                        type: 'number',
                        description: 'Ano do veículo.',
                    },
                    clientId: {
                        type: 'string',
                        description: 'ID do cliente.',
                    },
                    modelId: {
                        type: 'string',
                        description: 'ID do modelo.',
                    },
                    createdAt: {
                        type: 'string',
                        format: 'date-time',
                        description: 'Data de criação.',
                    },
                    updatedAt: {
                        type: 'string',
                        format: 'date-time',
                        description: 'Data de atualização.',
                    },
                },
            },
            Brand: {
                type: 'object',
                properties: {
                    _id: {
                        type: 'string',
                        description: 'ID do veículo.',
                    },
                    name: {
                        type: 'string',
                        description: 'Nome do veículo.',
                    },
                    createdAt: {
                        type: 'string',
                        format: 'date-time',
                        description: 'Data de criação.',
                    },
                    updatedAt: {
                        type: 'string',
                        format: 'date-time',
                        description: 'Data de atualização.',
                    },
                },
            },
            Model: {
                type: 'object',
                properties: {
                    _id: {
                        type: 'string',
                        description: 'ID do veículo.',
                    },
                    name: {
                        type: 'string',
                        description: 'Nome do veículo.',
                    },
                    brandId: {
                        type: 'string',
                        description: 'ID da marca.',
                    },
                    createdAt: {
                        type: 'string',
                        format: 'date-time',
                        description: 'Data de criação.',
                    },
                    updatedAt: {
                        type: 'string',
                        format: 'date-time',
                        description: 'Data de atualização.',
                    },
                },
            },
            Service: {
                type: 'object',
                properties: {
                    _id: {
                        type: 'string',
                        description: 'ID do serviço.',
                    },
                    description: {
                        type: 'string',
                        description: 'Descrição do serviço.',
                    },
                    serviceDate: {
                        type: 'string',
                        format: 'date-time',
                        description: 'Data do serviço.',
                    },
                    vehicleId: {
                        type: 'string',
                        description: 'ID do veículo.',
                    },
                    clientId: {
                        type: 'string',
                        description: 'ID do cliente.',
                    },
                    status: {
                        type: 'string',
                        enum: ['Pendente', 'Em Andamento', 'Concluído'],
                        description: 'Status do serviço.',
                    },
                    serviceValue: {
                        type: 'number',
                        description: 'Valor do serviço.',
                    },
                    createdAt: {
                        type: 'string',
                        format: 'date-time',
                        description: 'Data de criação.',
                    },
                    updatedAt: {
                        type: 'string',
                        format: 'date-time',
                        description: 'Data de atualização.',
                    },
                },
            },
        },
    },
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
const setupSwagger = (app) => {
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
    console.log('Swagger docs available at /api-docs');
};
exports.setupSwagger = setupSwagger;
