/* jQuery No Conflict */

var $j = jQuery.noConflict();

/* Script Execution */

$j(document).ready(function() {
	var carousel = new ch.Carousel(myCarousel);
	var zoom = new ch.Zoom(myZoom);
});