
var config = {
    apiKey: "AIzaSyCX-4WMc7GO4atnzhis_tQwlCJ9D7L3H8g",
    authDomain: "inclassfirebase-be734.firebaseapp.com",
    databaseURL: "https://inclassfirebase-be734.firebaseio.com",
    projectId: "inclassfirebase-be734",
    storageBucket: "inclassfirebase-be734.appspot.com",
    messagingSenderId: "308594412083"
  };
firebase.initializeApp(config);
var database = firebase.database()
var currentchat = ""

$('.chattext').keypress(function(event){
      var keycode = (event.keyCode ? event.keyCode : event.which);
      if(keycode == '13'){
      currentchat = $(this).val()
      $(this).val("")
      $(".chatbox").empty()
      database.ref().push({
        chat: currentchat,
        dateAdded : firebase.database.ServerValue.TIMESTAMP
      })
      }
  });
database.ref().on("child_added", function(childSnapshot) {

   // Log everything that's coming out of snapshot
   console.log(childSnapshot.val().chat);
   console.log(childSnapshot.val().dateAdded);

})
database.ref().orderByChild("dateAdded").limitToLast(10).on("child_added", function(snapshot) {
  $(".chatbox").prepend("<p>"+snapshot.val().chat+"</p>");
  $(".temp").remove()

});

  $(".clear").on("click",function() {
    database.ref().remove()
    $(".chatbox").empty()
    $(".chatbox").append("<h2 class ='temp'>Chat Appears Here!</h2>")
  })
