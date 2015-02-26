var newsData = {};

function loadNieuws(){
	$.getJSON( "http://srv5.mvdw-software.com/workspace/Stuvo/backend/html/nieuws.php", function( data ) {
      $.each( data['data'], function( postId, postData ) {
      	
      });
    });
}