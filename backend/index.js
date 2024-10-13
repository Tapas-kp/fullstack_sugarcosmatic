require('dotenv').config()
const express = require('express');
const cors = require('cors');
const connected = require('./config/db');
const productRouter = require('./routes/productRoutes');
const cookieParser = require("cookie-parser");
const userRouter = require('./routes/userRoutes');
const { authenticateToken } = require('./middleWare/authMiddleware');
const router = require('./routes/wishlistRoutes');

connected()

const app = express()
app.use(express.json())
app.use(cors({origin:"https://waqi-sugar-cosmetics.vercel.app" ,credentials:true}))
app.use(cookieParser())
const port = process.env.PORT;

app.use(productRouter)
app.use(userRouter)
app.use("/wishlist", authenticateToken, router)

app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})