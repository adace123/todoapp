const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const Todo = require('./todoModel');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('json spaces', 2);
app.use(express.static(__dirname + '/public'));
mongoose.connect('mongodb://127.0.0.1/todos');

app.listen(process.env.PORT || 3000,()=>{
   console.log('listening...'); 
});

app.get('/', (req,res) => {
   Todo.find().then(todos => {
      res.render('index',{todos}); 
   });
});

//api routes

app.get('/api/todos', (req, res) => {
   Todo.find().then(todos => {
      res.json(todos);
   });
});

app.get('/api/todos/:todoid', (req,res) => {
   Todo.findById(req.params.todoid).then(todo => {
      res.json(todo);
   });
});

app.post('/api/todos/', (req,res) => {
   let todo = new Todo({
      content: req.body.content,
      complete: false
   });
   todo.save().then((todo) => {
      if(todo) {
         res.json(todo);
      } else res.json({"error": "something went wrong"});
   });
});

app.post('/api/todos/update/:todoid', (req, res) => {
   Todo.findById(req.params.todoid).then((todo) => {
      if(req.body.complete) {
        todo.complete = !todo.complete; 
      }
      todo.save(function() {
         res.json(todo);
      });
   });
});

app.post('/api/todos/delete/:todoid', (req,res) => {
   Todo.findByIdAndRemove(req.params.todoid).then((todo) => {
      if(todo) {
         res.json(todo);
      } else res.json({"error": "something went wrong"});
   });
});