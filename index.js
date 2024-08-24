const express = require('express');//Nhúng express vào dự án
const app = express(); // Khởi tạo ưng dụng web sử dụng express
const path = require('path');//Nhúng path vào dự án
const http = require('http');
require('dotenv').config()//Nhúng file .env vào dự án


const database=require('./config/database');
database.connect();

const routesAPI=require('./routes/client/index.route');
routesAPI(app);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})