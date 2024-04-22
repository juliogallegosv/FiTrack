(() => {
    let id = document.currentScript.dataset.followers;
    document.getElementById("followers" + id)
    .addEventListener('click', (event) => {
        
        event.preventDefault();
        document.location = `/profile/${id}`;
    });
})()