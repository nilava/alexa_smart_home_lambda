module.exports={  
    handleBrightness: function(request, context) {
       // get device ID passed in during discovery
       var requestMethod = request.directive.header.name;
       var brightness = request.directive.payload.brightness;
       var token = request.directive.endpoint.cookie.key1;
       var switch_no = request.directive.endpoint.cookie.key4;
       const request1 = require('request');
       if (requestMethod === "SetBrightness") {
           // Make the call to your device cloud for control
           var url = "https://blynk.tph.org.in/api/" + token + "/update/"+ switch_no + "?value=" + brightness; 
           process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
           request1(url, function (error, response, body) {
             console.log('error:', error); // Print the error if one occurred
             console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
             console.log('body:', body), // Print the HTML for the Google homepage.
             response_switch(request, context, brightness),
             context.succeed(response);
           });
       }
      else if (requestMethod === "AdjustBrightness") {
        
       // Make the call to your device cloud for control
             var url_get_brightness = "https://blynk.tph.org.in/api/" + token + "/get/"+ switch_no;
             process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
           // Make the call to your device cloud for control and check for success
           request1(url_get_brightness, function (error, response, body) {
               console.log('error:', error); // Print the error if one occurred
               console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
               console.log('body:', body), // Print the HTML for the Google homepage.
               set_brightness_delta(request, context, body);
             });
       }

     function set_brightness_delta(request, context, body){
        var regex = /[+-]?\d+(?:\.\d+)?/g;
        var brightness_delta = request.directive.payload.brightnessDelta;
        var present_brightness = regex.exec(body)
        var set_brightness = (Number(present_brightness[0]) + Number(brightness_delta));
        if(set_brightness < 0){
        set_brightness=0;
        }
        else if(set_brightness > 100){
        set_brightness=100;
        }
        var url_set_brightness = "https://blynk.tph.org.in/api/" + token + "/update/"+ switch_no + "?value=" + set_brightness;   
        process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
        request1(url_set_brightness, function (error, response, body) {
          console.log('error:', error); // Print the error if one occurred
          console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
          console.log('body:', body), // Print the HTML for the Google homepage.
          response_switch(request, context, set_brightness),
          context.succeed(response);
        });
     }
   
    
      function response_switch(request, context, brightness){
       var requestMethod = request.directive.header.name;
       var responseHeader = request.directive.header;
       var deviceId = request.directive.endpoint.endpointId;
       responseHeader.namespace = "Alexa";
       responseHeader.name = "Response";
       responseHeader.messageId = responseHeader.messageId + "-R";
       // get user token pass in request
       var requestToken = request.directive.endpoint.scope.token;
       var contextResult = {
           "properties": [{
               "namespace": "Alexa.BrightnessController",
               "name": "brightness",
               "value": brightness,
               "timeOfSample": "2017-09-03T16:20:50.52Z", //retrieve from result.
               "uncertaintyInMilliseconds": 50
           }]
       };
       var response_json = {
           context: contextResult,
           event: {
               header: responseHeader,
               endpoint: {
                   scope: {
                       type: "BearerToken",
                       token: requestToken
                   },
                   endpointId: deviceId
               },
               payload: {}
           }
       };
       function log(message, message1, message2) {
           console.log(message + message1 + message2);
       }
       log("DEBUG", "Alexa.PowerController ", JSON.stringify(response_json));
        context.succeed(response_json);
   }
   }
   };