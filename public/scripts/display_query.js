  // Function to display data
  function process_search(data) {
    const container = document.getElementById("data-display");
    container.innerHTML = "";

    // Create a table
    const table = document.createElement("table");
    table.border = "1";
    table.className = "data-table";
  
    // Create table headers
    const headers = [
      "Title",
      "Genre",
      "Price",
      "Available",
      "Leased",
      "Requests",
      "Type",
      "Publisher/Studio",
      "Additional Info",
      "Actions",
    ];
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    headers.forEach((header) => {
      const th = document.createElement("th");
      th.textContent = header;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);
  
    // Create table body
    const tbody = document.createElement("tbody");
    data.forEach((item, index) => {
      const row = document.createElement("tr");
  
      // Determine type (Book or Movie)
      const type = item.ISBN ? "Book" : "Movie";
      const title = item.Title
      const publisherOrStudio = item.Publisher || item.Studio;
      const additionalInfo = item.Page_Count
        ? `Pages: ${item.Page_Count}`
        : `Runtime: ${item.Runtime} mins`;
  
      // Create cells
      const cells = [
        title || "N/A",
        item.Genre || "N/A",
        `$${item.Price}`,
        item.Available_Ct,
        item.Leased_Ct,
        item.Request_Ct,
        type,
        publisherOrStudio || "N/A",
        additionalInfo,
      ];
  
      cells.forEach((cellData) => {
        const td = document.createElement("td");
        td.textContent = cellData;
        row.appendChild(td);
      });
  
      // Add Edit Button
      const actionTd = document.createElement("td");
      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.onclick = () => openModal(index, item, type);
      actionTd.appendChild(editButton);
      row.appendChild(actionTd);
  
      tbody.appendChild(row);
    });
    table.appendChild(tbody);
  
    // Append table to the container
    container.appendChild(table);
  }
  
  // Function to open the modal with pre-filled data
 