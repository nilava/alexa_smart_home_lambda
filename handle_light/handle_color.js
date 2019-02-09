module.exports={  
    handleColor: function(request, context) {
       // get device ID passed in during discovery
       var requestMethod = request.directive.header.name;
       var hue = request.directive.payload.color.hue;
       var saturation = request.directive.payload.color.saturation;
       var brightness = request.directive.payload.color.brightness;
       var token = request.directive.endpoint.cookie.key2;
       var switch_no = request.directive.endpoint.cookie.key4;
       const request1 = require('request');
       if (requestMethod === "SetColor") {
           // Make the call to your device cloud for control
           var url = "https://blynk.tph.org.in/api/" + token + "/update/"+ 'v0' + "?value=" + brightness; 
           process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
           request1(url, function (error, response, body) {
             console.log('error:', error); // Print the error if one occurred
             console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
             console.log('body:', body), // Print the HTML for the Google homepage.
             response_color(request, context, hue, saturation, brightness),
             context.succeed(response);
           });
       }
     
    
      function response_color(request, context, hue, saturation, brightness){
       var requestMethod = request.directive.header.name;
       var responseHeader = request.directive.header;
       var deviceId = request.directive.endpoint.endpointId;
       responseHeader.namespace = "Alexa";
       responseHeader.name = "Response";
       responseHeader.messageId = responseHeader.messageId + "-R";
       // get user token pass in request
       var requestToken = request.directive.endpoint.scope.token;
       var value = {
           "hue" : hue,
           "saturation" : saturation,
           "brightness" : brightness
       }
       var contextResult = {
           "properties": [{
               "namespace": "Alexa.ColorController",
               "name": "color",
               "value": value,
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