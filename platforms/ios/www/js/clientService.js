var advertiseName = 'my.alljoyn.sample.app';
var portNumber = 12;

var ClientService = {
    startClientServices: function(successCallback, failureCallback) {
        console.log('Starting Client Services...');

        var connectionButton = document.getElementById('connectionClientButton');
        var connectionStatus = document.getElementById('connectionClientStatus');

        var alljoynConnectionSuccess = function(alljoynBus) {
            console.log('Connection Successful');
            connectionStatus.innerHTML = 'Connection Successful!';
            connectionStatus.style.color = 'green';

            var joiningSuccessful = function(alljoynBus, session) {
                console.log('Session Joined! SessionId: ' + session.sessionId);
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

                var proxyObjects = [
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

                AlljoynWrapper.registerObjects(registeringObjectsSuccessful, registeringObjectsFailed, applicationObjects, proxyObjects);
            };

            var joiningFailed = function() {
                console.log('Joining Failed!');
                connectionStatus.innerHTML = connectionStatus.innerHTML + ' Joining Failed!';
                connectionStatus.style.color = 'red';
            };

            AlljoynWrapper.joinAdvertisedSession(alljoynBus, joiningSuccessful, joiningFailed, advertiseName, portNumber)
        };

        var alljoynConnectionFailure = function() {
            console.log('Connection Failed');
            connectionStatus.innerHTML = 'Connection Failed!';
            connectionStatus.style.color = 'red';
        };

        connectionButton.addEventListener('click', function() {
            console.log('Clicked on Connect Button!');
            connectionStatus.innerHTML = 'Connecting...';

            AlljoynWrapper.startAlljoynAppServices(alljoynConnectionSuccess, alljoynConnectionFailure);
        });
    },
    sendSignal: function(session, signalValue, successCallback, failureCallback) {
        session.sendSignal(successCallback, failureCallback, null, null, [1, 0, 0, 0], 'i', [signalValue]);
    },
    callAlljoynMethod: function(session, methodValue, successCallback, failureCallback) {
        session.callMethod(successCallback, failureCallback, null, null, [2, 0, 0, 0], 'i', [methodValue], 'i');
    },
    getAlljoynProperty: function(session, successCallback, failureCallback) {
        session.callMethod(successCallback, failureCallback, null, null, [2, 0, 0, 1], '', [], 'i');
    }
};