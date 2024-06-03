$(document).ready(function() {
    console.log('getting data from google sheet');
    const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRdr4wyGHoaFMARJYIznB0Su7gm6GqXAVIUmKOYCKHKPHgdervwsCbxORAsMhuR6aagpTWNubadYRPT/pub?output=csv';
//https://docs.google.com/spreadsheets/d/e/2PACX-1vRdr4wyGHoaFMARJYIznB0Su7gm6GqXAVIUmKOYCKHKPHgdervwsCbxORAsMhuR6aagpTWNubadYRPT/pubhtml

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

            dataArray.forEach(item => {
                console.log(item);
                $('#events').append(`
                    <li>
                      <h2>${item.Title}</h2>
                      <p>${item.Date}</p>
                      <p>${item.Description}</p>
                    </li>
                `);
            });
        },
        error: function(xhr, textStatus, errorThrown) {
            console.error("Error fetching CSV data:", errorThrown);
        }
    });
    
    $.getJSON(url, data => {
        console.log(data.feed.entry);

        data.feed.entry.forEach(item => {
            const post = {
                date: item['gsx$Date']['$t'],
                title: item['gsx$Title']['$t'],
                description: item['gsx$Description']['$t'],
            };

            $('#events').append(`
        <li>
          <h2>${post.title}</h2>
          <p>${post.date}</p>
          <p>${post.description}</p>
        </li>
    `);
        });
    });
}); 
