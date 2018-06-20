//$(document).ready(function(){
        // This example adds a search box to a map, using the Google Place Autocomplete
        // feature. People can enter geographical searches. The search box will return a
        // pick list containing a mix of places and predicted search terms.
        // This example requires the Places library. Include the libraries=places
        // parameter when you first load the API. For example:
        // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
        var swBound={}
        var neBound={};
        var centerLocation={}
        var centerLat = 0;
        var centerLng = 0;
        function initAutocomplete() {
            var callLocation = "New York";
            var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + callLocation +
                "&key=AIzaSyDLjsR037GJwMPDGDcLpGj5uXbpB9Cwsxk";
            console.log(queryURL);
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                centerLat = parseInt(response.results[0].geometry.location.lat);
                centerLng =  parseInt(response.results[0].geometry.location.lng);
                centerLocation = {lat: response.results[0].geometry.location.lat, lng: response.results[0].geometry.location.lng};
                swBound = response.results[0].geometry.bounds.southwest;
                neBound = response.results[0].geometry.bounds.northeast;
                
                console.log(centerLocation);
                console.log(swBound);
                console.log(neBound);
            }).then(function() {
            
            console.log(centerLat);
            console.log(centerLng);
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
            searchBox.a+--ddListener('places_changed', function () {
                var places = searchBox.getPlaces();
                if (places.length == 0) {
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
                    //Scale with travel option 
                    //For what ever we choose - this will scale with options walking or cycling 
                    //
                    // for(var city)
                    // var cityCircle = new google.maps.Circle({
                    //     strokeCOlor
                    // })
                    var icon = {
                        url: 'https://i.imgur.com/yK0wNs3.png',
                        size: new google.maps.Size(100, 100),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(17, 34),
                        scaledSize: new google.maps.Size(100, 100)
                    };
                    // Create a marker for each place.
                    markers.push(new google.maps.Circle({
                        strokeColor: '#FF0000',
                        strokeOpacity: .8,
                        strokeWeight: 2,
                        fillColor: '#FF0000',
                        map: map,
                        center: place.geometry.location,
                        radius: 1609.34, //482.8,//walking
                        title: place.name,
                        //   position: place.geometry.location
                    }));
                    // markers.push(new google.maps.Marker({
                    //     map: map,
                    //   icon: icon,
                    //   title: place.name,
                    //   position: place.geometry.location
                    // }));            // 
                    if (place.geometry.viewport) {
                        // Only geocodes have viewport.
                        bounds.union(place.geometry.viewport);
                    } else {
                        bounds.extend(place.geometry.location);
                    }
                });
                map.fitBounds(bounds);
            });
        });
    };
    

  //});