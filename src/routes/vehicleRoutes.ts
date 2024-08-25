import express from 'express';
import {
  createVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
} from '../controllers/vehicleController';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Vehicles
 *   description: API para gerenciamento de veículos
 */

/**
 * @swagger
 * /vehicles:
 *   post:
 *     summary: Cria um novo veículo
 *     tags: [Vehicles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientId:
 *                 type: string
 *               modelId:
 *                 type: string
 *               year:
 *                 type: number
 *             example:
 *               clientId: 6123456789abcdef12345678
 *               modelId: 6123456789abcdef12345679
 *               year: 2022
 *     responses:
 *       201:
 *         description: Veículo criado com sucesso.
 *       400:
 *         description: Erro ao criar o veículo.
 */
router.post('/vehicles', createVehicle);

/**
 * @swagger
 * /services:
 *   get:
 *     summary: Retorna uma lista de serviços filtrados.
 *     tags: 
 *       - Serviços
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         description: ID do serviço para filtrar.
 *       - in: query
 *         name: vehicleId
 *         schema:
 *           type: string
 *         description: ID do veículo para filtrar.
 *       - in: query
 *         name: clientId
 *         schema:
 *           type: string
 *         description: ID do cliente para filtrar.
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum:
 *             - Pendente
 *             - Em Andamento
 *             - Concluído
 *         description: Status do serviço para filtrar.
 *     responses:
 *       200:
 *         description: Lista de serviços filtrados.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Service'
 *       400:
 *         description: Erro nos parâmetros fornecidos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid query parameters"
 *       404:
 *         description: Nenhum serviço encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No services found"
 */
router.get('/vehicles', getVehicles);

/**
 * @swagger
 * /vehicles/{id}:
 *   get:
 *     summary: Retorna um veículo pelo ID
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do veículo
 *     responses:
 *       200:
 *         description: Veículo encontrado.
 *       404:
 *         description: Veículo não encontrado.
 *       400:
 *         description: ID inválido.
 */
router.get('/vehicles/:id', getVehicleById);

/**
 * @swagger
 * /vehicles/{id}:
 *   put:
 *     summary: Atualiza um veículo pelo ID
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do veículo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientId:
 *                 type: string
 *               modelId:
 *                 type: string
 *               year:
 *                 type: number
 *             example:
 *               clientId: 6123456789abcdef12345678
 *               modelId: 6123456789abcdef12345679
 *               year: 2023
 *     responses:
 *       200:
 *         description: Veículo atualizado com sucesso.
 *       404:
 *         description: Veículo não encontrado.
 *       400:
 *         description: ID inválido ou erro ao atualizar.
 */
router.put('/vehicles/:id', updateVehicle);

/**
 * @swagger
 * /vehicles/{id}:
 *   delete:
 *     summary: Deleta um veículo pelo ID
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do veículo
 *     responses:
 *       200:
 *         description: Veículo deletado com sucesso.
 *       404:
 *         description: Veículo não encontrado.
 *       400:
 *         description: ID inválido.
 */
router.delete('/vehicles/:id', deleteVehicle);

export default router;
