const Location = require('../models/location');
const { rule } = require('indicative');
const validate = require('../utils/validations');
const _ = require('lodash');

const getSingleLocation = async req => {
  const { id } = req.params;
  return await Location.getLocationById({ _id: id });
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
    const { location_name, females, males, parent_locationId } = await validate(
      req,
      locationRules(rule('unique', Location))
    );
    const locationData = { location_name, females, males, parent_locationId };
    location = await Location.create(locationData);
    return res.status(201).send({ location, message: 'Location added successfully' });
  },
  //show all locations
  async index(req, res) {
    const locations = await Location.find({});
    var males = _.sumBy(locations, 'males');
    var females = _.sumBy(locations, 'females');
    const total_residents = females + males;
    console.log(females, males, total_residents);
    return res.json({ locations, females, males, total_residents });
  },

  //update a location by id
  async update(req, res, next) {
    const data = await validate(req, locationRules());
    const location = await getSingleLocation(req);

    if (!location) {
      res.status(404).json({ error: "Location doesn't exist" });
    }
    const updated = await location.update(data);
    return res.json({ message: `${updated.nModified} attributes were updated` });
  },

  //get one location by id
  async show(req, res) {
    const location = await getSingleLocation(req);
    return location
      ? res.json({ location })
      : res.status(404).json({ error: 'location not found' });
  }
  //delete a location
};
