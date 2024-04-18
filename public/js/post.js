try {
    for (let i = 1; i < 200; i++){
        try {
            document.querySelector(`#post${i}`).addEventListener('click', (event) => {

                event.preventDefault();

                document.location.replace(`/post/${i}`);
            });
        } catch (err) {console.log(err)}
    }
} catch (err) {console.log(err)}