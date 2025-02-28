import Post from "../models/Post.js";
import User from "../models/User.js";
import path, {dirname} from 'path'
import { fileURLToPath } from 'url'

// Create Post
export const createPost = async (req, res) => {
    try {
        // console.log('req.body:', req.body);
        // console.log('req.files:', req.files);

        const {title, text} = req.body
        const user = await User.findById(req.userId)

        if(req.files?.image){
            let fileName = Date.now().toString() + req.files.image.name
            const __dirname = dirname(fileURLToPath(import.meta.url))
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName));
            
            const newPostWithImage = new Post({
                username: user.username,
                title,
                text,
                imageUrl: fileName,
                author: req.userId,
            })

            await newPostWithImage.save()
            await User.findOneAndUpdate({_id: req.userId}, {$push: {posts: newPostWithImage}})
            return res.json(newPostWithImage)
        }

        const newPostWithoutImage = new Post({
            username: user.username,
            title,
            text,
            imageUrl: '',
            author: req.userId,
        })

        await newPostWithoutImage.save()
        await User.findOneAndUpdate(req.userId, {$push: {posts: newPostWithoutImage}})
        return res.json(newPostWithoutImage)

    } catch (error) {
        console.error('POST ERROR:', error);
        res.status(500).json({ message: 'post error', error: error.message }); 
    }
    
}

// Get All Posts
export const getAll = async (req, res) => {
    try {
        
        const posts = await Post.find().sort({createdAt: -1})
        const popularPosts = await Post.find().sort({views: -1}).limit(5)
        if(posts.length === 0){
            return res.status(404).json({ message: 'posts not found' });
        }
        res.json({ posts, popularPosts });
    } catch (error) {
        res.status(500).json({ message: 'get all posts error', error: error.message });
    }
}