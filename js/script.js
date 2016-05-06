
$( document ).ready(function() {
//  Slide cliente
 "use strict";
$("#owl-demo").owlCarousel({

      autoPlay: 3000, //Auto play 3 seg
    items : 4,
      itemsDesktop : [1199,3],
      itemsDesktopSmall : [979,3]
  });
});

$(document).ready(function() {
    $('#example').DataTable();
} );
$(document).ready(function() {
 
  $("#owl-demo-one").owlCarousel({
 
      navigation : false, // Next prev botones
      slideSpeed : 300,
      paginationSpeed : 400,
      singleItem:true,
      
 
 
  });
 
});
$(document).ready(function() {
 
  $("#owl-demo-history").owlCarousel({
 
      navigation : false, // next prev botones
      slideSpeed : 300,
      paginationSpeed : 400,
      singleItem:true,
      autoPlay : 5000,
      
      // "singleItem:true" is a shortcut for:
      // items : 1, 
      // itemsDesktop : false,
      // itemsDesktopSmall : false,
      // itemsTablet: false,
      // itemsMobile : false
 
  });
 
});



