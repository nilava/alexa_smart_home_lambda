module.exports={  
    handleDiscovery:function (request, context) {
        
    var payload;

    const request1 = require('request');
    var header = request.directive.header;
        header.name = "Discover.Response";
    function log(message, message1, message2) {
        console.log(message + message1 + message2);
    }               
       // Make the call to your device cloud for control
             const get_device_url = process.env.GET_DEVICE_URL;
             var url_get_state = get_device_url;
           // Make the call to your device cloud for control and check for success
           process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
           request1(url_get_state, function (error, response, body) {
               console.log('error:', error); // Print the error if one occurred
               console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
               console.log('body:', body), // Print the HTML for the Google homepage.
               payload = JSON.parse(body),
               log("DEBUG", "Discovery Response: ", JSON.stringify({ header: header, payload: payload })),
               context.succeed({ event: { header: header, payload: payload } });
             });
       
    }
};