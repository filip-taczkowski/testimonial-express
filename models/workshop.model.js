const mongoose = require('mongoose');

const workshopSchema = new mongoose.Schema({
    name: { type: String, required: true },
    concertID : { type:String, required: true, ref: 'Concert' },
});

module.exports = new mongoose.model('Workshop', workshopSchema);
