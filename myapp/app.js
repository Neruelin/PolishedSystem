var express = require('express'),
    path = require('path'),
    time = require('time'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    localStrategy = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose'),
    MongoClient = require('mongoose/node_modules/mongodb').MongoClient;
var app = express();
//schemas
var User = require('./authen/models/users'),
    Patron = require('./authen/models/patrons');

//sets time    
var now = new time.Date();
now.setTimezone("America/New_York");
console.log(now.toString());

//routes
var index = require('./routes/index');
var users = require('./routes/users');
try {
    mongoose.connect('mongodb://localhost/auth');
} 
catch (e) {
    console.log("Failed to Connect to DB");
    close()
}
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('express-session')({
  secret: "fhjknfdskhjfdskjhdsfkj",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', index);

app.get('/dbusers', function (req,res) {
  var queryRes;
  MongoClient.connect('mongodb://localhost/auth', function(err, db) {
  if (err) throw err;
  console.log("Connected successfully to server");
  
  db.collection("users").find({}).toArray(function (err, result) {
    if (err) throw err;
    for (var itr = 0; itr < result.length; itr++) {
        if(itr != 0) {
            queryRes += JSON.stringify(result[itr].username) + ",";
        } else {        
            queryRes = JSON.stringify(result[itr].username) + ",";
        }
    }
    res.send("<p> Usernames in DB  " + queryRes + "</p>");
  });
  
    db.close();
  });
})

app.get('/dbwalkincol', function (req,res) {
  var queryRes;
  MongoClient.connect('mongodb://localhost/auth', function(err, db) {
  if (err) throw err;
  console.log("Connected successfully to server");
  
  db.collection("walkincol").find({}).toArray(function (err, result) {
    if (err) throw err;
    for (var itr = 0; itr < result.length; itr++) {
        if(itr != 0) {
            queryRes += JSON.stringify(result[itr].username) + ",";
        } else {        
            queryRes = JSON.stringify(result[itr].username) + ",";
        }
    }
    res.send("<p>" + queryRes + "</p>");
  });
  
    db.close();
  });
})

app.get('/turnview',  function (req, res) {res.render('turnView');});

app.get('/checkin',   function (req, res) {res.render('checkin');});
/*
app.post('/setupappointment', function(req, res) {
    var now = new time.Date();
    now.setTimezone("America/New_York");
    var data = {
        time: now.toString(),
        fullname: req.body.fullname,
        telephone: req.body.fullname,
        email: req.body.email
    }
    var doc = new Walkin(data);
    doc.save();
    res.redirect('/console');
});
*/
app.get('/clients', function(req, res) {res.render('clients');});
app.post('/clients', function(req, res) {
    var query = {
        telephone: res.body.telephone
    };
    Patron.findOne(query, function(err, result) {
        if (err) throw err;
        console.log(result);
    });
    res.redirect('/clients')
})

app.post('/walkin', function(req, res) {
    var now = new time.Date();
    now.setTimezone("America/New_York");
    var data = {
        name: req.body.name,
        telephone: req.body.telephone,
        time: now.toString(),
        service: [req.body.service],
        tech: req.body.tech,
    }
    new Patron.appt(data).save();
    res.redirect('/checkin');
});

app.get('/login', function (req, res) {res.render('login');})
app.post('/login', passport.authenticate('local', {
   successRedirect: "/console",
   failureRedirect: "/login" 
}), function(req, res) {
});

app.get('/register', isLoggedIn, function (req, res) {res.render('register');});
app.post("/register", isLoggedIn, function(req,res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('register');
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/console"); 
        });
    });
});

app.get('/registercustomer', isLoggedIn, function (req, res) {res.render('registercustomer');});
app.post('/registercustomer', function(req, res) {
    var data = {
        fullname: req.body.fullname,
        telephone: req.body.telephone,
        email: req.body.email
    }
    new Patron.cust(data).save();
    res.redirect('/console');
});


app.get('/console', isLoggedIn, function (req, res) {
  res.render('console');
});

function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(process.env.PORT, function () {
  console.log('POS app listening on port 3000!');
});


