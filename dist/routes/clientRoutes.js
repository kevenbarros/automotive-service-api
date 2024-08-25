"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const clientController_1 = require("../controllers/clientController");
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   name: Clientes
 *   description: Gerenciamento de clientes
 */
/**
 * @swagger
 * /clients:
 *   post:
 *     summary: Cria um novo cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - phone
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 *       400:
 *         description: Requisição inválida
 */
router.post('/clients', clientController_1.createClient);
/**
 * @swagger
 * /clients:
 *   get:
 *     summary: Retorna a lista de todos os clientes
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: Lista de clientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/clients', clientController_1.getClients);
/**
 * @swagger
 * /clients/{id}:
 *   get:
 *     summary: Retorna um cliente pelo ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do cliente
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Cliente não encontrado
 */
router.get('/clients/:id', clientController_1.getClientById);
/**
 * @swagger
 * /clients/{id}:
 *   put:
 *     summary: Atualiza as informações de um cliente
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do cliente
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cliente atualizado com sucesso
 *       400:
 *         description: Requisição inválida
 *       404:
 *         description: Cliente não encontrado
 */
router.put('/clients/:id', clientController_1.updateClient);
/**
 * @swagger
 * /clients/{id}:
 *   delete:
 *     summary: Deleta um cliente pelo ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do cliente
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cliente deletado com sucesso
 *       404:
 *         description: Cliente não encontrado
 */
router.delete('/clients/:id', clientController_1.deleteClient);
exports.default = router;
