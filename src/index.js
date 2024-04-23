import bodyParser from "body-parser";
import express from "express";
import {router as todoRouter} from './modules/todo/todo.controller';
import mongoose from "mongoose";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(todoRouter);

app.listen(3000, async () => {
  console.log('http://localhost:3000');
  mongoose.set('strictQuery', true);
  await mongoose.connect(
    'mongodb+srv://myadmin:061143@cluster0.hwqgegj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
  );
});