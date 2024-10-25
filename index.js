const express = require('express')
const mongoose = require('mongoose')
const qrcode = require('qrcode')
const holdersRouter = require("./routers/holders")
const laptopsRouter = require("./routers/laptops")
const entrysRouter = require("./routers/entrys")
require('dotenv').config()

const index= express()
index.use(express.json())
index.use("/api/holder", holdersRouter)
index.use("/api/laptop", laptopsRouter)
index.use("/api/entry", entrysRouter)



index.listen(process.env.PORT,()=>{
    console.log(`Servidor escuchando en el ${process.env.PORT}`);
    mongoose.connect(process.env.CNX_MONGO)
    .then(()=> console.log('Connected!'))
    .catch((error)=> console.log(error))
})