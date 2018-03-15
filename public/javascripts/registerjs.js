   $(document).ready(function (){

    $('.showtoggle').css('display','none');


     });
 
   
function setConfirmPassword(){ 
  if($('#buttonlogintoregister').text()=='Register')
  { $('#confirmPassword').val("");
    }
}
    
 
    
  function  dbcheck (uname)
    { 
      /* $.ajax({
        type: "POST",
        url:  'CCCCCCCCCCCCCCCCCCC',
        data: {userN:uname},
        success: function(resp) {
        if(resp=='1')
          $('#plogintoregister').text("The Username already exists. Try Again.");  
        else  $('#plogintoregister').text("Pretty Good."); 
        
            }
        }); */
      }
       
   var cont =0;

    function  validatePassword  (){ 
      var a=$('#password').val();
      var b=$('#confirmPassword').val();
      if (a!=b){ $('#plogintoregister').text("Passwords do not match. Try Again"); 
      $('#password').val("");
      $('#confirmPassword').val('');
    }
      else $('#plogintoregister').text("Password looks secure!");
    }

   function register(){ 


     cont++;
    
    if(cont==1){////////////////////////////////////USER CLICKS ON REGISTER
    //  $('.registerbox').animate({height:'595px'}, 550);
      $('.showtoggle').css('display','block');
      $('#logintoregister').text('Registration');
      $('#buttonlogintoregister').text('Register');
      $('#plogintoregister').text("Already registered?");
      $('#textchange').text('Login');
      $('#name').prop('disabled',false);
      
      $('#confirmPassword').prop('disabled',false);
     
      $('#una').attr('oninput', 'dbcheck(this.value);');

      /////////////////////////////////////////////////
      
      
    }
    else
    {///////////////////////////////////////////USER CLICKS ON LOGIN 
      $('.showtoggle').css('display','none');
 //     $('.registerbox').animate({height:'365px'}, 550);
      $('#logintoregister').text('Login');
      $('#buttonlogintoregister').text('Login');
      $('#plogintoregister').text("Not a registered User?");
      $('#textchange').text('Register');
      $('una').removeAttr('oninput');
      $('#name').prop('disabled',true);
     
      
      $('#confirmPassword').prop('disabled',true);
      cont = 0;
    }
}