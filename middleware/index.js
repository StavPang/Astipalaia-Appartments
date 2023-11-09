var Campground = require("../models/campground");
var User = require("../models/user");

// middleware
var middlewareObj = {};

middlewareObj.ensureAdminAuthenticated = function(req,res,next){
    if (req.isAuthenticated() && req.user.username === 'admin') {
        console.log("yryo")
        return next();
      }
      res.redirect('/adminLoged');
}



middlewareObj.checkCampgroundOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
           if(err){
               req.flash("error", "Campground not found");
               res.redirect("back");
           }  else {
               // for checking is user owns this
            if(foundCampground.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "You don't have permission to do that");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.checkUserOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        User.findById(req.params.comment_id, function(err, foundUser){
           if(err){
               res.redirect("back");
           }  
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}

module.exports = middlewareObj;