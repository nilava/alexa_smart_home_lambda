exports.handler = function (request, context) {
    if (request.directive.header.namespace === 'Alexa.Discovery' && request.directive.header.name === 'Discover') {
        log("DEBUG:", "Discover request",  JSON.stringify(request));
        var discover = require('./devices');
        discover.handleDiscovery(request, context, "");
    }
    else if (request.directive.header.namespace === 'Alexa.PowerController') {  //switch
        if (request.directive.header.name === 'TurnOn' || request.directive.header.name === 'TurnOff') {
            log("DEBUG:", "TurnOn or TurnOff Request", JSON.stringify(request));
            var switch_handle = require('./handle_switch');
            switch_handle.handlePowerControl(request, context);
        }
    }
    else if (request.directive.header.namespace === 'Alexa.BrightnessController') {
        if (request.directive.header.name === 'SetBrightness' || request.directive.header.name === 'AdjustBrightness'){
        log("DEBUG:", "Brightness Request",  JSON.stringify(request));
        var switch_brightness = require('./handle_light/handle_brightness');
        switch_brightness.handleBrightness(request, context);
        }
    }
    else if (request.directive.header.namespace === 'Alexa.ColorTemperatureController') {
        if (request.directive.header.name === 'DecreaseColorTemperature' || request.directive.header.name === 'IncreaseColorTemperature' || request.directive.header.name === 'SetColorTemperature'){
        log("DEBUG:", "ColorTemperature Request",  JSON.stringify(request));
        var switch_color_temperature = require('./handle_light/handle_color_temperature');
        switch_color_temperature.handleColorTemperature(request, context);
        }
    }
    else if (request.directive.header.namespace === 'Alexa.ColorController') {
        if (request.directive.header.name === 'SetColor'){
        log("DEBUG:", "SetColor Request",  JSON.stringify(request));
        var switch_color = require('./handle_light/handle_color');
        switch_color.handleColor(request, context);
        }
    }
    else if (request.directive.header.namespace === 'Alexa') {
        if (request.directive.header.name === 'ReportState'){
        //log("DEBUG:", "Report State Request",  JSON.stringify(request));
        var state_report = require('./state_report');
        state_report.handleStateReport(request, context);
        }
    }



    function log(message, message1, message2) {
        console.log(message + message1 + message2);
    }


};

