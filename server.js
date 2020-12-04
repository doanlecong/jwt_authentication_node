require('dotenv').config()
const express  =  require ('express');
const jwt = require('jsonwebtoken')
const app  =  express();

app.use(express.json())

const posts = [
    {
        username: "Doan",
        title : "Post 1",
    },{
        username: "Le",
        title : "Post 2"
    }
]

app.get('/posts', authenticateToken, (req, res) => {
    res.json(posts.filter(item => item.username == req.user.name))
    //res.json(posts);
})


function authenticateToken(req, res, nex) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err, user) => {
        if(err) res.sendStatus(403)

        req.user = user

        nex()
    })
}

app.listen(3000);