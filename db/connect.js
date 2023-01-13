import mongoose from 'mongoose';
const connectDB =  async (url) => {
 mongoose.set('strictQuery', false);
 return await mongoose.connect(url, {
  useNewUrlParser:true,
 }).then(() => console.log(`CONNECTED TO THE DB...`))
 .catch((err) => console.log(err));
}

export default connectDB;
