// Affix nav
$('nav').affix({
  offset: {
    top: $('header').height()
  }
});

//Slide down dropdowns
$(document).ready(function(){
  $('.dropdown').on('show.bs.dropdown', function(e){
    $(this).find('.dropdown-menu').first().stop(true, true).slideDown();
  });
  $('.dropdown').on('hide.bs.dropdown', function(e){
    $(this).find('.dropdown-menu').first().stop(true, true).slideUp();
  });
});

//Toggle mobile toggle menu icon with cross
$(function() {
  $('#navbar')
    .on('shown.bs.collapse', function() {
      $('#nav-toggle-icon').addClass('hidden');
      $('#nav-toggle-cross').removeClass('hidden');    
    })
    .on('hidden.bs.collapse', function() {
      $('#nav-toggle-icon').removeClass('hidden');
      $('#nav-toggle-cross').addClass('hidden');        
    });
});
