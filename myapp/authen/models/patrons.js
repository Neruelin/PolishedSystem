var mongoose = require('mongoose');

var customerSchema = new mongoose.Schema({
    fullname: String,
    telephone: Number,
    email: {type: String, default: 'N/A'},
    appointments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Appointment'}]
    },
    {collection: 'customers'}
);

var apptSchema = new mongoose.Schema({
    name: String,
    telephone: {type: Number, ref: 'Customer'},
    time: String,
    service: {type: Array, default: []},
    tech: {type: String, default: 'N/A'},
    isPremade: {type: Boolean, default: false}},
    {collection: 'appointments'}
);

module.exports = {
    cust: mongoose.model('customer', customerSchema),
    appt: mongoose.model('appt', apptSchema)
    
};

var tempSchema = new mongoose.Schema({
    isAppt: Boolean,
    time: String,
    fullname: String,
    telephone: Number,
    service: {type: Array, default: []},
    tech: {type: String, default: 'N/A'},
    email: {type: String, default: 'N/A'},
    },{collection: 'customers'}
);