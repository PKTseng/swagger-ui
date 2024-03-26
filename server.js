const express = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')
const app = express()
const PORT = 3000

app.use(express.json())

const users = [
  {
    id: 1,
    username: 'user1',
    password: 'pass1',
  },
  {
    id: 2,
    username: 'user2',
    password: 'pass2',
  },
]

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Login API Documentation',
      version: '1.0.0',
      description: 'A simple login API',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  // Path to the API docs
  apis: ['./server.js'],
}

const swaggerDocs = swaggerJsdoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *         password:
 *           type: string
 *       example:
 *         username: user1
 *         password: pass1
 *
 * @swagger
 * /login:
 *   post:
 *     summary: Logs in a user
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Unauthorized
 */
app.post('/login', (req, res) => {
  const { username, password } = req.body
  const user = users.find((u) => u.username === username && u.password === password)

  if (user) {
    res.status(200).json({ message: '登录成功' })
  } else {
    res.status(401).json({ message: '用户名或密码错误' })
  }
})

app.listen(PORT, () => {
  console.log(`服务器正在监听端口：${PORT}`)
})
