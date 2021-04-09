const mongoose = require('mongoose');
const Tutorial = mongoose.model('Tutorials');
const User = mongoose.model('Users');

// Access database from here, CRUD (Create, Read, Update, Delete) operations

exports.list_all_tutorials = (req, res) => {
  Tutorial.find({}).populate('lecture', 'title').populate('tutor', 'first_name last_name img_path').exec((err, tutorials) => {
    if (err) {
      res.send(err);
    }
    else {
      res.json(tutorials);
    }
  });
};

exports.create_a_tutorial = (req, res) => {
  const newtutorial = new Tutorial({
    class_size: req.body.class_size,
    tutor: req.body.tutor, //this is the id
    lecture: req.body.lecture,
    title: req.body.title,
    creation_date: req.body.creation_date,
    students: req.body.students,
    first_date: req.body.first_date,
    frequency: req.body.frequency,
    description: req.body.description,
    is_active: req.body.is_active
  });
  
  newtutorial.save();
  
  User.findByIdAndUpdate(
    req.body.tutor, 
    { $push: { tutor_in: newtutorial._id }}, 
    function(error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log(success);
      }
    }
  );
};

exports.read_a_tutorial = (req, res) => {
  Tutorial.findById(req.params.tutorialId).populate('lecture', 'title').populate('tutor', ['first_name' ,'last_name' ,'img_path']).exec((err, tutorial) => {
    if (err) {
      res.send(err);
    }
    else {
      res.json(tutorial);
    }
  });
};

exports.update_a_tutorial = (req, res) => {
  var userInToken = req.user.userID;
  Tutorial.findById(req.params.tutorialId, (err, tutorial) => {
    if (err) {
      res.send(err);
      return;
    }
    else if (!tutorial) {
      res.status(404).send();
      return;
    }
    else if (tutorial.tutor != userInToken) {
      res.status(401).send({ message: "Unauthorized access" })
      return;
    }
    Tutorial.findOneAndUpdate(
      { _id: tutorial._id },
      req.body,
      { new: true },
      (err, tutorial) => {
        if (err) res.send(err);
        else if (tutorial.tutor != userInToken) res.status(401).send({ message: "Unauthorized access" })
        res.json(tutorial);
      }
    );
  })
};

exports.delete_a_tutorial = (req, res) => {
  var userInToken = req.user.userID;
  Tutorial.findById(req.params.tutorialId, (err, tutorial) => {
    if (err) {
      res.send(err);
      return;
    }
    if (!tutorial) {
      res.status(404).send();
      return;
    }
    if (tutorial.tutor != userInToken) {
      res.status(401).send({ message: "Unauthorized access" })
      return;
    }
    Tutorial.deleteOne({ _id: tutorial._id }, err => {
      if (err) res.send(err);
      else {
        let errRef = removeRefUsers(tutorial._id)
        if (errRef) {
          res.send(err);
          return
        }
        res.json({
          message: 'tutorial successfully deleted.',
          _id: req.params.tutorialId
        });
      }
    });
  })
};

function removeRefUsers(tutID) {
  User.updateMany({ student_in: tutID }, { $pullAll: { student_in: [tutID] } }, err => {
    if (err) {
      return err
    }
    else return false
  });
}