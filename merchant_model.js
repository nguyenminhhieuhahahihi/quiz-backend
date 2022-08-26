const express = require('express');

var router = express.Router();
const { Pool, Client } = require('pg')


const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'quizapp',
  password: '040601',
  port: 5432,
});

pool.connect();

// pool.query(`Select * from answer_quiz`, (err,res) =>{
//   if(!err){
//     console.log(res.rows);
//   }
//   else{
//     console.log(err.message);
//   }
//   pool.end;
// }) 


module.exports = pool;
