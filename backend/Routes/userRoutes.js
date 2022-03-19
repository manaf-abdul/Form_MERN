import express from 'express'
import {registerUser,getUsers} from '../Controller/userController.js'

const router=express.Router()

router.route('/register').post(registerUser)
router.route('/userlist').get(getUsers)

export default router