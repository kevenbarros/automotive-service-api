"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const serviceModel_1 = __importStar(require("../../models/serviceModel"));
const vehicleModel_1 = __importDefault(require("../../models/vehicleModel"));
const clientModel_1 = __importDefault(require("../../models/clientModel"));
describe('Service Model Test', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connect('mongodb+srv://kevenbarros:keenbs07@cluster0.cb6fd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connection.close();
    }));
    it('create & save service successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const random = Math.floor(Math.random() * 10000);
        // Criando um cliente de teste
        const client = new clientModel_1.default({
            name: 'Client ' + random,
            email: `client${random}@example.com`,
            phone: '123456789',
        });
        const savedClient = yield client.save();
        // Criando um veículo de teste
        const vehicle = new vehicleModel_1.default({
            modelId: new mongoose_1.default.Types.ObjectId(),
            brandId: new mongoose_1.default.Types.ObjectId(),
            year: 2022,
            clientId: savedClient._id,
        });
        const savedVehicle = yield vehicle.save();
        // Criando um serviço de teste
        const validService = new serviceModel_1.default({
            description: 'Service ' + random,
            serviceDate: new Date(),
            vehicleId: savedVehicle._id,
            clientId: savedClient._id,
            status: serviceModel_1.EServiceStatus.Pendente,
            serviceValue: 100.0,
        });
        const savedService = yield validService.save();
        expect(savedService._id).toBeDefined();
        expect(savedService.description).toBe(validService.description);
        expect(savedService.vehicleId.toString()).toBe(savedVehicle._id.toString());
        expect(savedService.clientId.toString()).toBe(savedClient._id.toString());
        expect(savedService.status).toBe(serviceModel_1.EServiceStatus.Pendente);
        expect(savedService.serviceValue).toBe(100.0);
        // Limpando os dados de teste
        yield serviceModel_1.default.findByIdAndDelete(savedService._id);
        yield vehicleModel_1.default.findByIdAndDelete(savedVehicle._id);
        yield clientModel_1.default.findByIdAndDelete(savedClient._id);
    }));
    it('create service without required field should fail', () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const serviceWithoutRequiredField = new serviceModel_1.default({
            description: 'Service without Vehicle',
            serviceDate: new Date(),
            clientId: new mongoose_1.default.Types.ObjectId(),
            status: serviceModel_1.EServiceStatus.Pendente,
            serviceValue: 100.0,
        });
        let err;
        try {
            yield serviceWithoutRequiredField.save();
        }
        catch (error) {
            err = error;
            expect(err).toBeInstanceOf(mongoose_1.default.Error.ValidationError);
            expect((_a = err.errors) === null || _a === void 0 ? void 0 : _a.vehicleId).toBeDefined();
        }
    }));
});
