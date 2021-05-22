const mongoose = require('mongoose');
const User = mongoose.model('Users');
const Tutorial = mongoose.model('Tutorials');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");

// Access database from here, CRUD (Create, Read, Update, Delete) operations

exports.list_all_users = (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.send(err);
    }
    else {
      res.json(users);
    }
  });
};

exports.create_a_user = async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  var userFound = await findByEmailUsername(req.body.username, req.body.email);
  console.log("userFound = " + userFound);
  if (!userFound || userFound.length === 0) {
    var hashedPassword = '';
    var userSalt = '';
    userSalt = await bcrypt.genSaltSync(10);
    userPassword = await req.body.password;
    console.log("userPassword = " + userPassword);
    hashedPassword = bcrypt.hashSync(userPassword, userSalt);
    console.log("hashedPassword = " + hashedPassword);
    let userToCreate = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      password: hashedPassword,
      courses_of_study: req.body.courses_of_study,
      salt: userSalt,
      email: req.body.email,
      credits: 0,
      expert_of_lectures: req.body.expert_of_lectures,
      friends: [],
      tutor_in: [],
      img_path: req.file ? req.file.path : ""
    });
    userToCreate.save()
      .then((user) => {
        const userDTO = {
          userID: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email
        };
        var jwt_token = jwt.sign(userDTO, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
        res.status(200).send({
          message: "User successufily registered!",
          jwt_token,
          userID: user._id,
          first_name: user.first_name
        })
      })
      .catch(error => {
        res.status(400).send({
          message: "An error occured!",
          error: error.message
        })
        if (req.file) fs.unlink(req.file.path, () => { })
      })
  } else {
    res.status(400).send();
    if (req.file) fs.unlink(req.file.path, () => { })
  }
};

function findByEmailUsername(username, email) {
  return User.find({ $or: [{ username }, { email }] });
}

exports.read_a_user = (req, res) => {

  if (req.params.userId) {
    var query = User.findById(req.params.userId);
  }
  else res.send(err);

  const wantedField = req.params.field;

  switch (wantedField) {
    case 'courses_of_study':
      query.populate(wantedField, 'verbose_name -_id');
      query.select(wantedField + ' -_id');
      break;
    case 'lecture':
      query.populate(wantedField, 'verbose_name');
      break;
    default:
      query.populate(wantedField, 'title');
      break;
  }

  query.exec((err, user) => {
    if (err) {
      res.send(err);
      return;
    }
    else if (!user) {
      res.status(404).send();
      return;
    }
    else {
      console.log(user);
      res.json(user);
    }
  })

};

exports.update_a_user = (req, res) => {
  var userInToken = req.user.userID;
  User.findById(req.params.userId, (err, user) => {
    if (err) {
      res.send(err);
      return;
    }
    if (!user) {
      res.status(404).send();
      return;
    }
    if (user._id != userInToken) {
      res.status(401).send({ message: "Unauthorized access" })
      return;
    }
    if (req.file) req.body.img_path = req.file.path;
    console.log(req.file);
    req.body.expert_of_lectures ? req.body.expert_of_lectures = req.body.expert_of_lectures.split(',') : [];
    if (req.body.password) {
      let salt = bcrypt.genSaltSync(10);
      let password = bcrypt.hashSync(req.body.password, salt);
      req.body.salt = salt;
      req.body.password = password;
    }
    if (req.file) req.body.img_path = req.file.path;
    if (req.body.img_path === '') { //Remove PP
      fs.unlink(user.img_path, () => { })
    }
    User.findOneAndUpdate(
      { _id: user._id },
      req.body,
      { new: true },
      (err, user) => {
        if (err) res.send(err);
        else res.json(user);
      }
    );
  })
};

exports.delete_a_user = (req, res) => {
  //var userInToken = req.user.userID;
  User.findById(req.params.userId, (err, user) => {
    if (err) {
      res.send(err);
      return;
    }
    if (!user) {
      res.status(404).send();
      return;
    }
    if (user._id != userInToken) {
      res.status(401).send({ message: "Unauthorized access" })
      return;
    }
    User.deleteOne({ _id: user._id }, err => {
      if (err) res.send(err);
      else {
        let refErr = removeRefTut(user._id)
        if (refErr) {
          res.send(errrefErr);
          return;
        }
        res.json({
          message: 'user successfully deleted.',
          _id: req.params.userId
        });
      }
    });
  })
};

function removeRefTut(userID) {
  Tutorial.find({ tutor: userID }, (err, tutorials) => {
    if (!err) {
      tutorials.forEach(tutorial => {
        Tutorial.deleteOne({ _id: tutorial._id }, (err) => {
          if (!err) {
            let refUser = removeRefUsers(tutorial._id)
            if (refUser) return refUser
          }
          else return err
        })
      });
    }
  })
}

function removeRefUsers(tutID) {
  User.updateMany({ student_in: tutID }, { $pullAll: { student_in: [tutID] } }, err => {
    if (err) {
      return err
    }
    else return false
  });
}
