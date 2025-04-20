// Check if the document is still loading
if (document.readyState === "loading") {
    // If loading, add event listener for 'DOMContentLoaded' event to populate the table rows
    document.addEventListener("DOMContentLoaded", populateTableRows);
} else {
    // If DOM is already loaded, call populateTableRows directly
    populateTableRows();
}

// Capitalize the first letter of a string
capitalize = s => s && s[0].toUpperCase() + s.slice(1);

// Function to fetch weather data and populate table rows with the results
async function populateTableRows() { 
    // Fetch weather data from OpenWeatherMap API for Dhaka, Bangladesh
    await fetch('https://api.openweathermap.org/data/2.5/weather?q=dhaka,bd&units=metric&APPID=bc425ac2188d406c884f4fdd88b339f0')
    
    .then(response => {
        // Check if the response status is not 200 (error)
        if (response.status !== 200) {
            console.log('Error Status Code: ' + response.status); // Log error if status is not 200
            return;
        }
        // Process the response data if the request was successful
        response.json().then((data) => {    
            // Log the data to verify if it's received correctly
            console.log(data);

            // Create table rows with weather data
            let strTableRows = `<tr>
                <td><span>Summary</span></td>
                <td>${capitalize(data["weather"][0]["description"])}</td>
            </tr>
            <tr>
                <td><span>Temperature</span></td>
                <td>${data["main"]["temp"] + "°C"}</td>
            </tr>
            <tr>
                <td><span>Humidity</span></td>
                <td>${data["main"]["humidity"] + " %"}</td>
            </tr>
            <tr>
                <td><span>Pressure</span></td>
                <td>${data["main"]["pressure"] + " Pa"}</td>
            </tr>`;

            // Inject the generated rows into the table with id "table-weather-dublin"
            document.querySelector("#table-weather-dublin tbody").innerHTML = strTableRows;
        });
    })
    .catch(error => {
        // Handle any error that might occur during the fetch process
        console.log('Error occurred during fetch:', error);
    });
}

// Function to fetch other data (example with a placeholder API, currently unused)
async function fetchSomeData() {
    await fetch('https://apinnnnn.com/folders/parameters')
 
    .then(response => {
        // Check if the response status is not 200 (error)
        if (response.status !== 200) {
            console.log('Error Status Code: ' + response.status); // Log error if status is not 200
            return;
        }
        // Process the response data if the request was successful
        response.json().then((data) => {
            // Extract and display data from the response here
            // Example: Display data on the webpage (currently unused)
        });
    })
    .catch(error => {
        // Handle any error that might occur during the fetch process
        console.log('Error occurred during fetch:', error);
    });
}

// Function to change the background image based on the time of day
function change_background() {
    let d = new Date(); // Get the current date and time
    let n = d.getHours(); // Get the current hour

    // If the current time is between 12 AM and 6 AM (night)
    if (n > 23 || n <= 6) {
        document.querySelector(".theme-js").style.backgroundImage  = "url('assets/img/dublin-night.jpg')"; // Set night background image
    } else {
        // Otherwise, set day background image
        document.querySelector(".theme-js").style.backgroundImage  = "url('assets/img/dublin-day.jpg')";
    }
}

// Call the change_background function to set the initial background based on the current time
change_background();
