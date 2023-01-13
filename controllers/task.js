import express from 'express';
import newModel from '../models/task.js';
import {StatusCodes}  from 'http-status-codes';
const router = express.Router();
export const getAllTasks = async (req, res) => {
 try {
  // the find static func gets back all the elements in our arr back to us.
  const models = await newModel.find({});
  res.status(StatusCodes.OK).json({models});
 } catch(error) {
   res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error})
 }
}

export const createTask = async (req, res) => {
  try {
   const model = await newModel.create(req.body);
   res.status(StatusCodes.OK).json({model});
  } catch(error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error});
  }
}

export const getTask = async (req, res) => {
 try {
  const { id:taskID } = req.params;
   const modelID =  await newModel.findOne({_id:taskID});
   res.status(StatusCodes.OK).json({modelID});
   // if the id doesn't exist then we will sent this message to the client or user making the request.
   if(!modelID) {
    return res.status(StatusCodes.NOT_FOUND).json({mesg:`No task with id : ${modelID}`});
   }
 } catch(error) {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error});
 }
}

export const updateTask = async (req, res) => {
 try {
  const { id:taskID}  = req.params;
  const  task = await newModel.findOneAndUpdate({_id:taskID}, req.body, {
   new:true,
   runValidators:true,
  });
  res.status(StatusCodes.OK).json({id:taskID, data:req.body});
  res.status(StatusCodes.OK).json({task});
  // if we don't have access to that particular id then execute this cod for us;
  if(!task) {
   return res.status(StatusCodes.NOT_FOUND).json({msg:`No message with such ${taskID}`});
  }
 } catch(error) {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({task});
 }
}

export const deleteTask = async (req, res) => {
 try {
  const { id:taskID} = req.params;
  const task = await newModel.findOneAndDelete({_id:taskID});
  res.status(StatusCodes.OK).json({task})
  // if the id doesn't exist then kindly  sent an error msg to the client  by him or her the id doesn't exist.
  if(!task) {
   return res.status(StatusCodes.NOT_FOUND).json({msg:`No id with such a message do exist here ${taskID}`});
  }
 } catch(error) {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: `No task with such id exist: ${taskID}`});
 }
}

export default router;

