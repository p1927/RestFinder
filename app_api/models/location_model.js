var mongoose= require('mongoose');

var commentreplies= new mongoose.Schema({
replydate:  	{ type: Date,  default: Date.now},
reply:      	{ type: String, required: true},
author:         { type: String},
upvotes:        { type:Number, "default":0}
});

var reviewcomment= new mongoose.Schema({ 
commentdate:    { type: Date,  default: Date.now},
comment :       { type: String, required: true},
author:         { type: String},
replynos:    	{ type:Number, "default":0},
upvotes:        { type:Number, "default":0},
replies: 		[commentreplies]
});

var locationreview= new mongoose.Schema({
reviewtitle: 	{ type: String, required: true},
rating: 		{ type: Number, "default":0, min:0,max:5},
reviewdate:     { type: Date,  default: Date.now},
review:         { type: String, required: true},
author:         { type: String},
commentnos:     { type:Number, "default":0},
upvotes:        { type:Number, "default":0},
comments: 		 [reviewcomment] 

});

var locationschema=new mongoose.Schema({
name: 			{ type: String, required: true},
tagline: 		{ type: String},
avgrating: 		{ type: Number, "default":0, min:0,max:5},
distance: 		{ type: String},
address:  		{ type: String, required: true},
openinghrs: 	{ type: [String],"default": 'NA'},
facilities: 	{ type: [String],"default": 'NA'},
email: 			{ type: String},
website: 		{ type: String},
telephone: 		{ type: String},
coords: 		{ type: [Number], required:true, index:'2dsphere'},
reviews: [locationreview]
});

module.exports=mongoose.model('Location',locationschema);
				
						



