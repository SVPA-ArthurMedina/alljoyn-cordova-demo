var ServerService = {
    startServerServices: function() {
        console.log("Starting Server Services...");

        var connectionButton = document.getElementById('connectionServerButton');
        var connectionStatus = document.getElementById('connectionServerStatus');

        var connectionSuccess = function(bus) {
            console.log('Connection Successful');
            connectionStatus.innerHTML = 'Connection Successful!';
            connectionStatus.style.color = "green";
        };

        var connectionFailure = function() {
            console.log('Connection Failed');
            connectionStatus.innerHTML = 'Connection Failed!';
            connectionStatus.style.color = "red";
        };

        connectionButton.addEventListener('click', function() {
            console.log('Clicked on Connect Button!');
            connectionStatus.innerHTML = 'Connecting...';
            AlljoynWrapper.startAlljoynAppServices(connectionSuccess, connectionFailure);
        });
    }
};