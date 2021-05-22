const mongoose = require('mongoose');
const C_o_S = mongoose.model('CoursesOfStudy');

exports.read_a_cos = (req, res) => {

  const query = req.params.query;

  C_o_S.find({ $text: { $search: query } })

  };