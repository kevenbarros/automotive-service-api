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
const clientModel_1 = __importDefault(require("../../models/clientModel"));
describe('Client Model Test', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connect("mongodb+srv://kevenbarros:keenbs07@cluster0.cb6fd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connection.close();
    }));
    it('create & save client successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const random = Math.floor(Math.random() * 10000);
        const validClient = new clientModel_1.default({
            name: 'Teste' + random,
            email: `${random}teste@example.com`,
            phone: random.toString(),
        });
        const savedClient = yield validClient.save();
        expect(savedClient._id).toBeDefined();
        expect(savedClient.name).toBe(validClient.name);
        expect(savedClient.email).toBe(validClient.email);
        expect(savedClient.phone).toBe(validClient.phone);
        yield clientModel_1.default.findByIdAndDelete(savedClient._id);
    }));
    it('create client without required field should fail', () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const clientWithoutRequiredField = new clientModel_1.default({ name: 'John Doe' });
        let err;
        try {
            yield clientWithoutRequiredField.save();
        }
        catch (error) {
            err = error;
            expect(err).toBeInstanceOf(mongoose_1.default.Error.ValidationError);
            expect((_a = err === null || err === void 0 ? void 0 : err.errors) === null || _a === void 0 ? void 0 : _a.email).toBeDefined();
        }
    }));
});
