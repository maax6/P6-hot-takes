// Importation de mongoose
const mongoose = require('mongoose');
// Importation de unique validator de mongoose
const uniqueValidator = require('mongoose-unique-validator');

// userSchema sera appliqué à la fonction schema de mongoose
const userSchema = mongoose.Schema ( {

    email:{type: String, required: true, unique: true},
    password : { type:String, required:true}

});

userSchema.plugin( uniqueValidator );

// Exporter le schema "userSchema" en tant que modèle avec la fonction model de
module.exports = mongoose.model('user', userSchema);
