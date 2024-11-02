const mongoose = require('mongoose')
// mongoose.set('strictQuery', false);

// connexion a la base de donnee

mongoose.connect('mongodb+srv://esmeblare:mDmvjsqedKW9xQBs@dev-blog.kbsxc.mongodb.net/')
.then(() => console.log('i already connected to mongo db database'))
.catch((e) => console.log('connection error:', e)
)