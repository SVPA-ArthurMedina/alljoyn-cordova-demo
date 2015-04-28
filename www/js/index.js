/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        var clientAppButton = document.getElementById('clientButton');
        var serverAppButton = document.getElementById('serverButton');
        var clientSection = document.getElementById('clientSection');
        var serverSection = document.getElementById('serverSection');

        app.receivedEvent('deviceready');

        // Setting up the client Button
        setupAppButton(clientAppButton, serverSection, clientSection);

        // Setting up the server button
        setupAppButton(serverAppButton, clientSection, serverSection);
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

var setupClientButtons = function(alljoynBus) {
    var returnMethodButton = document.getElementById('returnMethodButton');
    var responseTextInput = document.getElementById('responseText');
    var signalTextInput = document.getElementById('signalText');
    var methodTextInput = document.getElementById('methodText');
    var signalButton = document.getElementById('signalButton');
    var methodButton = document.getElementById('methodButton');

    signalButton.addEventListener('click', function() {
        var signalValue = signalTextInput.value;

        console.log('The value of Signal is: ' + signalValue);

        signalTextInput.value = '';
    });

    methodButton.addEventListener('click', function() {
        var methodValue = methodTextInput.value;

        console.log('The value of Method is: ' + methodValue);

        methodTextInput.value = '';
    });

    returnMethodButton.addEventListener('click', function() {
        console.log('Pressed the Get Property method button.');
    });
};

var setupAppButton = function(appButton, hideSectionDiv, showSectionDiv) {
    appButton.addEventListener('click', function() {
        console.log('Pressed ' + appButton.innerHTML + ' button');

        hideSectionDiv.setAttribute('style', 'display:none');
        showSectionDiv.setAttribute('style', 'display:block');

        var clientServicesSuccessful = function(alljoynBus) {
            console.log('Setting up buttons Successful!');
            var clientButtons = document.getElementsByClassName('clientButtons');
            var i = clientButtons.length;

            while(i--) {
                clientButtons[i].disabled = false;
            }

            setupClientButtons(alljoynBus);
        };

        var clientServicesFailed = function() {
            console.log('Setting up buttons failed!');
        };

        if (appButton.innerHTML === 'Client App') {
            ClientService.startClientServices(clientServicesSuccessful, clientServicesFailed);
        } else {
            ServerService.startServerServices();
        }
    });
};

app.initialize();

