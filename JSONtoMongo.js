'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config');

/* Connect to your database using mongoose - remember to keep your key secret*/
//see https://mongoosejs.com/docs/connections.html
//See https://docs.atlas.mongodb.com/driver-connection/
mongoose.connect(config.db.uri);

/* 
  Instantiate a mongoose model for each listing object in the JSON file, 
  and then save it to your Mongo database 
  //see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach

  Remember that we needed to read in a file like we did in Bootcamp Assignment #1.
 */
 fs.readFile('listings.json', 'utf8', function(err, data) {
	 if (err) {return console.log(err);}
	 
	 //parse listings.JSON object
	 var parsedListings = JSON.parse(data);
	 //console.log(parsedListings);		//DEBUGGING - shows the listings.json object 
	 
	 //iterate through parsed listings.JSON and make a model for each object
	 parsedListings.entries.forEach(function(entry) {
		 //console.log(entry.name);		//DEBUGGING - prints out each listing's name
		 //console.log(entry.coordinates);		//DEBUGGING - prints out {latitude: , longitude: }
		 
		 //store listing info into a schema document
		 var newListing = Listing({
			 code: entry.code,
			 name: entry.name,
			 coordinates: entry.coordinates,
			 address: entry.address
		 });
		 
		 //save schema document to database collection
		 newListing.save(function(err) {
			 if (err) throw err;
			 
			 //console.log('Entry created!');		//DEBUGGING - states that a listing has been saved to the database
		 });
	 });
	 console.log('\nLast entry added to database\n');
 });


/*  
  Check to see if it works: Once you've written + run the script, check out your MongoLab database to ensure that 
  it saved everything correctly. 
 */
