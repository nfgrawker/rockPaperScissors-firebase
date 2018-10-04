$(".thinkingtext1").hide()
$(".thinkingtext2").hide()
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
var player1choice = ""
var player2choice = ""
var player1time = 0
var player2time = 0

$('.chattext').keypress(function(event){
      var keycode = (event.keyCode ? event.keyCode : event.which);
      if(keycode == '13'){
      currentchat = $(this).val()
      $(this).val("")
      database.ref("/chat").push({
        chat: currentchat,
        dateAdded : firebase.database.ServerValue.TIMESTAMP
      })
      }
  });

database.ref("/chat").orderByChild("dateAdded").limitToLast(8).on("child_added", function(snapshot) {
  $(".chatbox").prepend("<p>"+snapshot.val().chat+"</p>");
  $(".temp").remove()

});
database.ref("/player1").on("value",function(snapshot){
  player1choice = snapshot.val().player1
  player1time = snapshot.val().dateAdded
  $(".player1choice").hide()
  $(".thinkingtext1").show()

})
database.ref("/player2").on("value",function(snapshot){
  player2choice = snapshot.val().player2
  player2time = snapshot.val().dateAdded
  $(".player2choice").hide()
  $(".thinkingtext2").show()
  console.log(player2choice)
  console.log(player2time)

})
  $(".clear").on("click",function() {
    database.ref("/chat").remove()
    $(".chatbox").empty()
    $(".chatbox").append("<h2 class ='temp'>Chat Appears Here!</h2>")
  })
$("label.player1").on("click",function(){
  var player1choice = $(this).attr("value")
  database.ref("/player1").set({
  player1:player1choice,
  dateAdded:firebase.database.ServerValue.TIMESTAMP
  })

})
$("label.player2").on("click",function(){
  var player2choice = $(this).attr("value")
  database.ref("/player2").set({
  player2:player2choice,
  dateAdded:firebase.database.ServerValue.TIMESTAMP
  })
  console.log(player2choice)
})
$(".resetbutton").on("click",function(){
  database.ref("/player1").remove()
  database.ref("/player2").remove()
  player1choice = ""
  player2choice = ""
  $(".player2choice").show()
  $(".thinkingtext2").hide()
  $(".player1choice").show()
  $(".thinkingtext1").hide()
  $(".player2image").attr("src","./assets/images/qmark.png")
  $(".player1image").attr("src","./assets/images/qmark.png")




  })
$(".gobutton").on("click",function(){
  game()
})
function game(){
  console.log(player1choice)
  console.log(player2choice)
  if(player1choice != "" || player2choice != ""){
    if (player1choice != player2choice){
      if (player1choice == "paper") {
        $(".player1image").attr("src","./assets/images/paper.jpg")
        if (player2choice == "rock") {
          $(".player2image").attr("src","./assets/images/rock.jpg")
          $(".chatbox").prepend("<h2>Player1 has won with paper covering rock!</h2>")
        }
        else{
          $(".player2image").attr("src","./assets/images/scissors.png")
          $(".chatbox").prepend("<h2>Player2 has won with scissors cutting paper!<h2>")
        }
      }
      else if(player1choice == "rock"){
        $(".player1image").attr("src","./assets/images/rock.jpg")
        if(player2choice == "scissors"){
          $(".player2image").attr("src","./assets/images/scissors.png")
          $(".chatbox").prepend("<h2>Player1 has won with rock smashing scissors!</h2>")
        }
        else{
          $(".player2image").attr("src","./assets/images/paper.jpg")
          $(".chatbox").prepend("<h2>Player2 has won with paper covering rock!</h2>")
        }
      }
      else if (player1choice == "scissors") {
        $(".player1image").attr("src","./assets/images/scissors.png")
        if (player2choice == "paper") {
          $(".player2image").attr("src","./assets/images/paper.jpg")
          $(".chatbox").prepend("<h2>Player1 has won with scissors cutting paper!<h2>")
        }
        else {
          $(".player2image").attr("src","./assets/images/rock.jpg")
          $(".chatbox").prepend("<h2>Player2 has won with rock smashing scissors!</h2>")
        }
      }
    }
      else if (player1choice == "paper") {
        $(".player1image").attr("src","./assets/images/paper.jpg")
        $(".player2image").attr("src","./assets/images/paper.jpg")
        $(".chatbox").prepend("<h2>Both players have picked paper and tied!</h2>")
      }
      else if (player1choice == "rock") {
        $(".player1image").attr("src","./assets/images/rock.jpg")
        $(".player2image").attr("src","./assets/images/rock.jpg")
        $(".chatbox").prepend("<h2>Both players have picked rock and tied!</h2>")
    }
      else if (player1choice == "scissors") {
        $(".player1image").attr("src","./assets/images/scissors.png")
        $(".player2image").attr("src","./assets/images/scissors.png")
        $(".chatbox").prepend("<h2>Both players have picked scissors and tied!</h2>")
    }

}
  else{
    return 0
  }
}
