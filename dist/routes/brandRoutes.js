"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const brandController_1 = require("../controllers/brandController");
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   name: Brands
 *   description: Gestão de marcas de veículos
 */
/**
 * @swagger
 * /brands:
 *   post:
 *     summary: Cria uma nova marca
 *     tags: [Brands]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Toyota
 *     responses:
 *       201:
 *         description: Marca criada com sucesso
 *       400:
 *         description: Erro na requisição
 */
router.post('/brands', brandController_1.createBrand);
/**
 * @swagger
 * /brands:
 *   get:
 *     summary: Retorna a lista de todas as marcas
 *     tags: [Brands]
 *     responses:
 *       200:
 *         description: Lista de marcas
 *       500:
 *         description: Erro no servidor
 */
router.get('/brands', brandController_1.getBrands);
/**
 * @swagger
 * /brands/{id}:
 *   get:
 *     summary: Retorna uma marca pelo ID
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da marca
 *     responses:
 *       200:
 *         description: Marca encontrada
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Marca não encontrada
 */
router.get('/brands/:id', brandController_1.getBrandById);
/**
 * @swagger
 * /brands/{id}:
 *   put:
 *     summary: Atualiza uma marca pelo ID
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da marca
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Toyota
 *     responses:
 *       200:
 *         description: Marca atualizada com sucesso
 *       400:
 *         description: ID inválido ou erro na requisição
 *       404:
 *         description: Marca não encontrada
 */
router.put('/brands/:id', brandController_1.updateBrand);
/**
 * @swagger
 * /brands/{id}:
 *   delete:
 *     summary: Exclui uma marca pelo ID
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da marca
 *     responses:
 *       200:
 *         description: Marca deletada com sucesso
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Marca não encontrada
 */
router.delete('/brands/:id', brandController_1.deleteBrand);
exports.default = router;
