document.currentScript.dataset.following;
// try {
//     let id = document.currentScript.dataset.following;
// } catch (err) {
//     console.log(err)
//     id = document.currentScript.dataset.following;
// }
(() => {
    let id = document.currentScript.dataset.following;
    document.getElementById("following" + id)
    .addEventListener('click', (event) => {
        
        event.preventDefault();
        document.location = `/profile/${id}`;
    });
})()