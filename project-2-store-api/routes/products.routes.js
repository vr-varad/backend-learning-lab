const express = require('express')
const { getAllProducts } = require('../controllers/products.controller')

const router = express.Router()


router.route('/').get(getAllProducts)

module.exports = router