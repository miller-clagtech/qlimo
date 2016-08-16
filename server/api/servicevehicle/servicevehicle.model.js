'use strict';

import mongoose from 'mongoose';

var ServicevehicleSchema = new mongoose.Schema({
  serviceProviderId: String,
  serviceProviderEmail: String,
  vehicleId: String,
  companyName: String,
  vehicleType: String,
  vehicleMake: String,
  vehicleModel: String,
  vehicleYear: String,
  vehicleColor: String,
  vehicleSitting: String,
  registrationNo: String,
  licencePlateNo: String,
  status: String,
  active: Boolean
});

export default mongoose.model('Servicevehicle', ServicevehicleSchema);
