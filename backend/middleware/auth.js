const jwt = require('jsonwebtoken');

// Exportation du middleware pour authentification
module.exports = (req, res, next) => {
  try {
// On récupère le token à l'index 1 du tableau avec la fonction split Bearer en 0
    const token = req.headers.authorization.split(' ')[1];
// Comparer token avec la fonction verify de jasonwebtoken et la clé secrete provisoire.
    const decodedToken = jwt.verify(token, process.env.SCRT_TKN);
    const userId = decodedToken.userId;
    req.auth = { userId }
// Verifier que le user ID correspond bien 
    if (req.body.userId && req.body.userId !== userId) {
      throw 'User ID invalide !';
    } else {
      next();
    }
  } catch {
    res.status(401).json({error: new Error('Authentification requise !')
    });
  }
};
