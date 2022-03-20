import express from 'express'
import {registerUser,getUsers,deleteUser} from '../Controller/userController.js'

const router=express.Router()

router.route('/').post(registerUser)
router.route('/userlist').get(getUsers)
router.route('/:id').delete(deleteUser)



export default router