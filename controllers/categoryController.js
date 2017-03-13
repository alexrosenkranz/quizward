var express = require('express');
var Models = require('../Models');
var multer = require('multer');
var router = express.Router();

// var maxSize = 1 * 1000 * 1000;
// limits: { fileSize: maxSize }
var upload = multer({ dest: 'public/assets/images/uploads/' });

// router.use(multer({ dest: './public/uploads/' }));

// =========== GET ROUTES ===========
// TEST ROUTE --- comment out later
router.get('/', function(req, res) {
  Models.Category.findAll({}).then((results) => {
    var categories = {
      categories: results
    };
    res.render('categories/all', categories);
  });

});

router.get('/:id', function(req, res) {
  let catId = req.params.id;
  console.log('Page id: ' + catId);
  Models.Category.findOne({ where: { id: catId } }).then((results) => {
    var category = {
      category: results
    };
    res.render('categories/single', category);
  });

});


// Pass categories to new quiz select
router.get('/new', function(req, res) {
  Models.User.findAll({}).then((results) => {
    var users = {
      users: results
    };
    res.render('categories/new', users);
  });

});




// =========== POST ROUTES ===========
// Create Category

router.post('/new', upload.single('image'), (req, res) => {
  Models.Category.create({
    name: req.body.name,
    description: req.body.description,
    image: req.file.originalname
  }).then(function() {
    res.redirect('/categories/new');
  })
});


module.exports = router;