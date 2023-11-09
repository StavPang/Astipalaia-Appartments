var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware");
var session = require('express-session')
var Book = require("../models/book");
var Event = require("../models/event");
const nodemailer = require('nodemailer');
var Food = require("../models/food");
var Fun = require("../models/fun");
var Hotel = require("../models/hotel");
var Campg = require("../models/camp");
var CompEvent = require("../models/complevent");
var Contactus = require("../models/contactus");
var generic = require("../models/generic.js");
//root route
router.get("/", function(req, res){
    res.render("landing");
});

// show register form
router.get("/register", function(req, res){
   res.render("register"); 
});



router.get("/whereistay", function(req,res){
  Hotel.find( function(err,hotels){
    if(err){
        console.log(err)

    }else{
        console.log(hotels)
        res.render("whereistay" , {hotel:hotels})

        }
      })
    

})


router.get("/camping", function(req,res){
  Campg.find( function(err,camps){
    if(err){
        console.log(err)

    }else{
        console.log(camps)
        res.render("camping" , {camp:camps})

        }
      })
    

})

router.get("/whereifun", function(req,res){
    Fun.find( function(err,funs){
        if(err){
            console.log(err)

        }else{
            console.log(funs)
            res.render("whereifun" , {fun:funs})

            }
        
    
    })

})

router.get("/whereieat", function(req,res){
    
    Food.find( function(err,foods){
        if(err){
            console.log(err)

        }else{
            console.log(foods)
            res.render("whereieat" , {food:foods})

            }
        
    
    })

})

router.get("/generic", function(req,res){
  var title 
  var text1
  var text2
  var text3
  var text4
  var text5
  var text6



  generic.find(function(err,results){
    if(err){
      console.log(err)
    }else{
      console.log(results)
      results.forEach(function(document){
         title = document.title
         text1 = document.text1
         text2 = document.text2
         text3 = document.text3
         text4 = document.text4
         text5 = document.text5
         text6 = document.text6


      })
      res.render("generic" , {text1:text1 , text2:text2 , text3:text3 , text4:text4 , text5:text5 , text6:text6,title:title})
    }

  })

})

router.get("/congrats", middleware.isLoggedIn, function(req,res){
    Book.find({userid:req.user.id},function(err, docs  ) {
        if (err) {
          console.error(err);
          res.status(500).send('Error retrieving users from database');
        } else {
          console.log("yeyo")  
          const lastTwoDocuments = docs.slice(-3);

          lastTwoDocuments.forEach(function(document) {
            console.log(document.title);
            if(document.title){
                
                Event.find({title:document.title}, function(err,evented) {
                    if(err){
                        console.error(err)
                        res.status(500).send('Error retrieving users from database');
                    }else{
                        res.render('congrats.ejs', { data: docs , event: evented });
                    }
                  })
                }
              })
            }
          })
        })
                        
                               
        router.get("/admin", async (req, res) => {
          try {
            const titles = [];
            const username = [];
            const datetime = [];
            const total = [];
            const seatObjects = [];
             
            const name = [];
            const phone = [];
            const name1 = [];
            const phone1 = [];
            const name2 = [];
            const phone2 = [];
            const cardtype = [];
            const cardnum = [];
            const name3 = [];
            const phone3 = [];
            const contacts = await Contactus.find()
            const drinks = await Fun.find()
            const hotels = await Hotel.find()
            const foods = await Food.find();
            const users = await User.find();
            console.log(users);
        
            const events = await Event.find();
            console.log(events);
        
            const books = await Book.find();
            console.log(books);
            count = 1;
           for(const book of books){
            if (book.title) titles.push(book.title)
            if(book.username) username.push(book.username)
            if(book.datetime) datetime.push(book.datetime)
            if(book.total) total.push(book.total)
            seatObjects.push(book.seats)
            if(book.name) name.push(book.name)
            if(book.phone) phone.push(book.phone)
            if(count % 2 == 0){
            if (book.name1 ) {
              name1.push(book.name1);
            } else {
              name1.push("-");
            }
            if (book.phone1) {
              phone1.push(book.phone1);
            } else {
              phone1.push("-");
            }
            if (book.name2) {
              name2.push(book.name2);
            } else {
              name2.push("-");
            }
            if (book.phone2) {
              phone2.push(book.phone2);
            } else {
              phone2.push("-");
            }
            if (book.name3) {
              name3.push(book.name3);
            } else {
              name3.push("-");
            }
            if (book.phone3) {
              phone3.push(book.phone3);
            } else {
              phone3.push("-");
            }
            if(book.cardtype) cardtype.push(book.cardtype)
            if(book.cardnum) cardnum.push(book.cardnum)
          }
          count= count + 1
         
            
           }
           console.log(titles , datetime , total , seatObjects , name , phone , name1 , phone1 , name2 , phone2,name3,phone3,cardtype,cardnum)
        
           res.render("admin", {
            users: users,
            events: events,
            datetimes: datetime,
            titles: titles,
            name: name,
            phone: phone,
            total:total,
            name1: name1,
            phone1: phone1,
            name2: name2,
            phone2: phone2,
            name3: name3,
            phone3: phone3,
            cardtype:cardtype,
            cardnum:cardnum,
            foods: foods,
            hotels: hotels,
            drinks : drinks,
            contacts: contacts
            // Add other filtered arrays to the render data
          });
          } catch (err) {
            console.log(err);
          }
        });
        
                        
                        
                        
                 
           
router.get("/history", middleware.isLoggedIn,async(req,res) => {
    try {
        const books = await Book.find({ userid: req.user.id });
        const uniqueTitles = [];
        const events = [];
        const description = [];
      
        for (const book of books) {
          if (!uniqueTitles.includes(book.title) && (book.title)) {
            uniqueTitles.push(book.title);
            if (book.title) {
              const seenevents = await Event.find({ title: book.title });
              console.log(seenevents);
              for (const seenevent of seenevents) {
                events.push(seenevent.datetime);
                description.push(seenevent.description)
              }
            }
          }
        }
      
        console.log(uniqueTitles);
        console.log(events);
        console.log(description)
        res.render("history", { books: uniqueTitles, events: events , descr:description });
      } catch (err) {
        console.log(err);
      }
      
     
})
router.post("/contactus", middleware.isLoggedIn, function(req,res){
 var name = req.body.name
 var email = req.body.email
 var message = req.body.message
 console.log(name , email , message)
var newcontactus = {name:name , email:email , message:message}
Contactus.create(newcontactus,function(error , result){
    if(error){
      console.log(error)
    }else{
      console.log(result)
      res.redirect("/contactus")
    }
})
})

router.post('/edit_drink', (req, res) => {
  const { 'editd-drink-title': drinkTitle, 'editd-drink-location': drinkLocation, 'editd-drink-phone': drinkPhone, 'editd-drink-description': drinkDescription } = req.body;

  if (!drinkTitle && !drinkLocation && !drinkPhone && !drinkDescription) {
    return res.status(400).json({ error: 'At least one value is required' });
  }

  Fun.findOneAndUpdate(
    { title: drinkTitle }, // Filter condition
    { $set: { location: drinkLocation, phone: drinkPhone, description: drinkDescription } }, // Update fields
    { new: true },
    (err, updatedDrink) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'Failed to update drink' });
      }

      if (!updatedDrink) {
        return res.status(404).json({ error: 'Drink not found' });
      }

      res.json({ message: 'Drink updated successfully', drink: updatedDrink });
    }
  );
});

// Define the route for deleting a drink
router.post('/delete_drink', (req, res) => {
  const drinkTitle = req.body['editd-drink-title'];

  if (!drinkTitle) {
    return res.status(400).json({ error: 'Drink title is required' });
  }

  Fun.findOneAndDelete({ title: drinkTitle }, (err, deletedDrink) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Failed to delete drink' });
    }

    if (!deletedDrink) {
      return res.status(404).json({ error: 'Drink not found' });
    }

    res.json({ message: 'Drink deleted successfully' });
  });
});
 
router.post("/book" ,middleware.isLoggedIn,function(req,res){
        var selectedOption = req.body.selectedOption;
        console.log(selectedOption)
        var num1 = req.body.num1
        var num2 = req.body.num2
        var num3 = req.body.num3
        var num4 = req.body.num4
        let combined = num1 + '' + num2 + '' + num3 + '' + num4
        var subtotal = req.body.subtotal
        var title = req.body.title
        var datetime = req.body.datetime
        var selectedseats = req.body.seats
        console.log(subtotal)
        console.log(title)
        console.log(datetime)
        console.log(selectedseats)
        var seatsArray = selectedseats && selectedseats.length > 0 ? selectedseats.map(([row, seat]) => ({ row, seat })) : 0;
        
        
        
        
                    

         
        
        var newBook = { seats:seatsArray,datetime:datetime,name1: req.body.name1, phone1:req.body.phone1, name2:req.body.name2, name:req.body.name,phone:req.body.phone,name3:req.body.name3,phone3:req.body.phone3,userid:req.user.id,  cardnum: combined , cardtype: selectedOption,title:title,total:subtotal }
        Book.create(newBook, function(err, newlyCreated) {
            if(err){
                console.log(err);
            } else {
                //redirect back to campgrounds page
                console.log(newlyCreated);
                
                //res.redirect("/congrats");
                
            }
        });
     

     

    

        

})

//handle sign up logic
router.post("/register" , function(req, res){
    console.log(req.sessionID)
    var author = req.sessionID
    var newUser = new User({username: req.body.username, email:req.body.email, phone:req.body.phone, author: author});
    User.register(newUser,  req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
           req.flash("success", "Welcome to YelpCamp " + user.username);
           res.redirect("/index"); 
        });
    });
});

router.post("/edit", middleware.isLoggedIn,  function(req, res){
        
        console.log(req.user.id)
        var username = req.body.username;
        var password = req.body.password;
        var email = req.body.email;
        var phone = req.body.phone;
        User.findByIdAndUpdate(req.user.id ,{$set: { username, email, phone , password } },{new:true}, function(err, doc){
            if(err){
                console.log(err)
            } else {
                console.log("Update User:", doc)
                //redirect somewhere(show page)
                res.redirect("/index");
            }

        
            });     
        })

        
router.post("/edit_event" , function(req,res){
    const { 'edit1-events-title': eventsTitle,'edit1-event-title': eventTitle,'edit1-event-location': eventLocation, 'edit1-event-price':eventPrice,'edit1-event-adress': eventAdress,'edit1-event-dateandtime': eventDateandTime,'edit1-event-description':  eventDescription } = req.body;
    console.log(eventTitle , eventsTitle, eventLocation, eventPrice, eventAdress,  eventDateandTime, eventDescription )
    
    if (!eventTitle && !eventLocation && !eventPrice && !eventAdress && !eventDateandTime && !eventDescription) {
      return res.status(400).json({ error: 'At least one value is required' });
    }
  
    // Update the event in the database
    Event.findOneAndUpdate(
        // Filter criteria to find the document
        { title: eventTitle },
        
        // Update fields and their new values
        {
          title: eventsTitle,
          location: eventLocation,
          price: eventPrice,
          address: eventAdress,
          datetime: eventDateandTime,
          description: eventDescription
        },
        
        // Additional options
        { new: true },
        
        // Callback function
        (err, updatedEvent) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Failed to update event' });
          }
      
          // Handle the updated event
          console.log(updatedEvent);
          res.json({ message: 'Event updated successfully', event: updatedEvent });
        }
      );
  });  


 router.post("/edit_user" , function(req,res ){
    const { 'edit-user-name':username, 'edit-user-email':email,'edit-user-phone':  phone , 'edit-user-id': userid } = req.body;
    if (!username && !email && !phone) {
        return res.status(400).json({ error: 'At least one value is required' });
      }
      User.findByIdAndUpdate(
        userid,
        { $set: { username, email, phone } },
        { new: true },
        (err, updatedUser) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Failed to update user' });
          }
    
          if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
          }
    
          res.json({ message: 'User updated successfully', user: updatedUser });
        }
      );  

 } )

 router.post('/edit_food', (req, res) => {
  const { 'editf-food-title': foodTitle, 'editf-food-location': foodLocation, 'editf-food-phone': foodPhone, 'editf-food-description': foodDescription } = req.body;

  if (!foodTitle && !foodLocation && !foodPhone && !foodDescription) {
    return res.status(400).json({ error: 'At least one value is required' });
  }

  Food.findOneAndUpdate(
    { title: foodTitle }, // Filter condition
    { $set: { location: foodLocation, phone: foodPhone, description: foodDescription } }, // Update fields
    { new: true },
    (err, updatedFood) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'Failed to update food' });
      }

      if (!updatedFood) {
        return res.status(404).json({ error: 'Food not found' });
      }

      res.json({ message: 'Food updated successfully', food: updatedFood });
    }
  );
});

router.post('/delete_food', (req, res) => {
  const foodTitle = req.body['editf-food-title'];

  if (!foodTitle) {
    return res.status(400).json({ error: 'Food title is required' });
  }

  Food.findOneAndDelete({ title: foodTitle }, (err, deletedFood) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Failed to delete food' });
    }

    if (!deletedFood) {
      return res.status(404).json({ error: 'Food not found' });
    }

    res.json({ message: 'Food deleted successfully' });
  });
});

router.post('/edit_hotel', (req, res) => {
  const { 'edith-hotel-title': hotelTitle, 'edith-hotel-location': hotelLocation, 'edith-hotel-phone': hotelPhone, 'edith-hotel-description': hotelDescription } = req.body;

  if (!hotelTitle && !hotelLocation && !hotelPhone && !hotelDescription) {
    return res.status(400).json({ error: 'At least one value is required' });
  }

  Hotel.findOneAndUpdate(
    { title: hotelTitle }, // Filter condition
    { $set: { location: hotelLocation, phone: hotelPhone, description: hotelDescription } }, // Update fields
    { new: true },
    (err, updatedHotel) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'Failed to update hotel' });
      }

      if (!updatedHotel) {
        return res.status(404).json({ error: 'Hotel not found' });
      }

      res.json({ message: 'Hotel updated successfully', hotel: updatedHotel });
    }
  );
});

// Define the route for deleting a hotel
router.post('/delete_hotel', (req, res) => {
  const hotelTitle = req.body['edith-hotel-title'];

  if (!hotelTitle) {
    return res.status(400).json({ error: 'Hotel title is required' });
  }

  Hotel.findOneAndDelete({ title: hotelTitle }, (err, deletedHotel) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Failed to delete hotel' });
    }

    if (!deletedHotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }

    res.json({ message: 'Hotel deleted successfully' });
  });
});



            


  


router.get("/new", middleware.isLoggedIn, function(req, res){
    Event.find(function(err, events) {
        if (err) {
          console.error(err);
          res.status(500).send('Error retrieving users from database');
        } else {
          CompEvent.find(function(error,result){
            if(error){
              console.log(error)
            }else{
              console.log(result)
              res.render('new.ejs', { data: events , compevent: result }); 
            }
            

          })
          
        }
      });
 });


 router.get("/book", middleware.isLoggedIn, async function(req, res) {
  try {
    const docs = await Book.find({ userid: req.user.id }).exec();
    console.log("yoyo");
    //console.log(docs)

    const lastDocument = docs.slice(-2);
    //console.log(lastDocument)
    const seatArray = []; // Declare an empty array per loop iteration
    for (const document of lastDocument) {
      console.log(document.datetime);
      if (document.datetime) {
        const currentDocument = await Book.find({datetime:document.datetime }).exec();
        console.log(currentDocument)
        if(currentDocument.length > 0){
          const currentDocuments = currentDocument[0]; 
          const previousDocument = await Book.find({ _id: { $lt: currentDocuments._id } })
          .sort({ _id: -1 })
          
          .exec();
         console.log(currentDocument)  
         console.log(previousDocument)
         const previousSeats = previousDocument ? previousDocument.seats : [];
         if (Array.isArray(previousSeats) && previousSeats.length > 0) {
           const previousValue = previousSeats[0];
           seatArray.push(previousValue);
           console.log(previousValue)
         }
        }
      
      }
    }

    //console.log(seatArray);
    res.render('show.ejs');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving books from the database');
  }
});



router.get("/contactus", middleware.isLoggedIn, function(req,res){
  res.render("contactus")

})
 

router.get("/edit", middleware.isLoggedIn, function(req, res){
    res.render("edit");
 }); 

 router.get("/index", middleware.isLoggedIn, function(req, res){
    res.render("index");
 }); 
 


//show login form
router.get("/login", function(req, res){
   res.render("login"); 
});

// Assuming you have the User model defined

router.post("/delete_user", function(req, res) {
    var userId = req.body.userId; // Get the userId from the request body
  
    // Find the user by userId and remove it from the database
    User.findByIdAndRemove(userId, function(err, deletedUser) {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Failed to delete user" });
      }
  
      if (!deletedUser) {
        return res.status(404).json({ error: "User not found" });
      }
  
      console.log("User deleted:", deletedUser);
      res.json({ message: "User deleted successfully" });
    });
  });

router.post("/delete_event", function(req,res){
    const eventTitle = req.body.eventTitle;

  // Find and remove the event by its title
  Event.findOneAndRemove({ title: eventTitle }, (err, deletedEvent) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Failed to delete event' });
    }

    if (!deletedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json({ message: 'Event deleted successfully' });
  });

} ) 
  

router.get("/adminLoged", function(req,res){
    res.render("adminloged")

})

router.post('/adminLoged',middleware.ensureAdminAuthenticated, passport.authenticate('local', { failureRedirect: '/adminLoged' }), function (req, res) {
    res.redirect('/admin');
  });

//handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/index",
        failureRedirect: "/login"
    }), function(req, res){
        
});

// logout route
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "Logged you out!");
   res.redirect("/index");
});



module.exports = router;