const mongoose = require('mongoose');

const TankCategories = ["MBT", "TD", "LT", "HT", "MT","SPG"];
mongoose.pluralize(null);

const TankSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    category: {
        type: String,
        enum: TankCategories,
        required: true
    },
    name: {
        type: String,
        required: [true, 'Pet name is required'],
        trim: true
    },
    weight: {
        type: Number,
        required: [true, 'Weight is required'],
    },
    picUrl: {
        type: String,
        required: [true, 'Picture URL is required'],
    },
    yearprod: {
        type: Number,
        required: [true, 'Age is required'],
    },
    armo:{
        type: Array,
        required: [true, 'Armo is required'],
    },
    roll:{
        type: String,
        required: [true, 'roll is required'],
    },
    crueNum:{
        type:Number,
        required: [true, 'crueNum is required'],
    }, 
    armoAnal:{
        type: Array,
        required: [true, 'ArmoAnal is required'],
    },
    country:{
        type: String,
    },
    countryUsed:{
        type: Array,
    }
  
});

module.exports = mongoose.model("Tank", TankSchema);
