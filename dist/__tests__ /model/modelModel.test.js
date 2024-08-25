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
const modelModel_1 = __importDefault(require("../../models/modelModel"));
const brandModel_1 = __importDefault(require("../../models/brandModel"));
describe('Model Model Test', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connect('mongodb+srv://kevenbarros:keenbs07@cluster0.cb6fd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connection.close();
    }));
    it('create & save model successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const random = Math.floor(Math.random() * 10000);
        const brand = new brandModel_1.default({
            name: 'Brand' + random,
        });
        const savedBrand = yield brand.save();
        const validModel = new modelModel_1.default({
            name: 'Model' + random,
            brandId: savedBrand._id,
        });
        const savedModel = yield validModel.save();
        expect(savedModel._id).toBeDefined();
        expect(savedModel.name).toBe(validModel.name);
        expect(savedModel.brandId.toString()).toBe(savedBrand._id.toString());
        yield modelModel_1.default.findByIdAndDelete(savedModel._id);
        yield brandModel_1.default.findByIdAndDelete(savedBrand._id);
    }));
    it('create model without required field should fail', () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const modelWithoutRequiredField = new modelModel_1.default({ name: 'Model without Brand' });
        let err;
        try {
            yield modelWithoutRequiredField.save();
        }
        catch (error) {
            err = error;
            expect(err).toBeInstanceOf(mongoose_1.default.Error.ValidationError);
            expect((_a = err.errors) === null || _a === void 0 ? void 0 : _a.brandId).toBeDefined();
        }
    }));
});
