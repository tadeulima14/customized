// This code does NOT create any global variables.
// Promises can be chained together, with the previous promise
// passing its results to the next one in the chain.
// The format is: fetch().then().then().catch()
// It's easier to read if we put each step in its own line,
// that's why the periods start the then lines.

fetch("houses.json")
    .then((response) => response.json())
    .then((data) => {
        // Populate the dropdown with the house names
        const dropdown = document.getElementById("house-dropdown");
        data.forEach((house) => {
            let option = document.createElement("option");
            option.value = house.code;
            option.text = house.name; 
            dropdown.appendChild(option);
        });

        // Event listener for the dropdown
        dropdown.addEventListener("change", (e) => {
            const selectedHouse = e.target.value;
            const container = document.querySelector("#container");
            container.innerHTML = ""; // Clear previous content

            // Find the selected house in the data
            const selectedData = data.find((house) => house.code === selectedHouse);

            // Display the members of the selected house
            if (selectedData) {
                let html = "<dl class='house-members'>";
                selectedData.members.forEach((member) => {
                    html += `<dt class='member-name'>Member:</dt><dd class='member-info'>${member}</dd>`;
                });
                html+= "</dl>";
                container.innerHTML = html;
            }
        }); // end of event listener func

                    //fetch color from API
                    fetch("https://www.colr.org/json/color/random") // needs to be outside of event listener or -
                    .then((response) => response.json()) // page will not initialize with color chnage, only when dropdown value is changed
                    .then((colorData) => {
                        const randomColor = colorData.colors[0].hex;
                        console.log('Random Color:', randomColor);
                        document.body.style.backgroundColor= `#${randomColor}`;
                    })
                    .catch((error) => console.error("Error fetching random color", error));
                    fetchAndChangeColor();
    })
    .catch((err) => console.log("Oops!", err));
// This only runs if there is an error during the above process
