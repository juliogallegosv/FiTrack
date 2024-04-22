(() => {
    let id = document.currentScript.dataset.post;
    document.getElementById("post" + id).addEventListener('click', (event) => {
        event.preventDefault();
        document.location = `/post/${id}`;
    });
})()