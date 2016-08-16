'use strict';

import mongoose from 'mongoose';

var DriverSchema = new mongoose.Schema({
  serviceProviderId: String,
  serviceProviderEmail: String,
  driverId: String,
  firstName: String,
  lastName: String,
  mobileNo: String,
  email: String,
  rpNo: String,
  bankAcNo: String,
  profilePicture: String,
  totalRequest: String,
  acceptanceRate: String,
  status: String,
  active: Boolean
});

export default mongoose.model('Driver', DriverSchema);
