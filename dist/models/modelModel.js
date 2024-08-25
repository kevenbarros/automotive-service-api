"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ModelSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    brandId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Brand',
        required: true,
    },
});
exports.default = (0, mongoose_1.model)('Model', ModelSchema);
