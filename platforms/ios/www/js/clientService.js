var ClientService = {
    startClientServices: function() {
        console.log("Starting Client Services...");

        var connectionButton = document.getElementById('connectionClientButton');

        connectionButton.addEventListener('click', function() {
            console.log('Clicked on Connect Button!')
        });
    }
};