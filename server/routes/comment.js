import {Router} from 'express';
const router = new Router()
import { checkAuth } from '../utils/checkAuth.js';
import {createComment} from '../controllers/comment.js'

//Create Comment
// http://localhost:3003/api/comments/:id
router.post('/:id', checkAuth, createComment)

export default router