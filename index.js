

//import dotenv from 'dotenv';

const express = require('express')
const pool = require('./merchant_model.js')
const app = express()
const cors = require("cors");

var multer = require('multer')


require("dotenv").config();
//dotenv.config();

app.use(cors({ origin: true, credentials: true }));

app.use(express.json())
app.set('view engine', 'ejs')
app.set('views', './views')

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


const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

app.get('/form', (req, res) => {
  res.render('form')
})


// lưu trữ file
var storage = multer.diskStorage({
  destination: function(req,file,cb){
    cb(null,'./upload')
  },
  filename: function(req,file,cb){ 
    cb(null,file.originalname)      // lưu tên file = tên file đã tải
  }
})

var upload = multer({storage: storage})
app.post('/upload', upload.single("file"), function(req,res){
  console.log(req.file)
  res.send("Upload file thành công!")
  if(req.file ==""){
    res.send("lỗi")
  }
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




