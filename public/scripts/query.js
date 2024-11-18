let form = document.querySelector('form');

let data = {}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const query = new FormData(form);
    const query_str = new URLSearchParams(query).toString();

    console.log(`${form.action}?${query_str}`)
    fetch(`${form.action}?${query_str}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
             /*DEFINE IN SCRIPT TAG ABOVE THE QUERY IMPORT*/
            if(process_search == undefined) {
                console.log("Define the function process_search that has a single parameter for the data returned from a query of a form")
            }

            process_search(data);
        })
})