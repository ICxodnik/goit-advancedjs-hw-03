import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_5FA0xN73jhAfs5YnYFOVtRKAAswWoWlfNu9XZk7AVKIXcsy0uqheAdd7iccnt3Yk";

export function fetchBreeds() {
    return axios.get("https://api.thecatapi.com/v1/breeds").then(resp => {
        return resp.data.map(item => ({
            value: item.id,
            text: item.name,
        }));
    });
}

export function fetchCatByBreed(id) {
    return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${id}`).then(resp => {
        const data = resp.data[0];
        return {
            url: data.url,
            id: data.breeds[0].id,
            name: data.breeds[0].name,
            temperament: data.breeds[0].temperament,
            description: data.breeds[0].description,
        };
    });
}



