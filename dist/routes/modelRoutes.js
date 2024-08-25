"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const modelController_1 = require("../controllers/modelController");
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   name: Models
 *   description: Gestão de modelos de veículos
 */
/**
 * @swagger
 * /models:
 *   post:
 *     summary: Cria um novo modelo
 *     tags: [Models]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Corolla
 *               brandId:
 *                 type: string
 *                 example: 64b7e682a65e923c1f3e2a56
 *     responses:
 *       201:
 *         description: Modelo criado com sucesso
 *       400:
 *         description: Erro na requisição ou ID de marca inválido
 */
router.post('/models', modelController_1.createModel);
/**
 * @swagger
 * /models:
 *   get:
 *     summary: Retorna a lista de todos os modelos
 *     tags: [Models]
 *     responses:
 *       200:
 *         description: Lista de modelos
 *       500:
 *         description: Erro no servidor
 */
router.get('/models', modelController_1.getModels);
/**
 * @swagger
 * /models/{id}:
 *   get:
 *     summary: Retorna um modelo pelo ID
 *     tags: [Models]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do modelo
 *     responses:
 *       200:
 *         description: Modelo encontrado
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Modelo não encontrado
 */
router.get('/models/:id', modelController_1.getModelById);
/**
 * @swagger
 * /models/{id}:
 *   put:
 *     summary: Atualiza um modelo pelo ID
 *     tags: [Models]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do modelo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Corolla
 *               brandId:
 *                 type: string
 *                 example: 64b7e682a65e923c1f3e2a56
 *     responses:
 *       200:
 *         description: Modelo atualizado com sucesso
 *       400:
 *         description: ID inválido ou erro na requisição
 *       404:
 *         description: Modelo não encontrado
 */
router.put('/models/:id', modelController_1.updateModel);
/**
 * @swagger
 * /models/{id}:
 *   delete:
 *     summary: Exclui um modelo pelo ID
 *     tags: [Models]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do modelo
 *     responses:
 *       200:
 *         description: Modelo deletado com sucesso
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Modelo não encontrado
 */
router.delete('/models/:id', modelController_1.deleteModel);
exports.default = router;
