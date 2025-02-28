import jwt from 'jsonwebtoken'

export const checkAuth = (req, res, next) => {
    // console.log("Header : ", req.headers.authorization );
    
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

    if(token){
        try {
            const decodedId = jwt.verify(token, process.env.JWT_SECRET)
            // console.log('Decoded Token:', decodedId)

            req.userId = decodedId.id

            next()
        } catch (error) {
            return res.json({
                message: 'no acess'
            })
        }
    } else{
        return res.json({
            message: 'no acess'
        })
    }
}