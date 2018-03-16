   $(document).ready(function (){

    $('.showtoggle').css('display','none');


     });
 
   
function setConfirmPassword(){ 
  if($('#buttonlogintoregister').text()=='Register')
  { $('#confirmPassword').val("");
    }
}
    
 
  function  dbcheck (email)
    {  
       $.ajax({
        type: "GET",
        url:  '/api/userexists',
        data: {email:email},
        success: function(resp) { 
              if(resp.found==='true')
                {  $('#plogintoregister').text("The Username already exists. Try Again.");  }
              else  {$('#plogintoregister').text("Pretty Good!");}
            },
        error: function(err){   $('#plogintoregister').text("Username verification failed!"); console.log(err);}
        }); 
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
  
      $('.showtoggle').css('display','block');
      $('#logintoregister').text('Registration');
      $('#buttonlogintoregister').text('Register');
      $('#plogintoregister').text("Already registered?");
      $('#textchange').text('Login');
      $('#name').prop('disabled',false);
      
      $('#confirmPassword').prop('disabled',false);
     
      $('#email').attr('onfocusout', 'dbcheck(this.value);');

      /////////////////////////////////////////////////
      
      
    }
    else
    {///////////////////////////////////////////USER CLICKS ON LOGIN 
      $('.showtoggle').css('display','none');

      $('#logintoregister').text('Login');
      $('#buttonlogintoregister').text('Login');
      $('#plogintoregister').text("Not a registered User?");
      $('#textchange').text('Register');
      $('#email').removeAttr('onfocusout');
      $('#name').prop('disabled',true);
     
      
      $('#confirmPassword').prop('disabled',true);
      cont = 0;
    }
}