const mongoose = require('mongoose');
const { Schema } = mongoose;

/* 
Schema for notes
title : title of the task note
status : status of the task note
desc : description of the task note
date : date of the task note
priority : priority of the task note
*/
const notesSchema = new Schema({
   title : {
    type : String,
    required : true
   },   
   status : {
    type : String,
    required : true
   },    
   desc : {
    type : String,
    required : true
   },    
   date : {
    type : Date,
   },   
   priority : {
    type : String,
    default : 'low'
   } 
  });

module.exports = mongoose.model('notes', notesSchema);