import { Router } from "express";
import {registration, login, getMe} from '../controllers/auth.js'
import { checkAuth } from "../utils/checkAuth.js";
const router = new Router()

//Registration
// http://localhost:3003/api/auth/registration
router.post('/registration', registration)

//Login
// http://localhost:3003/api/auth/login
router.post('/login', login)

//Get Me
// http://localhost:3003/api/auth/me
router.get('/me', checkAuth, getMe)

export default router