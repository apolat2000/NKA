const mongoose = require('mongoose');
const Announcement = mongoose.model('Announcements');
const Tutorial = mongoose.model('Tutorials');

// Access database from here, CRUD (Create, Read, Update, Delete) operations

exports.create_an_announcement = (req, res) => {
    let userInToken = req.user.userID;
    let tutorialId = req.params.tutorialId;

    Tutorial.findById(tutorialId).select('tutor').exec((err, tutorial) => {
        if (""+tutorial.tutor._id === userInToken) {
            var newAnnouncement = new Announcement(req.body);
            newAnnouncement.tutorialId = tutorialId;
            newAnnouncement.save((err, announcement) => {
                if (err) {
                    res.send(err);
                }
                else {
                    res.json(announcement);
                }
            });
        }
    })
};

exports.list_all_announcements = (req, res) => {
    let myScope = req.headers['scope'];
    let myTutId = req.params.tutorialId;
    console.log(myTutId);

    if (myScope === 'global') {
        Discussion.find({ tutorialId: myTutId, visibility: 'ALL' }).populate('userId').exec((err, announcement) => {
            if (err) {
                res.send(err);
            }
            else {
                res.json(announcement);
            }
        });
    } else if (myScope === 'student') {
        Discussion.find({ tutorialId: myTutId }).or([{ visibility: { $in: ['ALL', 'CLASS'] } }, { userId: req.user.userID }]).populate('userId').exec((err, announcement) => {
            if (err) {
                res.send(err);
            }
            else {
                res.json(announcement);
            }
        });
    } else if (myScope === 'tutor') {
        Discussion.find({ tutorialId: myTutId }).or([{ visibility: { $in: ['ALL', 'CLASS', 'TUTOR'] } }, { userId: req.user.userID }]).populate('userId').exec((err, announcement) => {
            if (err) {
                res.send(err);
            }
            else {
                res.json(announcement);
            }
        });
    }

};

exports.update_an_announcement = (req, res) => {
    var userInToken = req.user.userID;
    Discussion.findById(req.body.announcementId, (err, announcement) => {
        if (err) {
            res.send(err);
            return;
        }
        else if (!announcement) {
            res.status(404).send();
            return;
        }
        else if (announcement.userId != userInToken) {
            res.status(401).send({ message: "Unauthorized access" })
            return;
        }
        Discussion.findOneAndUpdate(
            { _id: announcement._id },
            req.body,
            { new: true },
            (err, announcement) => {
                if (err) res.send(err);
                else if (announcement.userId != userInToken) res.status(401).send({ message: "Unauthorized access" })
                res.json(announcement);
            }
        );
    })
};

exports.delete_an_announcement = (req, res) => {
    var userInToken = req.user.userID;
    Discussion.findById(req.headers['announcementid'], (err, announcement) => {
        if (err) {
            res.send(err);
            return;
        }
        if (!announcement) {
            res.status(404).send();
            return;
        }
        if (announcement.userId != userInToken) {
            res.status(401).send({ message: "Unauthorized access" })
            return;
        }
        Discussion.deleteOne({ _id: announcement._id }, err => {
            if (err) res.send(err);
            else {
                res.json({
                    message: 'Comment successfully deleted.',
                });
            }
        });
    })
};
