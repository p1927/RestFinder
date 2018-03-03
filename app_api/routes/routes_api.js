var express = require('express');
var router = express.Router();
var LocationCtrl=require('../controllers/locations_api');
var OthersCtrl=require('../controllers/others');

/* GET Location pages. */
router.get('/locations/distance',LocationCtrl.AllDistanceLocations);
router.get('/locations',LocationCtrl.AllLocations);
router.get('/locations/:locationid',LocationCtrl.SingleLocation);
router.get('/locations/:locationid/review',LocationCtrl.AllReviews);
router.get('/locations/:locationid/:reviewid',LocationCtrl.SingleReviews);
router.get('/locations/:locationid/:reviewid/comment',LocationCtrl.AllComments);
router.get('/locations/:locationid/:reviewid/:commentid',LocationCtrl.SingleComment);
//router.get('/locations/:locationid/:reviewid/:commentid/reply',LocationCtrl.AllReplies);
//router.get('/locations/:locationid/:reviewid/:commentid/:replyid',LocationCtrl.SingleReply);

/* POST Location pages. */
router.post('/locations',LocationCtrl.AddLocation);
router.post('/locations/:locationid/review',LocationCtrl.AddReview);
router.post('/locations/:locationid/:reviewid/comment',LocationCtrl.AddComment);
router.post('/locations/:locationid/:reviewid/:commentid/reply',LocationCtrl.AddReply);


/* PUT Location pages. */
router.put('/locations/:locationid',LocationCtrl.EditLocation);
router.put('/locations/:locationid/:reviewid',LocationCtrl.EditReviews);

/* DELETE Location pages. */
router.delete('/locations',LocationCtrl.Delete_AllLocations);
router.delete('/locations/:locationid',LocationCtrl.Delete_SingleLocation);
router.delete('/locations/:locationid/reviews',LocationCtrl.Delete_AllReviews);
router.delete('/locations/:locationid/:reviewid',LocationCtrl.Delete_SingleReviews);
router.delete('/locations/:locationid/:reviewid/comments',LocationCtrl.Delete_AllComments);
router.delete('/locations/:locationid/:reviewid/:commentid',LocationCtrl.Delete_SingleComment);
router.delete('/locations/:locationid/:reviewid/:commentid/replies',LocationCtrl.Delete_AllReplies);
router.delete('/locations/:locationid/:reviewid/:commentid/:replyid',LocationCtrl.Delete_SingleReply);
/* GET home page. */
// router.get('/about',OthersCtrl.About);
// router.get('/',OthersCtrl.Home);

module.exports = router;
