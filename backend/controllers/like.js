
const Sauce = require('../models/Sauce') // sauceSchema

exports.likeSauce = (req, res, next) => {
    console.log(req.body);
    // récupère le champs likes
    const likeStatus = req.body.like;
    // récupère l'id de la sauce dans l'URL
    const sauceId = req.params.id;
    // récupère le userId
    const userId = req.body.userId;

    switch(likeStatus) {
        // ajout d'un like
        case 1:
            // ? vérifier qu'il n'y a pas déjà un like avec findOne
            Sauce.updateOne({ _id: sauceId}, { 
                $inc: { likes: +1 }, 
                $push: { usersLiked: req.body.userId }
            })
            .then(() => res.status(201).json({ message: 'Ajout du like !'}))
            .catch(error => res.status(400).json({ error }));
            break;




        //ajout d'un dislike    
        case -1:
            Sauce.updateOne({ _id: sauceId}, {
                $inc: { dislikes: +1 },
                $push: { usersDisliked: req.body.userId }
            })
            .then(() => res.status(201).json({ message: "Ajout d'un dislike ! "}))
            .catch(error => res.status(400).json({ error }));
            break;


        // suppression like et dislike    
        case 0:
            Sauce.findOne({ _id: sauceId })
            .then(sauce => {


                //Supprimer like
                if(sauce.usersLiked.includes(userId)){
                    Sauce.updateOne({ _id: sauceId},
                        {
                            $inc: { likes: -1 },
                            $pull: { usersLiked: userId}
                        })
                    .then(() => res.status(201).json({ message: "Suppression du like !"}))
                    .catch((error) => res.status(400).json({ error }));
                } else if(sauce.usersDisliked.includes(userId)) {

                    // Supprimer dislike
                    Sauce.updateOne({_id: sauceId},
                        {
                            $inc: { dislikes: -1},
                            $pull: { usersDisliked: userId}
                        })
                    .then(() => res.status(201).json({ message: "Suppression du dislike ! "}))
                    .catch((error) => res.status(400).json({ error }));
                } else {
                    res.status(403).json({ message: "requête impossible !"})
                }
            })
            .catch(() => res.status(404).json({ message: "Sauce introuvable !"}));
            break;
    }
};