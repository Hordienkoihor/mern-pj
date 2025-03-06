import { Router } from "express";
import { checkAuth } from "../utils/checkAuth.js";
import { createPost, getAll, getById, getMyPosts, removePost } from "../controllers/posts.js";
const router = new Router()

//Create Post
// http://localhost:3003/api/posts
router.post('/', checkAuth, createPost)

//Get Posts
// http://localhost:3003/api/posts
router.get('/', getAll)

//Get Post By Id
// http://localhost:3003/api/posts/:id
router.get('/:id', getById)

//Get My Posts
// http://localhost:3003/api/posts/user/me
router.get('/user/me', checkAuth, getMyPosts)

//Delete Post By Id
// http://localhost:3003/api/posts/:id
router.delete('/:id',checkAuth, removePost)

export default router