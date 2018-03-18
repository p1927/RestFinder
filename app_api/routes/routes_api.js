var express = require('express');
var router = express.Router();
var LocationCtrl = require('../controllers/locations_api');
var ctrlAuth = require('../controllers/authentication');

var jwt = require('express-jwt');
var auth = jwt({
	secret: process.env.JWT_SECRET,
	userProperty: 'payload'
});

/* GET Location pages. */
router.get('/locations/distance', LocationCtrl.AllDistanceLocations);
router.get('/locations', LocationCtrl.AllLocations);
router.get('/locations/:locationid', LocationCtrl.SingleLocation);
router.get('/locations/:locationid/review', LocationCtrl.AllReviews);
router.get('/locations/:locationid/:reviewid', LocationCtrl.SingleReviews);
router.get('/locations/:locationid/:reviewid/comment', LocationCtrl.AllComments);
router.get('/locations/:locationid/:reviewid/:commentid', LocationCtrl.SingleComment);
//router.get('/locations/:locationid/:reviewid/:commentid/reply',LocationCtrl.AllReplies);
//router.get('/locations/:locationid/:reviewid/:commentid/:replyid',LocationCtrl.SingleReply);

/* POST Location pages. */
router.post('/locations', LocationCtrl.AddLocation);
router.post('/locations/:locationid/review', auth, LocationCtrl.AddReview);
router.post('/locations/:locationid/:reviewid/comment', auth, LocationCtrl.AddComment);
router.post('/locations/:locationid/:reviewid/:commentid/reply', auth, LocationCtrl.AddReply);


/* PUT Location pages. */
router.put('/locations/:locationid', auth, LocationCtrl.EditLocation);
router.put('/locations/:locationid/:reviewid', auth, LocationCtrl.EditReviews);
router.put('/locations/:locationid/:reviewid/upvotes', LocationCtrl.UpdateUpvotes);
router.put('/locations/:locationid/:reviewid/:commentid/upvotes', LocationCtrl.UpdateUpvotes);

/* DELETE Location pages. */
router.delete('/locations', auth, LocationCtrl.Delete_AllLocations);
router.delete('/locations/:locationid', auth, LocationCtrl.Delete_SingleLocation);
router.delete('/locations/:locationid/reviews', auth, LocationCtrl.Delete_AllReviews);
router.delete('/locations/:locationid/:reviewid', auth, LocationCtrl.Delete_SingleReviews);
router.delete('/locations/:locationid/:reviewid/comments', auth, LocationCtrl.Delete_AllComments);
router.delete('/locations/:locationid/:reviewid/:commentid', auth, LocationCtrl.Delete_SingleComment);
router.delete('/locations/:locationid/:reviewid/:commentid/replies', auth, LocationCtrl.Delete_AllReplies);
router.delete('/locations/:locationid/:reviewid/:commentid/:replyid', auth, LocationCtrl.Delete_SingleReply);

///////////////////////////////////////////////////////////////User Authentication routes
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);
router.get('/userexists',ctrlAuth.userexists);  // register form on focus out check

module.exports = router;