var advertiseName = 'my.alljoyn.sample.app';
var portNumber = 12;

var connectionStatus = document.getElementById('connectionClientStatus');

var ClientService = {
    startClientServices: function(successCallback, failureCallback) {
        console.log("Starting Client Services...");

        var connectionButton = document.getElementById('connectionClientButton');

        var alljoynConnectionSuccess = function(alljoynBus) {
            console.log('Connection Successful');
            connectionStatus.innerHTML = 'Connection Successful!';
            connectionStatus.style.color = "green";

            var advertisingNameSuccess = function(alljoynBus) {
                // Success Callback
                console.log('Name is being advertise!');
                connectionStatus.innerHTML = connectionStatus.innerHTML + ' Advertising Name!';
                connectionStatus.style.color = "green";

                var joiningSuccessful = function(alljoynBus) {
                    console.log('Session Joined!');
                    connectionStatus.innerHTML = connectionStatus.innerHTML + ' Session Joined!';
                    connectionStatus.style.color = "green";

                    var registeringObjectsSuccessful = function() {
                        console.log('Objects Registered!');
                        connectionStatus.innerHTML = connectionStatus.innerHTML + ' Objects Registered!';
                        connectionStatus.style.color = "green";

                        return successCallback(alljoynBus);
                    };

                    var registeringObjectsFailed = function() {
                        console.log('Objects Failed to Registered!');
                        connectionStatus.innerHTML = connectionStatus.innerHTML + " Objects didn't Registered!";
                        connectionStatus.style.color = "red";

                        return failureCallback();
                    };

                    AlljoynWrapper.registerObjects(registeringObjectsSuccessful, registeringObjectsFailed);
                };

                var joiningFailed = function() {
                    console.log('Joining Failed!');
                    connectionStatus.innerHTML = connectionStatus.innerHTML + ' Joining Failed!';
                    connectionStatus.style.color = "red";
                };

                AlljoynWrapper.joinAdvertisedSession(alljoynBus, joiningSuccessful, joiningFailed, advertiseName, portNumber)
            };

            var advertisingNameFailure = function() {
                // Failure Callback
                console.log('Failed to advertise name!');
                connectionStatus.innerHTML = connectionStatus.innerHTML + ' Advertising Name Failed!';
                connectionStatus.style.color = "red";
            };

            AlljoynWrapper.startAdvertisingName(alljoynBus, advertiseName, portNumber, advertisingNameSuccess, advertisingNameFailure);
        };

        var alljoynConnectionFailure = function() {
            console.log('Connection Failed');
            connectionStatus.innerHTML = 'Connection Failed!';
            connectionStatus.style.color = "red";
        };

        connectionButton.addEventListener('click', function() {
            console.log('Clicked on Connect Button!');
            connectionStatus.innerHTML = 'Connecting...';

            AlljoynWrapper.startAlljoynAppServices(alljoynConnectionSuccess, alljoynConnectionFailure);
        });
    }
};