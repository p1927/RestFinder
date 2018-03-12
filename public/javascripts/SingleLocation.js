  $( document ).ready(()=> {                             //first time hidehide confirm options
       
       
        $("#filter").hide();
        $('.clearbtn').hide();
 setTimeout( ()=>{
        if (navigator.geolocation) { //Checks if browser supports geolocation
   navigator.geolocation.getCurrentPosition((position)=>{           //This gets the users current location
     var latitude = position.coords.latitude;                    
     var longitude = position.coords.longitude;  
     var accuracy = position.coords.accuracy;               
     var coords = new google.maps.LatLng(latitude, longitude);

      var str="";
      str=$("#coords").html();
      var coord=str.split(/[\[,\]]/);
      var dest=[coord[1],coord[2]];
      console.log(dest);
      var destinationcoords = new google.maps.LatLng(parseFloat(dest[1]), parseFloat(dest[0]));  //Creates variable for map coordinates
   
     var directionsService = new google.maps.DirectionsService();
     var directionsDisplay = new google.maps.DirectionsRenderer();
 
     var mapOptions = //Sets map options
     {
       zoom: 15,  //Sets zoom level (0-21)
       center: destinationcoords, //zoom in on users location
       mapTypeControl: true, //allows you to select map type eg. map or satellite
       navigationControlOptions:
       {
         style: google.maps.NavigationControlStyle.SMALL //sets map controls size eg. zoom
       },
       mapTypeId: google.maps.MapTypeId.ROADMAP //sets type of map Options:ROADMAP, SATELLITE, HYBRID, TERRIAN
     };
     map = new google.maps.Map(  document.getElementById("frame"), mapOptions );//Creates a new map using the passed optional parameters in the mapOptions parameter.
     directionsDisplay.setMap(map);
     directionsDisplay.setPanel(document.getElementById('frame'));
     var request = {
       origin: coords,
       destination: destinationcoords,
       travelMode: google.maps.DirectionsTravelMode.DRIVING   };

       directionsService.route(request, function (response, status) { 
       if (status == google.maps.DirectionsStatus.OK) {
         directionsDisplay.setDirections(response);  } 

      else { $("#directionmessage").text(">> Couldn't fetch directions, its too far!"); }
          });
                    
    },function error(msg){ alert('Please enable your GPS position future.'); },{maximumAge:600000, timeout:5000, enableHighAccuracy: true} ); 
 } 
},500);
   });

