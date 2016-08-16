'use strict';

import mongoose from 'mongoose';

var ServiceproviderSchema = new mongoose.Schema({

    companyName: String,
    firstName: String,
    lastName: String,
    email: String,
    registrationDate: { type: Date, default: Date.now },
    freeTrial: String,
    noOfFreeTrail: String,
    annualAppRenewalFee: String,
    maximumAllowedVehicle: String,
    status: String 
    
});

export default mongoose.model('Serviceprovider', ServiceproviderSchema);
