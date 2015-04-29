var advertiseName = 'my.alljoyn.sample.app';
var portNumber = 12;
var count = 0;

var ServerService = {
    startServerServices: function(successCallback, failureCallback) {
        console.log("Starting Server Services...");

        var connectionButton = document.getElementById('connectionServerButton');
        var connectionStatus = document.getElementById('connectionServerStatus');

        var alljoynConnectionSuccess = function(alljoynBus) {
            console.log('Connection Successful');
            connectionStatus.innerHTML = 'Connection Successful!';
            connectionStatus.style.color = "green";

            var advertisingNameSuccess = function(alljoynBus) {
                // Success Callback
                console.log('Name is being advertise!');
                connectionStatus.innerHTML = connectionStatus.innerHTML + ' Advertising Name!';
                connectionStatus.style.color = 'green';

                var joiningSuccessful = function(alljoynBus, session) {
                    console.log('Session Joined! Session Id: ' + session.sessionId);
                    connectionStatus.innerHTML = connectionStatus.innerHTML + ' Session Joined! ID: ' + session.sessionId;
                    connectionStatus.style.color = 'green';

                    var registeringObjectsSuccessful = function() {
                        console.log('Objects Registered!');
                        connectionStatus.innerHTML = connectionStatus.innerHTML + ' Objects Registered!';
                        connectionStatus.style.color = 'green';

                        return successCallback(alljoynBus, session);
                    };

                    var registeringObjectsFailed = function() {
                        console.log('Objects Failed to Registered!');
                        connectionStatus.innerHTML = connectionStatus.innerHTML + " Objects didn't Registered!";
                        connectionStatus.style.color = 'red';

                        return failureCallback();
                    };

                    var applicationObjects = [
                        {
                            path: '/myServerServices',
                            interfaces: [
                                [
                                    'my.alljoyn.sample.app.server',
                                    '?SetCount countValue<i returnCount>i',
                                    '?GetCount returnCount>i',
                                    '@ServerAppName >s',
                                    null
                                ],
                                null
                            ]
                        },
                        null
                    ];

                    var proxyObjects = [
                        {
                            path: '/myClientServices',
                            interfaces: [
                                [
                                    'my.alljoyn.sample.app.client',
                                    '!SendSignal SignalValue>i',
                                    '@AppName =s',
                                    null
                                ],
                                null
                            ]
                        },
                        null
                    ];

                    AlljoynWrapper.registerObjects(registeringObjectsSuccessful, registeringObjectsFailed, applicationObjects, proxyObjects);
                };

                var joiningFailed = function() {
                    console.log('Joining Failed!');
                    connectionStatus.innerHTML = connectionStatus.innerHTML + ' Joining Failed!';
                    connectionStatus.style.color = 'red';
                };

                AlljoynWrapper.joinAdvertisedSession(alljoynBus, joiningSuccessful, joiningFailed, advertiseName, portNumber)
            };

            var advertisingNameFailure = function() {
                // Failure Callback
                console.log('Failed to advertise name!');
                connectionStatus.innerHTML = connectionStatus.innerHTML + ' Advertising Name Failed!';
                connectionStatus.style.color = 'red';
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
    },
    setupSignalListener: function(alljoynBus, responseServerTextarea) {
        alljoynBus.addListener([2, 0, 0, 0], 'i', function(args) {
            console.log('Received a signal with the value of: ' + args.arguments[0]);

            responseServerTextarea.value = responseServerTextarea.value + "\n- Received a signal with the value of: " + args.arguments[0];
        });
    },
    setupSetCounterListener: function(alljoynBus, responseServerTextarea) {
        alljoynBus.addListener([1, 0, 0, 0], 'i', function(args) {
            console.log('setCounter method was called! With value of: ' + args.arguments[0]);

            count = args.arguments[0];
            responseServerTextarea.value = responseServerTextarea.value + "\n- setCounter Method was called, setting count to: " + args.arguments[0];
        });
    },
    setupGetCounterListener: function() {

    }
};