var mongoose = require('mongoose');

var locationSchema = mongoose.Schema({
  location_name: { type: String, required: true },
  females: { type: Number, required: false },
  males: { type: Number, required: true },
  parent_locationId: { type: String },
  created: { type: Date, default: Date.now }
});
//get a single location
locationSchema.static('getLocationById', function(id, callback) {
  Location.findById(id, callback);
});

locationSchema.post('remove', async function(next) {
  //listen for when a location is deleted and remove it if its a parent of another location
  await Location.deleteMany({ id: _id });
  await Location.updateMany({ parent_locationId: null });
});
module.exports = mongoose.model('Location', locationSchema);
