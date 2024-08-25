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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EServiceStatus = void 0;
const mongoose_1 = __importStar(require("mongoose"));
var EServiceStatus;
(function (EServiceStatus) {
    EServiceStatus["Pendente"] = "Pendente";
    EServiceStatus["EmAndamento"] = "Em Andamento";
    EServiceStatus["Concluido"] = "Conclu\u00EDdo";
})(EServiceStatus || (exports.EServiceStatus = EServiceStatus = {}));
const serviceSchema = new mongoose_1.Schema({
    description: { type: String, required: true },
    serviceDate: { type: Date, required: true },
    vehicleId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    clientId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Client', required: true },
    status: { type: String, enum: Object.values(EServiceStatus), required: true },
    serviceValue: { type: Number, required: true },
});
exports.default = mongoose_1.default.model('Service', serviceSchema);
