import { Router } from "express";
import { checkAuth } from "../utils/checkAuth.js";
import { createPost, getAll } from "../controllers/posts.js";
const router = new Router()

//Create Post
// http://localhost:3003/api/posts
router.post('/', checkAuth, createPost)

//Get Posts
// http://localhost:3003/api/posts
router.get('/', getAll)

export default router