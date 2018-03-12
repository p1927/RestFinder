

 var clearfilter= function (){ 
        $("#filter").val("");
        $("#filter").trigger('input');        //clear button
      };

      var buttonclr=function (){
       if($("#filter").val()==""){ $('.clearbtn').css({"background-color":"transparent","color":"black"});
        $(".clearbtn").hover(function() {
          $(this).css("background-color","transparent");
        });
        $('.filterbox').css({"box-shadow":"none"});
     }
        else { 
        $('.clearbtn').css({"background-color":"#007bff","color":"white"});
        $(".clearbtn").hover(function() {
          $(this).css("background-color","#007bff");
        });
        $('.filterbox').css({"box-shadow":" 0 0 0 0.2rem rgba(0, 123, 255, 0.5)"}); // ng-input box outline
        }};

    

