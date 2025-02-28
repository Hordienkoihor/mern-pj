import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// registration
export const registration = async (req, res) => {
    try{
        const { username, password } = req.body

        const isUsed = await User.findOne({username})

        if(isUsed){
            return res.json({
                message: 'username is already taken'
            })
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const newUser = new User({
            username,
            password: hash,
        })

        const token = jwt.sign(
            {
                id: newUser._id
            }, 
            process.env.JWT_SECRET,
            {expiresIn: '30d'}
            
            
        )

        await newUser.save()

        res.json({
            newUser,
            token,
            message: 'succesfuly registared',
        })

    } catch(error) {
        res.json({
            message: 'Error creating new user'
        })
    }
}

//login
export const login = async (req, res) => {
    try{
        const { username, password } = req.body
        
        const user = await User.findOne({username})
        
        if(!user){
            return res.json({
                message: 'user does not exist'
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if(!isPasswordCorrect) {
            return res.json({
                message: 'incorrect password'
            })
        }

        const token = jwt.sign(
            {
                id: user._id
            }, 
            process.env.JWT_SECRET,
            {expiresIn: '30d'}
        )

        res.json({
            token,
            user,
            message: 'sucess auth'
        })
        
    } catch(error) {
        res.json({
            message: 'auth error'
        })
    }
}

// Get me
export const getMe = async (req, res) => {
    try{
        const user = await User.findById(req.userId)
        

        if(!user){
            return res.json({
                message: 'user does not exist' 
            })
        }

        const token = jwt.sign(
            {
                id: user._id
            }, 
            process.env.JWT_SECRET,
            {expiresIn: '30d'}
        )
        res.json({
            user,
            token,
        })

    } catch(error) {
        res.json({error})
    }
}