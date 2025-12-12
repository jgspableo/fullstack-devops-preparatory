//COMMENTS BY GEMINI

// ==========================================
// NAVIGATION & PAGE HANDLING
// ==========================================

// Function to switch between pages (Home, About, Contact)
function showPage(pageId) {
    // 1. Select all elements with the class 'pageSection'
    const pages = document.querySelectorAll(".pageSection");
    
    // 2. Hide all pages by removing the 'active' class
    pages.forEach((page) => {
        page.classList.remove("active");
    });
    
    // 3. Show the specific page the user clicked on
    const pageActive = document.getElementById(pageId);
    pageActive.classList.add("active");

    // 4. Good UX: Clear any old search results when switching tabs
    clearResults();
}

// ==========================================
// SEARCH LOGIC
// ==========================================

// Main function triggered by the 'Search' button
function updateResults() {
    // 1. Get the user input, remove extra spaces, and make it lowercase for easier matching
    const input = document.getElementById("searchBar").value.trim().toLowerCase();
    const resultDiv = document.getElementById('searchResultsDiv');
    
    // 2. Clear previous results immediately so they don't stack up
    resultDiv.innerHTML = ''; 

    // 3. Fetch the data from the local JSON API file
    const url = './travel_recommendation_api.json';
    fetch(url)
        .then(response => response.json()) // Convert text response to JSON object
        .then(data => {
            console.log("Data received:", data); // Debugging: See what data we got

            // --- KEYWORD SEARCH LOGIC ---

            // Case A: User searches for "beach" or "beaches"
            if (input.includes('beach')) {
                displayResults(data.beaches);
            }
            
            // Case B: User searches for "temple" or "temples"
            else if (input.includes('temple')) {
                displayResults(data.temples);
            }
            
            // --- SPECIFIC DESTINATION SEARCH LOGIC ---
            else {
                // Case C: User searches for a COUNTRY (e.g., "Japan", "Australia")
                // We use .find() because we expect only one country match
                const country = data.countries.find(item => item.name.toLowerCase() === input);

                if (country) {
                    // If a country is found, display ALL cities inside that country
                    displayResults(country.cities);
                } 
                else {
                    // Case D: User might have searched for a specific CITY (e.g., "Tokyo")
                    // Since cities are nested INSIDE countries, we must loop through all countries to find it.
                    
                    const foundCities = []; // Array to hold any matching cities we find

                    data.countries.forEach(country => {
                         // We use .filter() here. If the user typed "Tokyo", it finds that specific object.
                         const matchingCities = country.cities.filter(city => city.name.toLowerCase().includes(input));
                         
                         // Add any matches found in this country to our master list
                         foundCities.push(...matchingCities);
                    });

                    // If we found any cities, display them
                    if (foundCities.length > 0) {
                        displayResults(foundCities);
                    } else {
                        // If we found nothing (no country, no city, no keyword)
                        resultDiv.innerHTML = "<p style='color: white; font-size: 1.2rem;'>No results found.</p>";
                    }
                }
            }
        })
        .catch(error => console.error('Error:', error)); // Log any fetch errors
}

// ==========================================
// UI / DOM MANIPULATION
// ==========================================

// Helper function to render the HTML cards
function displayResults(items) {
    const container = document.getElementById('searchResultsDiv');
    container.innerHTML = ''; // Ensure container is clean

    // Loop through the data (items) and create HTML for each one
    items.forEach(item => {
        const cardHTML = `
            <div class="recommendation-card">
                <img src="${item.imageUrl}" alt="${item.name}">
                <div class="card-content">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <button class="btn-visit">Visit</button>
                </div>
            </div>
        `;
        // Append the new card to the container
        container.innerHTML += cardHTML;
    });
}

// Utility function to clear results manually (e.g., via a Clear button)
function clearResults() {
    const resultDiv = document.getElementById('searchResultsDiv');
    resultDiv.innerHTML = "";
}