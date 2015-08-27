// Affix nav
$(function() {
  $('nav').affix({
    offset: {
      top: $('header').height()
    }
  });
});

//Slide down dropdowns on hover and click
$(function($) {
  $('.navbar .dropdown').hover(function() {
      $(this).find('.dropdown-menu').first().stop(true, true).delay(250).slideDown();
  }, function() {
      $(this).find('.dropdown-menu').first().stop(true, true).delay(100).slideUp();
  });

  $('.navbar .dropdown > a').click(function(){
      location.href = this.href;
  });
});

//Toggle mobile menu icon to x on click
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
