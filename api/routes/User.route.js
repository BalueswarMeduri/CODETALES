import express from 'express'
import { deleteuser, getalluser, getUser,updateUser } from '../controllers/Usercontroller.js'
import upload from '../config/multer.js'
import { authenticate } from '../middleware/authenticate.js'

const UserRoute = express.Router()
UserRoute.use(authenticate)
UserRoute.get('/get-user/:userid',getUser)
UserRoute.put('/update-user/:userid', upload.single('file'), updateUser)
UserRoute.get('/get-all-user',  getalluser)
UserRoute.delete('/delete/:id',  deleteuser)


export default UserRoute