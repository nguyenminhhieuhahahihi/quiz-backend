



const express = require('express')
const pool = require('./merchant_model.js')
const app = express()
const cors = require("cors");
const port = 3001
require("dotenv").config();

app.use(cors({ origin: true, credentials: true }));

app.use(express.json())


const swaggerUiExpress = require('swagger-ui-express'),
swaggerFile = require('./swagger.json');
app.use(
  '/doc',
  swaggerUiExpress.serve, 
  swaggerUiExpress.setup(swaggerFile)
);


app.get('/', (req, res) => {
  res.status(200).send('Hello!');
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})




// app.get('/quiz', (req, res) => {
//   pool.query(`Select quiz.category,quiz."type",quiz.difficulty,quiz.question,quiz.correct_answer,quiz.quiz_id,quiz_incorrectanswer.incorrect_answers,quiz_incorrectanswer.quiz_id from quiz, quiz_incorrectanswer where quiz.quiz_id = quiz_incorrectanswer.quiz_id `, (err, result) => {
//     if (!err) {
//       res.send(result.rows);



//     }
//   });
//   pool.end;
// })

app.get('/quiz', async (req, res) => {
  let datas = [];

  try {
    const { rows: quizs } = await pool.query(`select * from quiz`);

    for (const quiz of quizs) {
      const { rows: quizIncorrect } = await pool.query(`select * from quiz_incorrectanswer where quiz_id = ${quiz.quiz_id}`);
      console.log(quizIncorrect);



      datas.push({
        ...quiz,
        incorrect_answers: quizIncorrect.map(item => item.incorrect_answers)
      })

    }

  } catch (error) {
    console.log("Error: ", error);
    res.end(JSON.stringify({ error: "Loi khong truy can duoc" }));
  }

  await pool.end;
  console.log("Final data: ", datas);
  res.end(JSON.stringify(datas));


})



// add
// app.post('/question/add', (req, res)=> {
//   const Question = req.body;
//   console.log(Question)
//   let insertQuery = `insert into question_quiz(id, question, ans_id) 
//                      values(${Question.id}, '${Question.question}', '${Question.ans_id}')`

//                      pool.query(insertQuery, (err, result)=>{
//       if(!err){
//           res.send('Insertion was successful')
//       }
//       else{ console.log(err.message) }
//   })
//   pool.end;
// })

pool.connect();




