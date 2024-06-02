$(document).ready(function() {
    $("#Soundcloud").on('click', function() {
        window.open('https://www.facebook.com/missingpeopleparty/', '_blank');
    });

    $("#Facebook").on('click', function() {
        window.open('https://www.facebook.com/missingpeopleparty/', '_blank');
    });

    $("#Instagram").on('click', function() {
        window.open('https://www.facebook.com/missingpeopleparty/', '_blank');
    });

    $("#Spotify").on('click', function() {
        window.open('https://www.facebook.com/missingpeopleparty/', '_blank');
    });
    
    const form = document.querySelector('form'); // Select the form element

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData(form);
        const jsonData = Object.fromEntries(formData.entries()); // Convert FormData to a regular object

        $.ajax({
            url: 'https://comms.gaspra.co.uk/email?apiKey=1234',
            type: 'POST',
            data: JSON.stringify(jsonData),
            contentType: 'application/json',
            dataType: 'json', // Optional: Specify expected response format
            success: function(data) {
                console.log('Success:', data);
                // Display a success message or handle the API response
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Error:', textStatus, errorThrown);
                // Display an error message
            }
        });
        
    });
});




/**/
function countChar(val) {
    var len = val.value.length;
    $('#messageCounter').text(len);
}
