var express = require("express");
var router  = express.Router({mergeParams: true});
var Comment = require("../models/comment");
var Event = require("../models/event");
var middleware = require("../middleware");
var Book = require("../models/book")
var User = require("../models/user");

//Comments New
router.get("/new",middleware.isLoggedIn, function(req, res){
    // find campground by id
    console.log(req.user.id);
    User.findById(req.user.id,function(error, user){
      if(error) {
        console.log(error)
      }else{  
        Comment.find( function(erro , comment){
            if(erro){
                console.log(erro)
            }else{
                Book.find({userid:req.user.id}, function(err, book){
                    if(err){
                         console.log(err);
                    } else {
                        let uniqueTitles = [];
                        book.forEach(function(boo){
                         if (!uniqueTitles.includes(boo.title)) {
                        // If it doesn't, add it to the uniqueTitles array
                            uniqueTitles.push(boo.title);
                         }
                    })
                    console.log(book , user)
                    console.log(uniqueTitles)
                    console.log(comment)
                    res.render("comments/new", {books: uniqueTitles , users: user , comments:comment});
                
        }
        
        
    })
}
        })
    

}
})
});

//Comments Create
router.post("/createcomm",middleware.isLoggedIn,function(req, res){
   //lookup campground using ID
   var inputValue = req.body.inputValue
   console.log(inputValue)
   var mess = req.body.message
   console.log(mess)
   console.log(req.user.username)
   
      var newComm = {text: mess , title: inputValue , userid: req.user.username  }
        Comment.create(newComm,  function(err, comment){
           if(err){
               req.flash("error", "Something went wrong");
               console.log(err);
           } else {
              
               console.log(comment);
               req.flash("success", "Successfully added comment");
               res.redirect('/new');
           }
        });
      
  
});




module.exports = router;