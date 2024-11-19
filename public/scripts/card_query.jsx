  // Function to display data
  function process_search(data) {
    const container = document.getElementById("data-display");
    container.innerHTML = "";

    // Create a table
    // Create table body
    const tbody = document.createElement("tbody");
    data.forEach((item, index) => {
        const card = document.createElement("div")
        card.className = "card";
        card.style.backgroundColor = "rgb(200, 200, 200)";
    
        // Determine type (Book or Movie)
        const title = item.Title
        const type = item.ISBN ? "Book" : "Movie";
        const publisherOrStudio = item.Publisher || item.Studio;
        const additionalInfo = item.Page_Count
            ? `Pages: ${item.Page_Count}`
            : `Runtime: ${item.Runtime} mins`;
    
        card.innerHTML = `
            <h3>${title}</h3>
            <p>Genre: ${item.Genre}</p>
            <p>Type: ${type}</p>
            <p>Publisher/Studio: ${publisherOrStudio}</p>
            <p>Aditional Info: ${additionalInfo}</p>
            <p>Available:${item.Available_Ct}</p>
        `
      container.appendChild(card);
    });
  
    // Append table to the container
  }
 