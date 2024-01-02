const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const blogroutes = require('./routes/blogroute')

//express app
const app = express();

// connect to mongodb
const dburi =
  'mongodb+srv://rahulmalakar42:hulakar392@cluster0.e1hy00e.mongodb.net/nodetuts?retryWrites=true&w=majority';

mongoose
  .connect(dburi)
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

//register view engine
// app.set('views', './nodejs/server-client/views')
app.set('view engine', 'ejs');

// listen request
// app.listen(3000);

//middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

//mongoose and mongo sandbox routes
// app.get('/add-blog', (req, res) => {
//   const blog = new Blog({
//     title: 'blog 2',
//     snippet: 'This is the first blog',
//     body: 'Hello',
//   });
//   blog
//     .save()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch(() => {
//       console.log(err);
//     });
// });

// app.get('/all-blogs', (req, res) => {
//   Blog.find()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get('/single-blog', (req, res) => {
//   Blog.findById('65897e48e23f9457e4bdec76')
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

//routes
app.get('/', (req, res) => {
  //dont need setheader as express automatically infers the data type using send
  //also infers the status code, no need to manually set it
  // res.send('<p>this is page one</p>');
  //   res.sendFile('./views/index.html', { root: __dirname });
  // const blogs = [
  //   { title: 'My name is Rahul', snippet: 'this is snippet' },
  //   { title: 'My name is Ankit', snippet: 'this is snippet' },
  //   { title: 'My name is Raj', snippet: 'this is snippet' },
  // ];
  // res.render('index', { title: 'HomePage', blogs });
  res.redirect('/blogs');
});
app.get('/about', (req, res) => {
  // res.send('<p>this is page about</p>');
  //   res.sendFile('./views/about.html', { root: __dirname });
  res.render('about', { title: 'About' });
});

//redirect
// app.get('/about-us', (req, res) => {
//   res.redirect('/about');
// });

//blog routes
app.use(blogroutes);
// app.use('/blogs',blogroutes);

//404 page
app.use((req, res) => {
  // res.sendFile('./views/404.html', { root: __dirname });
  //   res.status(404).sendFile('./views/404.html', { root: __dirname });
  res.render('404', { title: '404' });
});
