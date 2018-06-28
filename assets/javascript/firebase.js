 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyDUn__-EBbuB0NBJwoH7T68UaqvrDfv_fg",
    authDomain: "portfolio-project-davey.firebaseapp.com",
    databaseURL: "https://portfolio-project-davey.firebaseio.com",
    projectId: "portfolio-project-davey",
    storageBucket: "portfolio-project-davey.appspot.com",
    messagingSenderId: "433367238321"
  };
  firebase.initializeApp(config);

  //Setting firebase variables 

  var database = firebase.database();


$("#message-input").on('click', function(event){
  event.preventDefault();

  //Record inputs

  var name = $("#name-input").val().trim();

  var email = $("#email-input").val().trim();

  var message = $("message-input").val().trim();


  database.ref().push({
    name: name,
    email: email,
    message: message
  });


});

database.ref().on("child_added", function(snapshot){

  $("#name-input").text(snapshot.val().name);
  $("#email-input").text(snapshot.val().email);
  $("message-input").text(snapshot.val().message);

});
  