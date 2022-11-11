const express = require('express');
const sequelize = require('./db');
const cors = require('cors');
const fileupload = require('express-fileupload');
const path = require('path');
require('dotenv').config();
const router = require('./routes/index');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use(cors())
app.use(fileupload({}))
app.use(express.static(path.resolve(__dirname, 'static')))
app.use('/api', router)

const start = async () =>{
    try {
        
        await sequelize.authenticate();
        await sequelize.sync();

        app.listen(PORT, ()=>{
            console.log(`Server start on port - ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()