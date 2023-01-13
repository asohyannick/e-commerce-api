import mongoose from 'mongoose';
const taskSchema = new mongoose.Schema({
 name:{
  type:String,
  // adding validations
  // read more about validations from the mongoose docs
  required:[true, 'must provide a name.'],
  trim:true,
  maxlength:[20, 'name cannot be more than 20 characters']
 },
 completed:{
  type:Boolean,
  default:false,
 },
 title:String,
 message:String,
 creator:String,
 tags: [String],
 likeCount: {
  type:Number,
  default:0,
 },
 createdAt: {
  type:Date,
  default: new Date(),
 },
 author:String,
 body:String,
 comments:[{body:String, date:Date}],
 date: {
  type:Date, 
  default:Date.now
 },
 hidden:Boolean,
 meta: {
  votes:Number,
  favs:Number,
 }
});

const newModel = mongoose.model('task', taskSchema);

export default newModel;