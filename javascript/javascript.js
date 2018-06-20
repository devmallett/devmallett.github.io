var swBound = {}
var neBound = {};
var centerLocation = {}
var centerLat = 0;
var centerLng = 0;
var app, placeLng,  placeLat, d, dLat, dLng;
var deg;


function initAutocomplete() {
    var callLocation = "New York";
    var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + callLocation +
        "&key=AIzaSyDLjsR037GJwMPDGDcLpGj5uXbpB9Cwsxk";
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        centerLat = parseInt(response.results[0].geometry.location.lat);
        centerLng = parseInt(response.results[0].geometry.location.lng);
        centerLocation = { lat: response.results[0].geometry.location.lat, lng: response.results[0].geometry.location.lng };
        swBound = response.results[0].geometry.bounds.southwest;
        neBound = response.results[0].geometry.bounds.northeast;

    }).then(function () {

     
        var map = new google.maps.Map(document.getElementById('map'), {
            center: centerLocation,
            zoom: 13,
            mapTypeId: 'roadmap'
        });


        // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function () {
            searchBox.setBounds(map.getBounds());
        });
        var markers = [];

        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function () {
            var places = searchBox.getPlaces();
            if (places.length == 0) {
                //attempt to clear table on new search
                $("#storeTable").empty();
                return;
            }


            // Clear out the old markers.
            markers.forEach(function (marker) {
                marker.setMap(null);
            });
            markers = [];
            // For each place, get the icon, name and location.
            var bounds = new google.maps.LatLngBounds();
            places.forEach(function (place) {
                if (!place.geometry) {
                    console.log("Returned place contains no geometry");
                    return;
                } 
                
                var icon = {
                    url: 'https://i.imgur.com/yK0wNs3.png',
                    size: new google.maps.Size(100, 100),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(100, 100)
                };
                //Setting our place  distance 
                var radii;
                $("#inputGroupSelect01 option").each(function () {
                    if (this.selected) {

                        radii = parseInt($(this).val());
                        console.log($(this).val());
                      


                    }
                })
                // Create a marker for each place.
                markers.push(new google.maps.Circle({
                    strokeColor: '#FF0000',
                    strokeOpacity: .8,
                    strokeWeight: 2,
                    fillColor: '#FF0000',
                    map: map,
                    center: place.geometry.location,
                    radius: radii,// 1609.34, //482.8,//walking
                    title: place.name,
                    
                }));


                
                function getDistanceFromLatLonInKm() {
                    centerLat = parseInt(centerLat);
                    centerLng = parseInt(centerLng);
                    placeLat = parseInt(place.geometry.location.lat);
                    placeLng = parseInt(place.geometry.location.lng);


                    var R = 6371; // Radius of the earth in km
                     dLat = deg2rad(centerLat - placeLat);  // deg2rad below
                     console.log(centerLng + "-----------please help!!!");
                     dLng = deg2rad(centerLng - placeLng);
                     //console.log(placeLat + "-----------yuppers");
                    var a =
                        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                        Math.cos(deg2rad(centerLat)) * Math.cos(deg2rad(placeLat)) *
                        Math.sin(dLng / 2) * Math.sin(dLng / 2)
                        ;
                    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                    d = parseInt(R * c); // Distance in km
                   

                }
          
                
                getDistanceFromLatLonInKm();
               
                
                 
                function deg2rad(deg) {
                    deg = deg * (Math.PI / 180);
                    console.log(deg + "-----------am i right yet?????s");
                }

                $("#storeTable").append(
                    `<tr><td>${place.name}</td>
                        <td>${place.formatted_address}</td>
                        <td>${d}</td>
                      `
                );
             
                if (place.geometry.viewport) {
                    // Only geocodess have viewport.
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            });
            map.fitBounds(bounds);
        });
    })
};