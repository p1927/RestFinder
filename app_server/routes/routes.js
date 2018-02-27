var express = require('express');
var router = express.Router();
var LocationCtrl=require('../controllers/locations');
var OthersCtrl=require('../controllers/others');

/* GET Location pages. */
router.get('/locations',LocationCtrl.GetAllLocations);
router.get('/locations/distance',LocationCtrl.GetDistanceLocations);
router.get('/locations/:locationid',LocationCtrl.GetSingleLocation);
router.get('/locations/:locationid/review',LocationCtrl.GetAllReviews);
router.get('/locations/:locationid/review/new',LocationCtrl.CreateReview);

router.post('/locations/:locationid/review/new',LocationCtrl.PostReview);
router.post('/locations',LocationCtrl.PostLocation);

router.delete('/locations/:locationid/:reviewid',LocationCtrl.DeleteReview);


/* GET home page. */
router.get('/about',OthersCtrl.About);
router.get('/',OthersCtrl.Home);

module.exports = router;
