const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoose = require('mongoose');
// const mongoConnect = require('./util/database').mongoConnect;
 const User = require('./models/user');

 const adminRoutes = require('./routes/admin');
 const shopRoutes = require('./routes/shop');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');



app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('6482d23f98e77500062d98a9')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
 app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://MuskanGupta:EyQ9RKz99FTwUO4X@cluster0.xuil7ce.mongodb.net/shop?retryWrites=true&w=majority')
.then(res=>{

  User.findOne().then(user=>{
    if(!user){
      const user=new User({
        name :'muskan',
        email :'muskan@gmail.com',
        cart:{
          items:[]},
      })
      user.save();
    }
  })

  app.listen(3000);
})
.catch(err=>{
  console.log(err);
})

