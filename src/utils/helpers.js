const get = require('lodash/get');
const pick = require('lodash/pick');
const pickBy = require('lodash/pickBy');

const env = (key, defaultValue) => get(process.env, key, defaultValue);

const objectOnly = (data, keys) => pick(data, keys);

const objectExcept = (data, keys) => pickBy(data, (value, key) => !keys.includes(key));

module.exports = { env, objectOnly, objectExcept };
