import express from 'express';
import {
  createBrand,
  getBrands,
  getBrandById,
  updateBrand,
  deleteBrand
} from '../controllers/brandController';

const router = express.Router();

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
router.post('/brands', createBrand);

/**
 * @swagger
 * /brands:
 *   get:
 *     summary: Retorna a lista de todas as marcas
 *     tags: [Brands]
 *     responses:
 *       200:
 *         description: Lista de marcas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Brand'
 *       500:
 *         description: Erro no servidor
 */
router.get('/brands', getBrands);

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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Marca não encontrada
 */
router.get('/brands/:id', getBrandById);

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
router.put('/brands/:id', updateBrand);

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
router.delete('/brands/:id', deleteBrand);

export default router;
