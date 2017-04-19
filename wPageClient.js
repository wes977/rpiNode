/**
 * MYCLIENT.JS
 * Wesley Thompson
 * April 2017
 * This is the page that does all the back end for 
 * the web page and all that
 */

// ============================================================================
// This is for onload and lauching my ajax stuff 
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
window.onload = function () {

// ============================================================================
// variables like URL and the ports  
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
  	var url,i,ports = [23];  // the GPIO ports we will read
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// variables like URL and the ports  
// ============================================================================

// ============================================================================
// if more than one ports and all that intializing
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
  //	for (i in ports) {
  //  		$('#input_' + ports[i]).html('loading port ' + ports[i] + ' value...');
  //	}
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// if more than one ports and all that intializing
// ============================================================================

// ============================================================================
// updating the word every half second
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
  //	setInterval( function () {
  //  		for (i in ports) {
  //    		url = document.URL + 'inputs/' + ports[i];
  //    		console.log('making API call ' + url);
  //    		$.getJSON(url, function (data) {
  //      			$('#input_' + data.gpio).html('GPIO input port ' + data.gpio + ' value is ' + data.value);
  //   			});
  //  		} // for 
  //	}, 1000); // setInterval
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// updating the word every half second
// ============================================================================
  
// ============================================================================
// This is for on button click 
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
	$('#LEDbtn').click(function(){
    		//$.post('/test');
		url = document.URL + 'inputs/23';
		$.getJSON(url, function (data) {
        		$('#input_' + data.gpio).html('GPIO input port ' + data.gpio + ' value is ' + data.value);
      		});
	});
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// This is for on button click 
// ============================================================================

}; //onload
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// This is for onload and lauching my ajax stuff 
// ============================================================================



