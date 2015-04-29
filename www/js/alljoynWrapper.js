var AlljoynWrapper = {
    startAlljoynAppServices: function(success, failed) {
        var connectionSuccess = function(alljoynBus) {
            console.log("Successfully connected to the AllJoyn bus!");
            //Join a session, register objects, add listeners, etc...
            return success(alljoynBus);
        };

        var connectionFailure = function() {
            console.log("Failed to connect to the AllJoyn bus!");
            return failed();
        };

        if (AllJoyn) {
            AllJoyn.connect(connectionSuccess, connectionFailure);
        } else {
            // how did we get here?  Is the AllJoyn plugin installed?
            console.log('how did we get here?  Is the AllJoyn plugin installed?');
        }
    },
    startAdvertisingName: function(alljoynBus, advertiseName, portNumber, success, failed) {
        var advertiseNameSuccess = function() {
            console.log("Advertising name was Successful!");
            return success(alljoynBus);
        };

        var advertiseNameFailure = function() {
            console.log("Advertising name Failed!");
            return failed();
        };

        alljoynBus.startAdvertisingName(advertiseNameSuccess, advertiseNameFailure, advertiseName, portNumber);
    },
    joinAdvertisedSession: function(alljoynBus, success, failed, advertiseName, portNumber) {
        var service = {
            name: advertiseName,
            port: portNumber
        };

        var joinSuccessful = function(session) {
            console.log('Joining session was Successful!');
            return success(alljoynBus, session);
        };

        var joinFailed = function(status) {
            console.log('Joining session Failed! Error: ' + status);
            return failed();
        };

        alljoynBus.joinSession(joinSuccessful, joinFailed, service);
    },
    registerObjects: function(success, failed, applicationObjects, proxyObjects) {
        var registeredSuccessful = function() {
            console.log('Objects were Registered!');

            return success();
        };

        var registeredFailed = function() {
            console.log('Failed to register objects');

            return failed();
        };

        AllJoyn.registerObjects(registeredSuccessful, registeredFailed, applicationObjects, proxyObjects);
    }
};


