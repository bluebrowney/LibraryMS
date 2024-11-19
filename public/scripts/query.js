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

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const role = params.get('role');
    const id = params.get('id');

    if (role && id) {
        document.querySelectorAll('a').forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('/')) {
                link.setAttribute('href', `${href}?role=${role}&id=${id}`);
            }
        });
    }
});
