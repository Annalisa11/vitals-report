const express = require('express');
const {
  createAccount,
  register,
  login,
} = require('../controllers/authController');
const { checkPermission } = require('../middleware/authorization');

const router = express.Router();

/** POST Methods */
/**
 *@openapi
 * '/create-account':
 *  post:
 *     tags:
 *     - Authorization
 *     summary: Create an account link
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - rights
 *              - adminUser
 *            properties:
 *              email:
 *                type: string
 *                default: hyunbin@mail.com
 *              rights:
 *                type: array
 *                items:
 *                  type: string
 *                default:
 *                    - chart
 *                    - vitals-details
 *                    - create-account
 *
 *
 *     responses:
 *      201:
 *        description: Created
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.post(
  '/create-account',
  checkPermission('create-account'),
  createAccount
);
router.post('/register', register);
router.post('/login', login);

module.exports = router;
