var ServerService = {
    startServerServices: function() {
        console.log("Starting Server Services...");

        var connectionButton = document.getElementById('connectionServerButton');

        connectionButton.addEventListener('click', function() {
            console.log('Clicked on Connect Button!')
        });
    }
};