import express  from "express";
import task from './routes/task.js';
import connectDB from './db/connect.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
//app.use(express.static('./public'));
app.use(express.json());
app.use('/api/v1/task', task);
// General routes structure
// app.get('/api/v1/task) - get all task
// app.post('/api/v2/task) - create some new task
// app.patch('/api/v3/task:id') - update some existing task
// app.delete('/api/v4/task:id') - delete a particular task.
const start = async() => {
 try {
   await connectDB(process.env.MUNGO_URL)
   app.listen(PORT, () => {
    console.log(`Server is runing on Port ${PORT}...`);
   });
 } catch(error) {
  console.log(error);
 }
}

start();
