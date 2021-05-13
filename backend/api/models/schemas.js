const mongoose = require("mongoose");
const { Schema } = mongoose;
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// membership (students and tutors) to tutorials are SAVED IN tutorialsSchema !!!!


const tutorialsSchema = new Schema(
  {
    class_size: { type: Number, min: 1, max: 15 },

    tutor: { type: Schema.Types.ObjectId, ref: "Users" }, //foreign key
    students: [
      { type: Schema.Types.ObjectId, ref: "Users" }, //foreign keys -- redundant because tutorial IDs are saved in user.student_in
    ],

    lecture: { type: Schema.Types.ObjectId, ref: "Lectures" }, //foreign key
    title: String,
    creation_date: { type: Date, default: Date.now },
    first_date: Date,
    frequency: {
      type: String,
      enum: ['WEEKLY', 'MONTHLY', 'IRREGULAR', 'ONE-SHOT']
    },
    description: String,
    is_active: Boolean,
    join_freely: { type: Boolean, default: true }
  },
  { collection: "Tutorials" }
);

const usersSchema = new Schema({
  first_name: String,
  last_name: String,
  username: { type: String, unique: true },
  email: {
    type: String,
    validate: {
      validator: function (email) {
        return emailRegex.test(email);
      }, message: props => `${props.value} is not a valid e-mail!`
    }
  },
  bio: {
    type: String,
    maxlength: 280
  },
  salt: String,
  password: String,
  friends: [{
    type: Schema.Types.ObjectId, ref: 'Users' //foreign keys
  }],
  course_of_study: [{ type: Schema.Types.ObjectId, ref: 'CoursesOfStudy' }],
  credits: Number,
  creation_date: { type: Date, default: Date.now },
  // tutor_in: [
  //   { type: Schema.Types.ObjectId, ref: 'Tutorials' } //foreign keys -- redundant because tutorID is saved in tutorial.tutor
  // ],
  // student_in: [
  //   { type: Schema.Types.ObjectId, ref: 'Tutorials' } //foreign keys
  // ],
  expert_of_lectures: [{ type: Schema.Types.ObjectId, ref: 'Lectures' }],
  img_path: { type: String, default: '' },
},
  { collection: "Users" }
);

const docsSchema = new Schema({
  title: String,
  description: String,
  tut: { type: Schema.Types.ObjectId, ref: 'Tutorials' }, //foreign keys -- redundant because tutorID is saved in tutorial.tutor
  created_by: { type: Schema.Types.ObjectId, ref: "Users" }, //foreign key
  visibility: {
    type: String,
    enum: ['TUTOR', 'CLASS', 'ALL']
  },
  doc_path: { type: String, default: '' },
  creation_date: { type: Date, default: Date.now },
  preview_path: { type: String, default: '' }
},
  { collection: "Docs" }
);

const lecturesSchema = new Schema({
  title: String,
  description: String,
  is_active: Boolean,
  course_of_study: [{ type: Schema.Types.ObjectId, ref: 'CoursesOfStudy' }]
},
  { collection: "Lectures" }
);

const courseOfStudySchema = new Schema({
  name: String,
  verbose_name: String,
  description: String
},
  { collection: "CoursesOfStudy" }
);

const discussionsSchema = new Schema({
  value: String,
  creation_date: { type: Date, default: Date.now },
  visibility: {
    type: String,
    enum: ['TUTOR', 'CLASS', 'ALL']
  },
  isAsk: Boolean,
  userId: { type: Schema.Types.ObjectId, ref: "Users" }, //foreign key
  tutorialId: { type: Schema.Types.ObjectId, ref: "Tutorials" } //foreign key
},
  { collection: "Discussions" }
);

const announcementsSchema = new Schema({
  corpus: String,
  creation_date: { type: Date, default: Date.now },
  variant: {
    type: String,
    enum: ['WARNING', 'INFO', 'USUAL']
  },
  importance: Number, //1 === 'KINDA, 2 === 'IMPORTANT', 3 === 'REALLY'
  tutorialId: { type: Schema.Types.ObjectId, ref: "Tutorials" } //foreign key
},
  { collection: "Announcements" }
);

const Users = mongoose.model('Users', usersSchema);
const Tutorials = mongoose.model('Tutorials', tutorialsSchema);
const Lectures = mongoose.model('Lectures', lecturesSchema);
const Discussions = mongoose.model('Discussions', discussionsSchema);
const Docs = mongoose.model('Docs', docsSchema);
const Announcements = mongoose.model('Announcements', announcementsSchema);

module.exports = { Users, Tutorials, Lectures, Discussions, Docs, Announcements };
