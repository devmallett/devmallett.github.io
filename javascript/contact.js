var config = {
    apiKey: "AIzaSyCag1BdRImq1IKGp8EMaGzo0cZ7Az-BKQI",
    authDomain: "groupproject1-59875.firebaseapp.com",
    databaseURL: "https://groupproject1-59875.firebaseio.com",
    projectId: "groupproject1-59875",
    storageBucket: "groupproject1-59875.appspot.com",
    messagingSenderId: "808150435101"
  };
firebase.initializeApp(config);
database = firebase.database();
$("#submit").on("click", function(event) {
    event.preventDefault();
    var email = $("#email-input").val();
    var comment = $("#text-input").val();
    console.log(email);
    console.log(comment);
    database.ref().push({
        email: email,
        comment: comment
    })
    $("#email-input").val("");
    $("#text-input").val("");
})
database.ref().on("child_added", function(snapshot) {
    var email = snapshot.val().email;
    var comment = snapshot.val().comment;
    var key = snapshot.key;
    $("#comments").append("<div class='card' id='ind-comment' data-key='" + key + "'>" +
    "<h5 class='card-header'>" + email + "</h5>" +
    "<div class='card-body'>" +
        '<p class="card-text">' + comment + "</p>" +
        '<button type="remove" class="btn btn-primary" id="remove">Remove</button>' +
    "</div></div>" + "<br>");
});
$("#comments").on("click", "#remove", function() {
 
    var key = $(this).parent().parent().attr("data-key");
    console.log(key);
    database.ref().child(key).remove();
    $(this).parent().parent().remove();
});