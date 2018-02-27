  $( document ).ready(function() {                             //first time hidehide confirm options
        $(".confirm").find('.badge').toggle();  });
     
     $(".confirm").click(function () {                             //show confirm options
        $(this).find('.badge').toggle();       });

     $(".cancel").click(()=>{                              //hide confirm options
        $(this).find('.badge').toggle();        });

     $("[id^=delete]").click(function(){                    //select  delete review icon span
     var id=this.id.split("delete")[1];
     $.ajax({ 
      url: "./"+id,
      type: "DELETE",
      cache: false,
      success: (res)=>{ console.log("Removed Review"+res.message);
      $(this).parents(".row.reviews")[0].remove(); 
                    
             }
      });
      });