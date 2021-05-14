const mongoose = require('mongoose');
const C_o_S = mongoose.model('CoursesOfStudy');

exports.read_a_cos = (req, res) => {
    //var userInToken = req.coS.userID;
    C_o_S.findById(req.params.coSId).exec((err, coS) => {
      if (err) {
        res.send(err);
        return;
      }
      else if (!coS) {
        res.status(404).send();
        return;
      }
      // else if (coS._id != userInToken) {
      //   res.status(401).send({ message: "Unauthorized access" })
      //   return;
      // }
      else{
        res.json(coS);
      } 
    });
  };