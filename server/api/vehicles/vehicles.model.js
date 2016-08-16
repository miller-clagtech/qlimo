'use strict';

import mongoose from 'mongoose';

var VehiclesSchema = new mongoose.Schema({
  vehicleType: String,
  vehicle: String,
  active: Boolean
});

export default mongoose.model('Vehicles', VehiclesSchema);
