$(document).ready(function() {
    console.log('getting data from google sheet');

    $.ajax({
        url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRdr4wyGHoaFMARJYIznB0Su7gm6GqXAVIUmKOYCKHKPHgdervwsCbxORAsMhuR6aagpTWNubadYRPT/pub?output=csv",
        dataType: "text",  // Fetch the data as plain text
        success: function(csvData) {
            // Parse CSV Data
            var rows = csvData.split("\n"); // Split into rows
            var headers = rows.shift().split(","); // Extract and remove header row
            headers[headers.length - 1] = headers[headers.length - 1].trim();
            var dataArray = [];
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i].split(","); // Split row into cells
                var obj = {}; // Create an object for the current row
                for (var j = 0; j < headers.length; j++) {
                    obj[headers[j]] = row[j]; // Assign cell values to object keys
                }
                dataArray.push(obj); // Add the row object to the data array
            }

            // Convert to JSON and Output
            var jsonData = JSON.stringify(dataArray);
            console.log(jsonData); // Log the JSON object to the console

            dataArray.forEach(function(item, idx, array) {
                console.log(item);
                var eventHtml = '';

                eventHtml += '<li>';

                var linkHtml = '';

                if(item.Link.trim() !== '') {
                    linkHtml = ' | <a href="' + item.Link.trim() + '" class="fas fa-link" style="border-bottom: none !important;" target="_blank"></a>';
                } 
                
                eventHtml += '<p>' + item.Title.trim() + ' | ' + item.Date.trim() + linkHtml + '</p>';
                
                eventHtml += '<p>' + item.Description.trim() + '</p>';
                
                eventHtml += '</li>';

                if (idx !== array.length - 1) {
                    eventHtml += '<div class="break"></div>';
                }
                
                $('#events').append(eventHtml);
            });
        },
        error: function(xhr, textStatus, errorThrown) {
            console.error("Error fetching CSV data:", errorThrown);
        }
    });
}); 
