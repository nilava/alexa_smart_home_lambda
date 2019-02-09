module.exports={  
    handleDiscovery:function (request, context) {
        var payload = {
            "endpoints":
            [
 /////////////////////////////////////////////////////////////BEDROOM DEVICES///////////////////////////////////////////////////////////////////////////               
                {
                    "endpointId": "1002",
                    "manufacturerName": "Chowdhury's Home",
                    "friendlyName": "Light",
                    "description": "Bedroom Light",
                    "displayCategories": ["SWITCH"],
                    "cookie": {
                        "key1": "Auth Token",
                        "key2": "e6f21ba6c93d4a7dafe87917efe74bed",
                        "key3": "V1",   //Blynk Virtual Switch
                        "key4": ""      //Blynk Brightness Switch
                    },
                    "capabilities":
                    [
                        {
                          "type": "AlexaInterface",
                          "interface": "Alexa",
                          "version": "3"
                        },
                        {
                            "interface": "Alexa.PowerController",
                            "version": "3",
                            "type": "AlexaInterface",
                            "properties": {
                                "supported": [{
                                    "name": "powerState"
                                }],
                                 "retrievable": true
                            }
                        }
                    ]
                },
                {
                    "endpointId": "1003",
                    "manufacturerName": "Chowdhury's Home",
                    "friendlyName": "Fan",
                    "description": "Bedroom Fan",
                    "displayCategories": ["SWITCH"],
                    "cookie": {
                        "key1": "Auth Token",
                        "key2": "e6f21ba6c93d4a7dafe87917efe74bed",
                        "key3": "V2",   //Blynk Virtual Switch
                        "key4": ""      //Blynk Brightness Switch
                    },
                    "capabilities":
                    [
                        {
                          "type": "AlexaInterface",
                          "interface": "Alexa",
                          "version": "3"
                        },
                        {
                            "interface": "Alexa.PowerController",
                            "version": "3",
                            "type": "AlexaInterface",
                            "properties": {
                                "supported": [{
                                    "name": "powerState"
                                }],
                                 "retrievable": true
                            }
                        }
                    ]
                },
                {
                    "endpointId": "1004",
                    "manufacturerName": "Chowdhury's Home",
                    "friendlyName": "Dim Light 1",
                    "description": "Bedroom Dim Light 1",
                    "displayCategories": ["SWITCH"],
                    "cookie": {
                        "key1": "Auth Token",
                        "key2": "e6f21ba6c93d4a7dafe87917efe74bed",
                        "key3": "V3",   //Blynk Virtual Switch
                        "key4": ""      //Blynk Brightness Switch
                    },
                    "capabilities":
                    [
                        {
                          "type": "AlexaInterface",
                          "interface": "Alexa",
                          "version": "3"
                        },
                        {
                            "interface": "Alexa.PowerController",
                            "version": "3",
                            "type": "AlexaInterface",
                            "properties": {
                                "supported": [{
                                    "name": "powerState"
                                }],
                                 "retrievable": true
                            }
                        }
                    ]
                },
                {
                    "endpointId": "2222",
                    "manufacturerName": "Chowdhury's Home",
                    "friendlyName": "Dim Light 2",
                    "description": "Bedroom Dim Light 2",
                    "displayCategories": ["SWITCH"],
                    "cookie": {
                        "key1": "Auth Token",
                        "key2": "e6f21ba6c93d4a7dafe87917efe74bed",
                        "key3": "V4",   //Blynk Virtual Switch
                        "key4": ""      //Blynk Brightness Switch
                    },
                    "capabilities":
                    [
                        {
                          "type": "AlexaInterface",
                          "interface": "Alexa",
                          "version": "3"
                        },
                        {
                            "interface": "Alexa.PowerController",
                            "version": "3",
                            "type": "AlexaInterface",
                            "properties": {
                                "supported": [{
                                    "name": "powerState"
                                }],
                                 "retrievable": true
                            }
                        }
                    ]
                },
/////////////////////////////////////////////////////////////LIVING ROOM DEVICES///////////////////////////////////////////////////////////////////////////    
             
/////////////////////////////////////////////////////////////BEDROOM 2 DEVICES///////////////////////////////////////////////////////////////////////////
               
/////////////////////////////////////////////////////////////OTHER DEVICES///////////////////////////////////////////////////////////////////////////                                         
                {
                    "endpointId": "1001",
                    "manufacturerName": "Chowdhury's Home",
                    "friendlyName": "Outlet",
                    "description": "Smart Device Switch 1",
                    "displayCategories": ["LIGHT"],
                    "cookie": {
                        "key1": "Auth Token",
                        "key2": "e6f21ba6c93d4a7dafe87917efe74bed",
                        "key3": "V1",  //Blynk Virtual Switch
                        "key4": "V20"  //Blynk Brightness Adjust Switch
                    },
                    "capabilities":
                    [
                        {
                          "type": "AlexaInterface",
                          "interface": "Alexa",
                          "version": "3"
                        },
                        {
                            "interface": "Alexa.PowerController",
                            "version": "3",
                            "type": "AlexaInterface",
                            "properties": {
                                "supported": [{
                                    "name": "powerState"
                                }],
                                 "retrievable": false
                            }
                        },
                        {
                            "type": "AlexaInterface",
                            "interface": "Alexa.BrightnessController",
                            "version": "3",
                            "properties": {
                              "supported": [{
                                "name": "brightness"
                              }],
                              "retrievable": false
                            }
                          },
                          {
                            "type": "AlexaInterface",
                            "interface": "Alexa.ColorController",
                            "version": "3",
                            "properties": {
                              "supported": [
                                {
                                  "name": "color"
                                }
                              ],
                              "retrievable": false
                            }
                          },
                          {
                            "type": "AlexaInterface",
                            "interface": "Alexa.ColorTemperatureController",
                            "version": "3",
                            "properties": {
                              "supported": [
                                {
                                  "name": "colorTemperatureInKelvin"
                                }
                              ],
                              "retrievable": false
                            }
                          }
                    ]
                }
            ]
        };
        var header = request.directive.header;
        header.name = "Discover.Response";
        function log(message, message1, message2) {
        console.log(message + message1 + message2);
    }
        log("DEBUG", "Discovery Response: ", JSON.stringify({ header: header, payload: payload })); /*global log*/
        context.succeed({ event: { header: header, payload: payload } });
    }
};