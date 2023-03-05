const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { User, Post } = require('./models/model');



mongoose.connect('mongodb://127.0.0.1:27017/newsfeed', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })


const app = express();


app.use(bodyParser.json());



app.get('/users', (req, res) => {
    User.find()
        .then(user => {
            res.send(user);
        })
        .catch(error => {
            console.error(error);
            res.sendStatus(500);
        })
})


app.post("/users", (req, res) => {
    const user = new User(req.body);
    user.save()
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            console.error(error);
            res.sendStatus(500);
        })
})


app.get("/users/:id", (req, res) => {
    User.findById(req.params.id)
      .then(user => {
        if (user) {
          res.send(user);
        } else {
          res.sendStatus(404);
        }
      })
      .catch(error => {
        console.log(error);
        res.sendStatus(500);
      });
  });
  
  app.put("/users/:id", (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body)
      .then(user => {
        if (user) {
          res.sendStatus(200);
        } else {
          res.sendStatus(404);
        }
      })
      .catch(error => {
        console.log(error);
        res.sendStatus(500);
      });
  });
  
  app.delete("/users/:id", (req, res) => {
    User.findByIdAndDelete(req.params.id)
      .then(user => {
        if (user) {
          res.sendStatus(200);
        } else {
          res.sendStatus(404);
        }
      })
      .catch(error => {
        console.log(error);
        res.sendStatus(500);
      });
  });
  
  // API cho bài viết
  app.get("/posts", (req, res) => {
    Post.find()
      .populate("author")
      .then(posts => {
        res.send(posts);
      })
      .catch(error => {
        console.log(error);
        res.sendStatus(500);
      });
  });
  
  app.post("/posts", (req, res) => {
    const post = new Post(req.body);
    post
      .save()
      .then(result => {
        res.send(result);
      })
      .catch(error => {
        console.log(error);
        res.sendStatus(500);
      });
  });
  
  app.get("/posts/:id", (req, res) => {
    Post.findById(req.params.id)
      .populate("author")
      .then(post => {
        if (post) {
          res.send(post);
        } else {
          res.sendStatus(404);
        }
      })
      .catch(error => {
        console.log(error);
        res.sendStatus(500);
      });
  });
  
  app.put("/posts/:id", (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body)
      .then(post => {
        if (post) {
          res.sendStatus(200);
        } else {
          res.sendStatus(404);
        }
      })
      .catch(error => {
        console.log(error);
        res.sendStatus(500);
      });
  });
  
  app.delete("/posts/:id", (req, res) => {
    Post.findByIdAndDelete(req.params.id)
      .then(post => {
        if (post) {
          res.sendStatus(200);
        } else {
          res.sendStatus(404);
        }
      })
      .catch(error => {
        console.log(error);
        res.sendStatus(500);
      });
  });
  
  app.listen(3000, () => {
    console.log("Server started on port 3000.");
  });