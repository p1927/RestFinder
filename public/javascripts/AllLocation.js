$(".postlocation").click(function(){   
      
      $(this).parents("p.message").text("Add Location");
      $("div.col-xs-12.col-sm-8").find('*').not('p').remove();
      $("div.col-xs-12.col-sm-8").append( "<form id=\"rendered-form\">     \
         <div class=\"rendered-form\">   \
         <div class=\"fb-text form-group field-name\">\
         <label for=\"name\" class=\"fb-text-label\">Name<span class=\"fb-required\">*</span></label>\
         <input type=\"text\" placeholder=\"Restaurant Name \" class=\"form-control\" name=\"name\" maxlength=\"30\" id=\"name\" required=\"required\" aria-required=\"true\">\
         </div>\
         <div class=\"fb-text form-group field-tagline\">\
         <label for=\"tagline\" class=\"fb-text-label\">Tagline</label>\
         <input type=\"text\" placeholder=\"Tagline\" class=\"form-control\" name=\"tagline\" maxlength=\"50\" id=\"tagline\">\
         </div>\
         <div class=\"fb-text form-group field-address\"><label for=\"address\" class=\"fb-text-label\">Address<span class=\"fb-required\">*</span></label>\
         <input type=\"text\" placeholder=\"Address\" class=\"form-control\" name=\"address\" maxlength=\"100\" id=\"address\" required=\"required\" aria-required=\"true\">\
         </div>\
         <div class=\"fb-text form-group field-openinghrs\"><label for=\"openinghrs\" class=\"fb-text-label\">Timings</label><input type=\"text\" \
         placeholder=\"Format : Monday - Friday : 1200 hrs - 1800 hrs, Saturday : 1200 hrs - 1600 hrs, Sunday : Closed\" class=\"form-control\" name=\"openinghrs\" maxlength=\"100\" id=\"openinghrs\">\
         </div>\
         <div class=\"fb-text form-group field-facilities\"><label for=\"facilities\" class=\"fb-text-label\">Facilities</label><input type=\"text\" \
         placeholder=\"Ojo,Bouncy Banana, Hand of God dates\" class=\"form-control\" name=\"facilities\" maxlength=\"100\" id=\"facilities\">\
         </div>\
         <div class=\"fb-number form-group field-lat\"><label for=\"lat\" class=\"fb-number-label\">Latitude<span class=\"fb-required\">*</span></label>\
         <input type=\"number\" placeholder=\"17.423180\" class=\"form-control\" name=\"lat\" min=\"-90\" max=\"90\" id=\"lat\" required=\"required\" aria-required=\"true\">\
         </div>\
         <div class=\"fb-number form-group field-lng\"><label for=\"lng\" class=\"fb-number-label\">Longitude<span class=\"fb-required\">*</span></label>\
         <input type=\"number\" placeholder=\"78.340959\" class=\"form-control\" name=\"lng\" min=\"-180\" max=\"180\" id=\"lng\" required=\"required\" aria-required=\"true\">\
         </div>\
         <div class=\"fb-text form-group field-email\"><label for=\"email\" class=\"fb-text-label\">E-mail</label><input type=\"text\" placeholder=\"E-mail\" class=\"form-control\" name=\"email\" maxlength=\"50\" id=\"email\">\
         </div>\
         <div class=\"fb-text form-group field-website\"><label for=\"website\" class=\"fb-text-label\">Website</label><input type=\"text\" placeholder=\"Website\" class=\"form-control\" name=\"website\" maxlength=\"50\" id=\"website\">\
         </div>\
         <div class=\"fb-text form-group field-telephone\"><label for=\"telephone\" class=\"fb-text-label\">Telephone No.</label>\
         <input type=\"text\" placeholder=\"+91-123456789\" class=\"form-control\" name=\"telephone\" maxlength=\"15\" id=\"telephone\">\
         </div>\
         <div class=\"fb-button form-group field-postlocationsubmit\"><button type=\"button\" class=\"btn btn-success\" id=\"postlocationsubmit\" style=\"success\" id=\"postlocationsubmit\">Submit</button></div>\
         </div></form>");

     });


     $("div.col-xs-12.col-sm-8").on("click",'#postlocationsubmit',function(){                   //select  Add location icon span
     
     $.ajax({ 
      url: "../locations",
      type: "POST",
       data: $("#rendered-form").serialize(),
      cache: false,
      success: (res)=>{  window.location.replace("../locations/"+res.locations._id);
                 
             },
       error: function (error) { 
           alert(error.responseText);
      }
      });
      });

      $(".findbylocation").click(function(){  
      $(".distance").toggle();  
      var value= $(".distance").val();              //select  Add location icon span
      if (value)
      {
          
     window.location="../locations?distance="+value; }
          
           
      });

$(".allocation").click(function(){      //All button        
     window.location="../locations"; 
     });

$(window).ready(function(){
      $("#filter").show();  //Show Filter textbar
      $(".clearbtn").show();
      var query = location.search.slice(1); //show distance filter with value
      if (query) { $(".distance").show(); 
      $(".distance").val(query.split("=")[1]); }
      
    




  });