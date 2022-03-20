import express from 'express'
import {registerUser,getUsers,deleteUser,getUserDetailsById,updateUser} from '../Controller/userController.js'

const router=express.Router()

router.route('/').post(registerUser)
router.route('/userlist').get(getUsers)
router.route('/:id').delete(deleteUser)
                    .get(getUserDetailsById)
                    .put(updateUser)



export default router