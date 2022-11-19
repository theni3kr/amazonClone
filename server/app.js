require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
require ('./db/conn')
const cookieparser = require('cookie-parser')

const products = require('./models/productsSchema')
const router = require('./routes/router')
const DefaultData = require('./Defaultdata')
const cors = require('cors')



app.use(express.json())
app.use(cookieparser())
app.use(cors())
app.use(router)


const port = process.env.PORT || 8003

app.listen(port,()=>{
    console.log(`connected successfully on port ${port}`)
})


DefaultData()