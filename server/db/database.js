const mongoose = require('mongoose')
// mongoose.set('strictQuery', false);

// connexion a la base de donnee

mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log('i already connected to mongo db database'))
.catch((e) => console.log('connection error:', e)
)