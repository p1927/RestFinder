  $( document ).ready(()=> {                             //first time hidehide confirm options
        $(".confirm").find('.badge').toggle();

$.getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyAGX2KEn6RyrzyGAJ8KxxwUrTI4MeCMgtA", ()=>
{
    // script is now loaded and executed.
    // put your dependent JS here.

        if (navigator.geolocation) { //Checks if browser supports geolocation
   navigator.geolocation.getCurrentPosition((position)=>{                                                              //This gets the
     var latitude = position.coords.latitude;                    //users current
     var longitude = position.coords.longitude;  
     var accuracy = position.coords.accuracy;               //location
     var coords = new google.maps.LatLng(latitude, longitude);
      var destinationcoords = new google.maps.LatLng(dest[1], dest[0]); //Creates variable for map coordinates
     var directionsService = new google.maps.DirectionsService();
     var directionsDisplay = new google.maps.DirectionsRenderer();
     var mapOptions = //Sets map options
     {
       zoom: 15,  //Sets zoom level (0-21)
       center: coords, //zoom in on users location
       mapTypeControl: true, //allows you to select map type eg. map or satellite
       navigationControlOptions:
       {
         style: google.maps.NavigationControlStyle.SMALL //sets map controls size eg. zoom
       },
       mapTypeId: google.maps.MapTypeId.ROADMAP //sets type of map Options:ROADMAP, SATELLITE, HYBRID, TERRIAN
     };
     map = new google.maps.Map( /*creates Map variable*/ document.getElementById("frame"), mapOptions /*Creates a new map using the passed optional parameters in the mapOptions parameter.*/);
     directionsDisplay.setMap(map);
     directionsDisplay.setPanel(document.getElementById('frame'));
     var request = {
       origin: coords,
       destination: destinationcoords,
       travelMode: google.maps.DirectionsTravelMode.DRIVING   };

       directionsService.route(request, function (response, status) {
       if (status == google.maps.DirectionsStatus.OK) {
         directionsDisplay.setDirections(response);  }       });
                    
    },function error(msg){ alert('Please enable your GPS position future.'); },{maximumAge:600000, timeout:5000, enableHighAccuracy: true} ); 
 }
   });
   });
 /////////////////////////////////////////////////////////////////////////////////////////////////    
     $(".confirm").click(function () {                             //show confirm options
        $(this).find('.badge').toggle();       });

     $(".cancel").click(()=>{                              //hide confirm options
        $(this).find('.badge').toggle();        });

     
     $("[id^=delete]").click(function(){                    //select  delete review icon span
     var id=this.id.split("delete")[1];
     var fullURL=$(location).attr('href').split('#')[0];
     console.log(fullURL);
     $.ajax({ 
      url: fullURL+id,
      type: "DELETE",
      cache: false,
      success: (res)=>{ console.log("Removed Review"+res.message);
      $(this).parents(".row.reviews")[0].remove(); 
                    
             }
      });
      });