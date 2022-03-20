import express from 'express'
import {getCategories} from '../Controller/categoryController.js'

const router=express.Router()

router.route('/').get(getCategories)

export default router