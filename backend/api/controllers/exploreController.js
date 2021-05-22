const mongoose = require('mongoose');
const strsim = require('string-similarity')

const C_o_S = mongoose.model('CoursesOfStudy');
const Lecture = mongoose.model('Lectures');
const Discussion = mongoose.model('Discussions');
const Doc = mongoose.model('Docs');
const Announcement = mongoose.model('Announcements');
const Tutorial = mongoose.model('Tutorials');
const User = mongoose.model('Users');

exports.list_search_results = (req, res) => {
    const query = req.params.query;
    const cos = req.params.cos;

    Promise.all([
        Tutorial.find({ $text: { $search: query } }).select('class_size tutor students lecture title first_date frequency description join_freely'),
        User.find({ $text: { $search: query } }).select('courses_of_study tutor_in expert_of_lectures img_path first_name last_name username email'),
        Doc.find({ $text: { $search: query } }),
        C_o_S.find({ $text: { $search: query } }),
        Lecture.find({ $text: { $search: query } })
    ])
        .then(results => {

            const [tuts, usrs, docs, coses, lecs] = results;

            let resObj = {
                tuts: tuts,
                usrs: usrs,
                docs: docs,
                coses: coses,
                lecs: lecs
            }

            res.json(resObj);

        })
        .catch(err=>{
            console.error("Something went wrong",err);
          })
}