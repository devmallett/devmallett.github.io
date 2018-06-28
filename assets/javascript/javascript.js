$(document).ready(function () {
    var imgObj = [
        {
            name: 'Animal Track',
            file: 'assets/images/animal-gif-pic.png'
        }, {
            name: 'Train Station',
            file: 'assets/images/save-train-pic.png'

        }, {
            name: 'Rock Paper Scissors',
            file: 'assets/images/rock-paper-pic.png'
        }, {
            name: 'Food Locator',
            file: 'assets/images/food-desert-pic.png'
        }, {
            name: 'First Bio',
            file: 'assets/images/v-first-bio.png'
        }, {
            name: 'Second Bio',
            file: 'assets/images/v-second-bio.png'
        }, {
            name: 'Tweet Machine',
            file: 'assets/images/tweet-machine.png'
        },
        {
            name: 'Trivia Game',
            file: 'assets/images/trivia-game.png'
        }
    ];

    console.log(imgObj[0].name);


    function imgGen() {

        
        
        for (var i = 0; i < imgObj.length; i++) {

            imgDiv = $("<div class='col-md-3'>");

            console.log(imgObj[i]);

            //Paragraph tag with project name
            var p = $("<p>").text(imgObj[i].name);

            //Decalre image tag
            var workImg = $('<img>');

            //Giving image tags src attributes
            workImg.attr('src', imgObj[i].file);
            workImg.attr('data-dismiss', 'modal'); //THIS COULD ALSO BE WHERE EROOR IS 
            workImg.addClass('portfolio');

            //Appending img & name to 
            imgDiv.append(workImg);
            imgDiv.append(p);

            //Prepending imgae content to portfolio ID
            $("#portfolio").append(imgDiv);

            $('.portfolio').on('click', function () {
               

                for(var i=0; i< imgObj.length; i++){

                    //There is an error here. First image 

                    $(".image-me").attr('src', imgObj[i].file);
                    $("#image-modal").modal('show');


                }
                   
                
            });
        

     

        }



    }
    imgGen();

  

});




