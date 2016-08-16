'use strict';

import mongoose from 'mongoose';

var VehicletypeSchema = new mongoose.Schema({
  name: String,
  fareGroupType: String,
  fareGroupName: String,
  fareCalculatorType: String,
  active: Boolean
});

export default mongoose.model('Vehicletype', VehicletypeSchema);
