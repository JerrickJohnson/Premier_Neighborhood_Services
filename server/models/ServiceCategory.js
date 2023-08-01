const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceCategorySchema = new Schema({
  name: String,
  services: [{
    type: Schema.Types.ObjectId,
    ref: 'Service'
  }]
});

const ServiceCategory = mongoose.model('ServiceCategory', serviceCategorySchema);

module.exports = ServiceCategory;