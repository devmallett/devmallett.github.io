//Console does not log any values 
//Train inputs append to table

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBBEAFseL5VqR1njDMswuLCgJBLOCamAME",
    authDomain: "farmerdavey-train-station.firebaseapp.com",
    databaseURL: "https://farmerdavey-train-station.firebaseio.com",
    projectId: "farmerdavey-train-station",
    storageBucket: "farmerdavey-train-station.appspot.com",
    messagingSenderId: "651115287822"
};
firebase.initializeApp(config);

//Setting database variables
var database = firebase.database();
var militaryTime = "h:mm:ss"



$("#submit").on("click", function (event) {

    event.preventDefault();

    //Record train inputs (GETTER)
    var name = $("#train-input").val().trim();;
    var destination = $("#destination-input").val().trim();
    var frequency = $("#freq-input").val().trim();
    var military = $("#first-input").val().trim();

    console.log('---------------------------------------------');
    console.log(name);
    console.log(destination);
    console.log(frequency);
    console.log(military);
    //   console.log(minutesAway);
    console.log('---------------------------------------------');

    //Changing firebase inputs (SETTER)
    database.ref().push({
        name: name,
        destination: destination,
        frequency: frequency,
        military: military

    });

});
database.ref().on("child_added", function (snapshot) {
    //This listener is for input that can be added to the database 

    $("#train-input").text(snapshot.val().name);
    $("#destination-input").text(snapshot.val().destination);
    $("#freq-input").text(snapshot.val().frequency);
    $("#first-input").text(snapshot.val().military);

    //Appending train row
    //Tried to assing variable to snapshot.val() but still recieved error 
    $('#schedule').append(`<tr><td>${snapshot.val().name}</td>
                <td>${snapshot.val().destination}</td>
                <td>${snapshot.val().frequency}</td>
                <td>${moment(snapshot.val().military, 'h:mm:ss').add(snapshot.val().frequency, 'minute').format('LT')}</td>
                <td>${moment(snapshot.val().military, 'H:mm:ss').add(snapshot.val().frequency, 'minute').fromNow('LT')}</td>`
            );

    //current time - first arrival
    //%frequency 
    //next min to train : freq - remainder
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);//
});




