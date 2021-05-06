const tutorialBuilder = require('../controllers/tutorialController');
const discussionBuilder = require('../controllers/discussionController');
const userBuilder = require('../controllers/userController');
const lectureBuilder = require('../controllers/lectureController');
const docBuilder = require('../controllers/docController')
const auth = require('../controllers/authController');
const announcementBuilder = require('../controllers/announcementController');
const multer = require('multer');

const ppFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    cb(null, true)
  }
  else {
    cb(null, false)
  }
};

const ppStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './profilepics/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now().toString() + "_" + file.originalname.replace(/ +/g, ""))
  }
});

const uploadPp = multer({
  storage: ppStorage,
  limits: {
    fileSize: 1024 * 1024 * 5 //5mb
  },
  ppFilter
});

const docFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true)
  }
  else {
    cb(null, false)
  }
}

const docStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './docs/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now().toString() + "_" + file.originalname.replace(/ +/g, ""))
  }
});

const uploadDoc = multer({
  storage: docStorage,
  limits: {
    fileSize: 1024 * 1024 * 16 //16mb
  },
  docFilter
});

module.exports = (app, guard) => {  //Add guard to all get/post requests where the user has to be authenticated
  app
    .route('/tutorials')
    .get(tutorialBuilder.list_all_tutorials)
    .post(tutorialBuilder.create_a_tutorial);

  app
    .route('/tutorial/:tutorialId')
    .get(guard, tutorialBuilder.read_a_tutorial) //gotta be guarded
    .put(guard, tutorialBuilder.update_a_tutorial)
    .delete(guard, tutorialBuilder.delete_a_tutorial);
  
  app
    .route('/docs/:tutorialId')
    .get(guard, docBuilder.list_all_docs)
    .put(guard, uploadDoc.single('doc'), docBuilder.update_a_doc)
    .post(guard, uploadDoc.single('doc'), docBuilder.create_a_doc);

  app
    .route('/users')
    .get(userBuilder.list_all_users) //Would need extra permission setup for a superuser to list all other users
    .post(uploadPp.single('img'), userBuilder.create_a_user);

  app
    .route('/user/:userId')
    .get(userBuilder.read_a_user)
    .put(guard, uploadPp.single('img'), userBuilder.update_a_user)
    .delete(userBuilder.delete_a_user);

  app
    .route('/discussion/:tutorialId')
    .post(guard, discussionBuilder.create_a_comment)
    .get(guard, discussionBuilder.list_all_comments)
    .put(guard, discussionBuilder.update_a_comment)
    .delete(guard, discussionBuilder.delete_a_comment);
  
  app
    .route('/announcement/:tutorialId')
    .post(guard, announcementBuilder.create_an_announcement);
  //   .get(guard, announcementBuilder.list_all_announcements)
  //   .put(guard, announcementBuilder.update_an_announcement)
  //   .delete(guard, announcementBuilder.delete_an_announcement);

  app
    .route('/lectures')
    .get(lectureBuilder.list_all_lectures);

  app
    .route('/lecture/:lectureId')
    .get(lectureBuilder.read_a_lecture)

  app
    .route('/login')
    .post(auth.login)

  app
    .route('/verifyRefreshToken')
    .post(auth.verifyRefreshToken)

  app
    .route('/verifyTokenSalt')
    .post(guard, auth.verifyTokenSalt)

  app
    .route('/updatePassword')
    .post(guard, auth.updatePassowrd)

  app
    .route('/forgotPassowrd')
    .post(auth.generatePassToken)

};