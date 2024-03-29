/* Add all the required libraries*/
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config');

/* Connect to your database using mongoose - remember to keep your key secret*/
mongoose.connect(config.db.uri);

/* Fill out these functions using Mongoose queries*/
//Check out - https://mongoosejs.com/docs/queries.html

var findLibraryWest = function() {
  /* 
    Find the document that contains data corresponding to Library West,
    then log it to the console. 
   */
   
	//find Lib West by name of entry
	Listing.find({name: 'Library West'}, function(err, entry){
	   if (err) throw err;
	   
	   //print Lib West's data to console
	   console.log('\n' + entry + '\n');
	});
};
var removeCable = function() {
  /*
    Find the document with the code 'CABL'. This cooresponds with courses that can only be viewed 
    on cable TV. Since we live in the 21st century and most courses are now web based, go ahead
    and remove this listing from your database and log the document to the console. 
   */
   
    //find and remove 'CABL' entry by code (in one command)
	Listing.findOneAndRemove({code: 'CABL'}, function(err, entry){
		if (err) throw err;
	  
		//print success notification to console
		console.log('\n' + entry.code + ' was successfully deleted.\n');
	});
};
var updatePhelpsLab = function() {
  /*
    Phelps Lab address is incorrect. Find the listing, update it, and then 
    log the updated document to the console. 
    
    Correct Address: 1953 Museum Rd, Gainesville, FL 32603

   */
   
	//find Phelps Lab by code, and update correct address
	Listing.findOneAndUpdate({code: 'PHL'}, {address: '1953 Museum Rd, Gainesville, FL 32603'}, function(err, entry) {
		if (err) throw err;
		
		//print success notification to console
		console.log('\n' + entry.name + ' address was updated.\n');
	});
	
};
var retrieveAllListings = function() {
  /* 
    Retrieve all listings in the database, and log them to the console. 
   */

	//find all listings
	Listing.find({}, function(err, entries) {
		if (err) throw err;
		
		//print query of all entries to console
		console.log(entries);
	});
};

findLibraryWest();
removeCable();
updatePhelpsLab();
retrieveAllListings();
