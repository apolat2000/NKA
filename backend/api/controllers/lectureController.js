const mongoose = require('mongoose');
const Lecture = mongoose.model('Lectures');

// Access database from here, CRUD (Create, Read, Update, Delete) operations

exports.list_all_lectures = (req, res) => {
  Lecture.find({}, (err, lectures) => {
    if (err){
      res.send(err);
    }
    else {
      res.json(lectures);
    }
  });
};

exports.read_a_lecture = (req, res) => {
  
  Lecture.findById(req.params.lectureId).exec((err, lecture) => {
    if (err) {
      res.send(err);
      return;
    }
    else if (!lecture) {
      res.status(404).send();
      return;
    }
    // else if (user._id != userInToken) {
    //   res.status(401).send({ message: "Unauthorized access" })
    //   return;
    // }
    else{
      res.json(lecture);
    } 
  });
};