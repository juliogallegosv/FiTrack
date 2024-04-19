const followFormHandler = async (event) => {
    event.preventDefault();

    const follow_id = window.location.href.split("/").at(-1); //Gets the profile id
    const response = await fetch(`/api/follow/`, { 
        method: 'POST',
        body: JSON.stringify({ follow_id }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        document.location.reload();
    }
};
try {
    document
        .querySelector('#followBtn')
        .addEventListener('click', followFormHandler);
} catch {}

const unfollowFormHandler = async (event) => {
    event.preventDefault();

    const follow_id = window.location.href.split("/").at(-1); //Gets the profile id
    const response = await fetch(`/api/follow/`, { 
        method: 'DELETE',
        body: JSON.stringify({ follow_id }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        document.location.reload();
    }
};
try {
    document
        .querySelector('#unfollowBtn')
        .addEventListener('click', unfollowFormHandler);
} catch {}