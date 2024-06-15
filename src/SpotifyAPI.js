// helper function to convert formData to url encoded string

function formDataToUrlEncoded(formData) {
    const urlSearchParams = new URLSearchParams();
    for (const [key, value] of formData.entries()) {
        urlSearchParams.append(key, value);
    }
    return urlSearchParams.toString();
}

const requestAccessToken = async (name) => {
    const endpoint = 'https://accounts.spotify.com/api/token';

    const formData = new FormData();

    formData.append('grant_type', 'client_credentials');
    formData.append('client_id', '5bae8be03e854222bdac1b898827ba3c');
    formData.append('client_secret', 'e2f1be0ae0c041b8930da98fb932061f');

    try {
        const res = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formDataToUrlEncoded(formData)
        });

        if (!res.ok) {
            throw new Error('error while fetching new token.');
        }

        const data = await res.json();

        localStorage.setItem('spotify-token', data.access_token);
    } catch (error) {
        console.log(error);
    }
};

const loadTracksByName = async (name) => {
    
    const endpoint = 'https://api.spotify.com/v1/search?q=' + encodeURI(name) + '&type=track&limit=4&include_external=audio';
    
    const token = localStorage.getItem('spotify-token');

    try {
        const res = await fetch(endpoint, {
            headers: { Authorization: 'Bearer ' + token }
        });

        if (!res.ok) {
            throw new Error('unauthorized to fetch tracks, fetching a new token...');
        }

        const data = await res.json();
        return data.tracks.items;
    } catch (error) {
        console.log(error);
        requestAccessToken(name);
        return [];
    }
};

export default { loadTracksByName };