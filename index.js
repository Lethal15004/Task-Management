const express = require('express');//Nhúng express vào dự án
const app = express(); // Khởi tạo ưng dụng web sử dụng express
const cors = require('cors') //Nhúng cors vào dự án
const path = require('path');//Nhúng path vào dự án
const http = require('http');
require('dotenv').config()//Nhúng file .env vào dự án

//Phần body-parser -> Để lấy dữ liệu từ form và fetch (Quan trọng phải có)
const bodyParser = require('body-parser');//Nhúng body-parser vào dự án
const { title } = require('process');
app.use(bodyParser.urlencoded({ extended: false }))//Nhận dữ liệu từ form
app.use(bodyParser.json());//Nhận dữ liệu từ fetch

const database=require('./config/database');
database.connect();

//CORS
const corsOptions={
  origin: 'http://example.com', //cho phép kết nối với domain này
  optionsSuccessStatus: 200  // some browsers cho phép kết nối với API bên ngoài với status code khác 200
}
app.use(cors(corsOptions))//Sử dụng cors để cho phép kết nối với API bên ngoài
//End CORS

const routesAPI=require('./routes/client/index.route');
routesAPI(app);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})