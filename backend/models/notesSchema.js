const mongoose = require('mongoose');
const { Schema } = mongoose;

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

module.exports = mongoose.model('notes',notesSchema);