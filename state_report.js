module.exports={  
    handleStateReport: function(request, context) {
       // get device ID passed in during discovery
       const api_url = process.env.API_URL;
       var requestMethod = request.directive.header.name;
       var token = request.directive.endpoint.cookie.key1;
       var switch_no = request.directive.endpoint.cookie.key2;
       var powerResult;
       const request1 = require('request');
       
       if (requestMethod === "ReportState") {
        
       // Make the call to your device cloud for control
             var url_get_state = api_url + token + "/get/"+ switch_no;
             console.log(url_get_state);
           // Make the call to your device cloud for control and check for success
           process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
           request1(url_get_state, function (error, response, body) {
               console.log('error:', error); // Print the error if one occurred
               console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
               console.log('body:', body), // Print the HTML for the Google homepage.
               set_state(request, context, body),
               context.succeed(response);
             });
       }

     function set_state(request, context, body){
        var regex = /[+-]?\d+(?:\.\d+)?/g;
        var present_state = regex.exec(body);
         if(present_state[0] === "0"){
           powerResult = "OFF";
        }
        else if(present_state[0] === "1"){
            powerResult = "ON";
        }
        response_state(request, context, powerResult);
        }
   
    
     function response_state(request, context, powerResult){
        var requestMethod = request.directive.header.name;
        var responseHeader = request.directive.header;
        var deviceId = request.directive.endpoint.endpointId;
        responseHeader.namespace = "Alexa";
        responseHeader.name = "StateReport";
        responseHeader.messageId = responseHeader.messageId + "-R";
        // get user token pass in request
        var requestToken = request.directive.endpoint.scope.token;
        var contextResult = {
            "properties": [{
                "namespace": "Alexa.PowerController",
                "name": "powerState",
                "value": powerResult,
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
        //log("DEBUG", "Alexa.PowerController ", JSON.stringify(response_json));
         context.succeed(response_json);
    }
   }
   };