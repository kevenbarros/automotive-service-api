"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const VehicleSchema = new mongoose_1.Schema({
    modelId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Model',
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    clientId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Client',
        required: true,
    },
});
exports.default = (0, mongoose_1.model)('Vehicle', VehicleSchema);
