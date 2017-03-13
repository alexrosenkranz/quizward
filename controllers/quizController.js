var express = require('express');
var Models = require('../Models');
var bodyParser = require('body-parser');
var router = express.Router();
var jsonParse = bodyParser.urlencoded({ extended: false });



// =========== GET ROUTES ===========
// TEST ROUTE --- comment out later
router.get('/new', function(req, res) {
  res.render('quizzes/new');
});

router.get('/api/new', function(req, res) {
  Models.Category.findAll({}).then((results) => {
    res.json(results);
  });
});


// =========== POST ROUTES ===========
// Create Quiz
router.post('/create', jsonParse, (req, res) => {
  console.log(req.body);
  Models.Quiz.create({
    name: req.body.name,
    description: req.body.description,
    category_id: req.body.category,
  }).then(function(q) {
    res.json(q);
  });
});

router.post('/create/questions', jsonParse, (req, res) => {
  console.log(req.body);
  res.json(req.body);

  // for (var i = 0; i < req.body.questionList.length; i++) {
  //   Models.Question.create({
  //     quiz_id: req.body.questionList[i].quiz_id,
  //     question: req.body.questionList[i].question,
  //     answer: req.body.questionList[i].answer,
  //     explanation: req.body.questionList[i].explanation
  //   }).then(function(q) {
  //     res.json(q);
  //   });
  // }

});



module.exports = router;