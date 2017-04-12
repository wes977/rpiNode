/**
 * BLINK.JS
 * Wesley Thompson
 * April 2017
 * This is the page that handles all the apis and all that fun stuff
 */

// ============================================================================
// This is for setting up express and the web page and the leds and all that 
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
var onoff 	= require('onoff');
var http      	= require('http');
var express   	= require('express');
var app       	= express();
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// This is for setting up express and the web page and the leds and all that 
// ============================================================================

// ============================================================================
// This is for all the pins I want to deal with if I want to control more add more 
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
var inputs = [    { pin: '4', gpio: '23', value: 0 }];
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// This is for all the pins I want to deal with if I want to control more add more 
// ============================================================================


// ============================================================================
// Setting up the pin we are controling and all that so it pin 4 and all that
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
var Gpio = onoff.Gpio,led = new Gpio(inputs[0].pin, 'out'),interval;
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Setting up the pin we are controling and all that so it pin 4 and all that
// ============================================================================



// ============================================================================
// This is the block of code to have the led blink on and off every two seconds
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
//interval = setInterval(function (err, value) {
//	var value = (led.readSync() +1) % 2; // add one and if 2 mod back to 0
//	led.write(value,function() { 
// 		console.log("Changed LED to state to: " + value);
//		inputs[0].value = value;
//	}); // changing states and display on screen console
//},2000);
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// This is the block of code to have the led blink on and off every two seconds
// ============================================================================

// ============================================================================
// This is the block of code for exiting and all that fun stuff 
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
process.on('SIGINT',function () {
	clearInterval(interval);
	led.writeSync(0);
	led.unexport();
	console.log(" Bye");
	process.exit();
});
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// This is the block of code for exiting and all that fun stuff 
// ============================================================================


// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
// This is where all the apis and all that is handeled
// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

app.use(express.static(__dirname)); //configure Express to serve index.html and any other static pages stored 

// ============================================================================
// Express route for incoming requests for a single input
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
app.get('/inputs/:id', function (req, res) {
  var i;
  console.log('received API request for port number ' + req.params.id);
  						// --> Where all the Magic happens <--
  for (i in inputs){				// cycle through all the inputs 
    if ((req.params.id === inputs[0].gpio)) {	// This is if that checks the id in the url and makes sure it matches up and all that 
    	var value = (led.readSync()); // add one and if 2 mod back to 0
	if (value == 0)
	{
		led.write(1,function() { 
 			console.log("Changed LED to state to: " + value);
			inputs[0].value = value;
		});
	}
	else 
	{
		led.write(0,function() { 
 			console.log("Changed LED to state to: " + value);
			inputs[0].value = value;
		});
	}
      res.send(inputs[0]); 			// returning data to the web page of the pins id and all that 
      return;					// essentially a breaks / return and all that 			
    }
  } // END FOR 
  						// --> Where we go if the port sent is bad <--
  console.log('invalid input port');
  res.status(403).send('dont recognise that input port number ' + req.params.id);
});
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Express route for incoming requests for a single input
// ============================================================================


// ============================================================================
// Express route for incoming requests for a list of all inputs
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
app.get('/inputs', function (req, res) {
  // send array of inputs objects as a JSON string
  console.log('all inputs');
  res.status(200).send(inputs);
}); // apt.get()
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Express route for incoming requests for a list of all inputs
// ============================================================================

// ============================================================================
// This is the api for on the requests and all that like on button click
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
app.post('/test', function (req, res) {
    	console.log('Got the post request and all that fun stuff!');
	var value = (led.readSync()); // add one and if 2 mod back to 0
	if (value == 0)
	{
		led.write(1,function() { 
 			console.log("Changed LED to state to: " + value);
			inputs[0].value = value;
		});
	}
	else 
	{
		led.write(0,function() { 
 			console.log("Changed LED to state to: " + value);
			inputs[0].value = value;
		});
	}	
});
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// This is the api for on the requests and all that like on button click
// ============================================================================

// ============================================================================
// Express route for any other unrecognised incoming requests
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
app.get('*', function (req, res) {
  res.status(404).send('Unrecognised API call 23');
});
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Express route for incoming requests for a list of all inputs
// ============================================================================

// ============================================================================
// Express route to handle errors
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
app.use(function (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send('Oops, Something went wrong!');
  } else {
    next(err);
  }
}); // apt.use()
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Express route to handle errors
// ============================================================================

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
// Start Express App Server
// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
app.listen(3000);
console.log('App Server is listening on port 3000');

