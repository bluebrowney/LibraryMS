  console.log(user);
  
  function openModal(index, item, type) {
    const modal = document.getElementById("editModal");

    document.getElementById("editTitle").value = item.Title || "";
    document.getElementById("editGenre").value = item.Genre || "";
    document.getElementById("editPrice").value = item.Price || "";
    document.getElementById("editAvailable").value = item.Available_Ct || 0;
    document.getElementById("editLeased").value = item.Leased_Ct || 0;
    document.getElementById("editRequests").value = item.Request_Ct || 0;

    if(type == "Book") {
        document.querySelector(".book_form").style.display = "inline-block";
        document.querySelector(".movie_form").style.display = "none";

        document.getElementById("editNum_pages").value = item.Page_Count || "";
        document.getElementById("editPublisher").value = item.Publisher || "";
        document.getElementById("editIsbn").value = item.ISBN || "";
    } else {
        document.querySelector(".book_form").style.display = "none";
        document.querySelector(".movie_form").style.display = "inline-block";

        document.getElementById("editRating").value = item.Rating || "";
        document.getElementById("editIsan").value = item.ISAN || "";
        document.getElementById("editRuntime").value = item.Runtime || "";
        document.getElementById("editStudio").value = item.Studio || "";
        
    }
  
    modal.style.display = "flex";
  
    // Save the index of the item being edited
    modal.dataset.editIndex = index;
  }
  
  // Function to close the modal
  function closeModal() {
    const modal = document.getElementById("editModal");
    modal.style.display = "none";
  }
  
  // Function to save changes
  function saveChanges() {
    const modal = document.getElementById("editModal");
    const index = modal.dataset.editIndex;
  
    const updatedData = {
      title: document.getElementById("editTitle").value,
      genre: document.getElementById("editGenre").value,
      price: document.getElementById("editPrice").value,
      avail: document.getElementById("editAvailable").value || 0,
      lease: document.getElementById("editLeased").value || 0,
      requests: document.getElementById("editRequests").value || 0,
      num_pages:  document.getElementById("editNum_pages").value || undefined,
      publisher: document.getElementById("editPublisher").value || undefined,
      isbn: document.getElementById("editIsbn").value || undefined,
      rating: document.getElementById("editRating").value || undefined,
      isan: document.getElementById("editIsan").value || undefined,
      runtime: document.getElementById("editRuntime").value || undefined,
      studio: document.getElementById("editStudio").value || undefined,
    };

    fetch("http://localhost:3000/api/update_product", {
        method: 'POST',
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify({ ...updatedData })
      }
    ).then( response => {
      if(!response.ok) {
        throw new Error("Server Error", response.statusText);
      }

      if (response.headers.get('Content-Type').includes('application/json')) {
        return response.json();
      } else {
        throw new Error("ERROR: Corrupted Data");
      }

    })
    .then(response => {

      if(document.querySelector('#noti') == undefined) {
        noti = document.createElement('p')
        noti.innerText = response.msg,
        noti.id = "noti";
        noti.style.color = response.color,
        document.querySelector('form').prepend(noti);
      }
      
    })
    .catch(err => {
      console.log(err);
    });
  
    closeModal();
  }

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
        if(user.is_librarian) {
          const editButton = document.createElement("button");
          editButton.textContent = "Edit";
          editButton.onclick = () => openModal(index, item, type);
          card.appendChild(editButton);
        }

      container.appendChild(card);
    });
  }
 