"use strict";
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
const vehicleModel_1 = __importDefault(require("../../models/vehicleModel"));
const modelModel_1 = __importDefault(require("../../models/modelModel"));
const brandModel_1 = __importDefault(require("../../models/brandModel"));
const clientModel_1 = __importDefault(require("../../models/clientModel"));
describe('Vehicle Model Test', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connect("mongodb+srv://kevenbarros:keenbs07@cluster0.cb6fd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connection.close();
    }));
    it('should create and save a vehicle successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const model = new modelModel_1.default({ name: 'Test Model', brandId: new mongoose_1.default.Types.ObjectId() });
        yield model.save();
        const brand = new brandModel_1.default({ name: 'Test Brand' });
        yield brand.save();
        const client = new clientModel_1.default({ name: 'Test Client', email: 'test@example.com', phone: '123456789' });
        yield client.save();
        const vehicle = new vehicleModel_1.default({
            modelId: model._id,
            brandId: brand._id,
            year: 2020,
            clientId: client._id,
        });
        const savedVehicle = yield vehicle.save();
        expect(savedVehicle._id).toBeDefined();
        expect(savedVehicle.year).toBe(2020);
        yield vehicleModel_1.default.findByIdAndDelete(savedVehicle._id);
        yield modelModel_1.default.findByIdAndDelete(model._id);
        yield brandModel_1.default.findByIdAndDelete(brand._id);
        yield clientModel_1.default.findByIdAndDelete(client._id);
    }));
});
