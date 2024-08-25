"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const serviceRoutes_1 = __importDefault(require("./routes/serviceRoutes"));
const clientRoutes_1 = __importDefault(require("./routes/clientRoutes"));
const vehicleRoutes_1 = __importDefault(require("./routes/vehicleRoutes"));
const brandRoutes_1 = __importDefault(require("./routes/brandRoutes"));
const modelRoutes_1 = __importDefault(require("./routes/modelRoutes"));
const errorHandler_1 = require("./utils/errorHandler");
const swagger_1 = require("./swagger");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
mongoose_1.default.connect(process.env.MONGODB_URI)
    .then(() => console.log('Conectado ao MongoDB'))
    .catch((error) => console.error('Erro ao conectar ao MongoDB', error));
(0, swagger_1.setupSwagger)(app);
app.use('/api', serviceRoutes_1.default);
app.use('/api', clientRoutes_1.default);
app.use('/api', vehicleRoutes_1.default);
app.use('/api', modelRoutes_1.default);
app.use('/api', brandRoutes_1.default);
app.use(errorHandler_1.errorHandler);
exports.default = app;
