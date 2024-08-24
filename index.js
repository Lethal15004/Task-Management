const express = require('express');//Nhúng express vào dự án
const app = express(); // Khởi tạo ưng dụng web sử dụng express
const path = require('path');//Nhúng path vào dự án
const http = require('http');
require('dotenv').config()//Nhúng file .env vào dự án


const database=require('./config/database');
database.connect();

const Task=require('./model/task.model');
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find({
    deleted: false
  });
  res.json(tasks);
})
app.get('/tasks/detail/:id', async (req, res) => {
  try {
    const task = await Task.findOne({
      _id:req.params.id,
      deleted: false
    });
    res.json(task);
  } catch (error) {
    res.json({message: 'Task not found'});
  }
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})