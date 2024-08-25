import { Router } from 'express';
import { createService, updateService, getServiceById, getServices, deleteService } from '../controllers/serviceController';

const router: Router = Router();

/**
 * @swagger
 * tags:
 *   name: Serviços
 *   description: Gerenciamento de serviços automotivos
 */

/**
 * @swagger
 * /services:
 *   post:
 *     summary: Cria um novo serviço
 *     tags: [Serviços]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - description
 *               - serviceDate
 *               - vehicleId
 *               - clientId
 *               - status
 *               - serviceValue
 *             properties:
 *               description:
 *                 type: string
 *               serviceDate:
 *                 type: string
 *                 format: date-time
 *               vehicleId:
 *                 type: string
 *               clientId:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [Pendente, Em Andamento, Concluído]
 *               serviceValue:
 *                 type: number
 *     responses:
 *       201:
 *         description: Serviço criado com sucesso
 *       400:
 *         description: Requisição inválida
 */
router.post('/services', createService);

/**
 * @swagger
 * /services/{id}:
 *   put:
 *     summary: Atualiza as informações de um serviço existente
 *     tags: [Serviços]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do serviço
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               serviceDate:
 *                 type: string
 *                 format: date-time
 *               vehicleId:
 *                 type: string
 *               clientId:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [Pendente, Em Andamento, Concluído]
 *               serviceValue:
 *                 type: number
 *     responses:
 *       200:
 *         description: Serviço atualizado com sucesso
 *       400:
 *         description: Requisição inválida
 *       404:
 *         description: Serviço não encontrado
 */
router.put('/services/:id', updateService);


/**
 * @swagger
 * /services/{id}:
 *   get:
 *     summary: Retorna um serviço pelo ID
 *     tags: [Serviços]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do serviço
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Serviço encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Serviço não encontrado
 */
router.get('/services/:id', getServiceById);

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
router.get('/services', getServices);

/**
 * @swagger
 * /services/{id}:
 *   delete:
 *     summary: Deleta um serviço pelo ID
 *     tags: [Serviços]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do serviço
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Serviço deletado com sucesso
 *       404:
 *         description: Serviço não encontrado
 */
router.delete('/services/:id', deleteService);

export default router;
