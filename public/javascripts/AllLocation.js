$(".postlocation").click(function() {

  $("div.col-xs-12.col-sm-8").children('*').not('.message').toggle();


});



$(window).ready(function() {
  $("#filter").show(); //Show Filter textbar
  $("#filter").val("");
  $("#filter").trigger('input'); //clear filter
  $("#rendered-form").hide();
  $(".clearbtn").show();
  var query = location.search.slice(1); //show distance filter with value
  if (query) {
    $(".distance").show();
    $(".distance").val(query.split("=")[1]);
  }



});