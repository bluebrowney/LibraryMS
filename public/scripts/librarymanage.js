
// Function to display data
function process_search(data) {
const container = document.getElementById("librarian-table");

// Create a table
// Create table body
const tbody = document.createElement("tbody");
data.forEach((item, index) => {
    const row = document.createElement("tr")
    row.className = "row";
    row.style.backgroundColor = "rgb(200, 200, 200)";

    
    row.innerHTML = `
        <td>${item.fname}</td>
        <td>${item.lname}</td>
        <td>${item.email}</td>
        <td>${item.phonenumber}</td>
        <td>${item.Salary}</td>
        <td><button onclick = () => openModal(${index},${item})>Edit</button></td>
    `
    container.appendChild(row);
});
container.appendChild(tbody);
}

function openModal(index,item) {
    const modal =document.getElementById('edit-librarian');
    const first = document.getElementById('fname')
    const middle = document.getElementById('midinit')
    const last = document.getElementById('lname')
    const email = document.getElementById('email')
    const pn = document.getElementById('phonenumber')
    const password = document.getElementById('pword')
    const salary = document.getElementById('Salary')

    modal.showModal();
    
    first.value = item.fname;
    middle.value = item.midinit;
    last.value = item.lname;
    email.value =item.email;
    pn.value = item.phonumber;
    password.value = item.pword;
    salary.value = item.Salary;
}

