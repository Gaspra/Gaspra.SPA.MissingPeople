$(document).ready(function() {
    const form = document.querySelector('form'); // Select the form element

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission
        openPopup('Sending, please wait...');
        
        const formData = new FormData(form);
        const jsonData = Object.fromEntries(formData.entries()); // Convert FormData to a regular object

        $.ajax({
            url: 'https://comms.gaspra.co.uk/email?apiKey=1234',
            type: 'POST',
            data: JSON.stringify(jsonData),
            contentType: 'application/json',
            success: function(data) {
                console.log('Success:', data);
                clearForm();
                openPopup('Message sent!');
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Error:', textStatus, errorThrown);
                openPopup('Message failed, try again in a minute...');
            }
        });
        
    });
});

/**/
function clearForm() {
    $('#email').val('');
    $('#content').val('');
    $('#messageCounter').text('0');
}

function openPopup(text) {
    $('#popupMessage').text(text);
    $('#popup').css('visibility', 'visible');
    $('#popup').css('opacity', '1');
}

function closePopup() {
    $('#popup').css('visibility', 'hidden');
    $('#popup').css('opacity', '0');
}

$(document).ready(function() {
    $('#popup').on("click", function () {closePopup();});
    $('#popupMessage').on("click", function () {closePopup();});
});

/**/
function countChar(val) {
    var len = val.value.length;
    $('#messageCounter').text(len);
}
