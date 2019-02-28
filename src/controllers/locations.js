const Location = require('../models/location');
const { rule } = require('indicative');
const validate = require('../utils/validations');
const _ = require('lodash');

const getSingleLocation = async req => {
  const { id } = req.params;
  return await Location.getSingleForUser({ _id: id });
};

const locationRules = () => {
  const commonRules = {
    location_name: 'required|min:1|max:20',
    females: 'required|min:1',
    males: 'required|min:1'
  };

  return commonRules;
};

module.exports = {
  // create a location
  async store(req, res, next) {
    var locationData = {
      location_name: req.body.location_name,
      females: req.body.females,
      males: req.body.males,
      parent_locationId: req.body.parent_locationId
    };
    await validate(req, locationRules(rule('unique', Location)));

    location = await Location.create(locationData);
    return res.status(201).send({ location, message: 'Location added successfully' });
  },
  //show all locations
  async index(req, res) {
    const locations = await Location.find({});
    var males = _.sumBy(locations, 'males');
    var females = _.sumBy(locations, 'females');
    const total_residents = females + males;
    return res.json({ locations, females, males, total_residents });
  },

  //update a location by id
  async update(req, res, next) {
    const data = req.body;
    const location = await getSingleLocation(req);

    if (!location) {
      res.status(404).json({ error: "Location doesn't exist" });
    }
    await location.update(data);
    return res.json({ message: `Location was updated successfully`, updated: location });
  },

  //get one location by id, if it has nested locations it also brings them
  async show(req, res) {
    const parentLocation = await getSingleLocation(req);
    const location = await Location.getAllForLocation(req.params.id);
    //TODO:proper nexting could be done here
    if (location && location.length > 1) {
      var males = _.sumBy(location, 'males');
      var females = _.sumBy(location, 'females');
      var total_residents = females + males;
      return res.json({
        Name: parentLocation.location_name,
        location,
        females,
        males,
        total_residents
      });
    }
    if (location.length === 1) {
      var female = location[0].females;
      var male = location[0].males;
      var Residents = female + male;

      return res.json({ location, female, male, Residents });
    }
    return res.status(404).json({ error: 'location not found' });
  },
  //delete a location
  async destroy(req, res) {
    const location = await getSingleLocation(req);
    if (!location) {
      return res.status(400).json({ error: "location doesn't exist" });
    }
    await Location.delete(location);

    return res.json({ message: 'location was deleted successfully' });
  },
};
