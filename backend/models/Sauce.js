// Importation de mongoose en vue d'utiliser la fonction Schema
const mongoose = require('mongoose');
// Sauce schéma est un objet qui est appliqué à la fonction Schema de monogose
const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat:{ type: Number, required: true },
    // likes et dislikes
    likes:  { type: Number, 'default': 0 },
    dislikes: { type: Number, 'default': 0 },
    usersLiked: { type: Array, 'default': [] },
    usersDisliked: { type: Array, 'default': [] }
});

//Exporter le modèle nommé "Sauce" et son schéma "sauceSchema"
module.exports = mongoose.model('Sauce', sauceSchema); 