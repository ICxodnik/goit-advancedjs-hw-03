import SlimSelect from "slim-select";
import { fetchBreeds, fetchCatByBreed } from "./cat-api";

const errorRef = document.getElementById("error");
const loaderRef = document.getElementById("loader");
const selectorRef = document.getElementById("breed-select");
const infoRef = document.getElementById("cat-info");
const catImage = infoRef.querySelector("img");
const catName = infoRef.querySelector(".details > .name");
const catDesc = infoRef.querySelector(".details > .description");
const catTemp = infoRef.querySelector(".details .temperament");

window.addEventListener("error", showError);
displayBreeds();

function showError() {
    errorRef.classList.remove("hidden");
    return true;
};

function hideError() {
    errorRef.classList.add("hidden");
    return true;
};

function showLoader() {
    loaderRef.classList.remove("hidden");
    return true;
};

function hideLoader() {
    loaderRef.classList.add("hidden");
    return true;
};

function showInfo() {
    infoRef.classList.remove("hidden");
    return true;
};

function hideInfo() {
    infoRef.classList.add("hidden");
    return true;
};

function showBreedSelector() {
    selectorRef.classList.remove("hidden");
    return true;
};

const selectCtrl = new SlimSelect({
    select: "select.breed-select",
    settings: {
        placeholderText: 'Please select a breed',
    },
    events: {
        afterChange: (newVal) => {
            hideError();
            const value = newVal[0].value;
            if (!value) {
                return;
            }
            displayDetails(value);
        }
    }
});

async function displayDetails(catId) {
    hideInfo()
    showLoader();
    try {
        const details = await fetchCatByBreed(catId);

        catImage.src = details.url;
        catImage.alt = details.name;
        catName.textContent = details.name;
        catDesc.textContent = details.description;
        catTemp.textContent = details.temperament;
        showInfo()
    }
    catch (e) {
        showError();
    }
    finally {
        hideLoader();
    }
}

async function displayBreeds() {
    try {
        const data = await fetchBreeds();
        data.unshift({ value: "", text: "Please chooose your cat", placeholder: true });
        selectCtrl.setData(data);
        showBreedSelector();
    }
    catch (e) {
        showError();
    }
    finally {
        hideLoader();
    }
}


