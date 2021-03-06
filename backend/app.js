const dotenv = require('dotenv');
dotenv.config();
// console.log(process.env)
// const cors = require('cors')
const express = require('express'); 
// const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})



mongoose.connect(`mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PWD}@${process.env.CLUSTER_NAME}.yncag.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
  
  const app = express();
  app.use(helmet());
  // app.use(cors());
  app.use(limiter);
  
  

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  //Autoriser les ressouces avec des origines différentes
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
});
// Permet d'acceder au body depuis req
app.use(express.json());
// Routes
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes); 


module.exports = app;