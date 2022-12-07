import { fetchPics } from "./js/axios";
import Notiflix from 'notiflix';



const ref = {
    inpElem: document.querySelector(".js-input"),
    butElem: document.querySelector(".js-button"),
    gallery: document.querySelector(".js-gallery"),
    loadElem: document.querySelector(".js-load"),
}
ref.loadElem.style.display = 'none';
let page = 1;
let total = 0;

ref.butElem.addEventListener("click", onClickButton);
ref.loadElem.addEventListener("click", onLoad)

function onClickButton(e) {
    page = 1;
    total = 0;
    e.preventDefault();
    if (ref.inpElem.value == "") {
        Notiflix.Notify.success('Empty string');
        ref.gallery.innerHTML = "";
        ref.loadElem.style.display = 'none';
        return
    }
    console.log(ref.inpElem.value);
    fetchPics(ref.inpElem.value)
        .then(data => {
            total = 0;
            console.log(data);
            total += data.hits.length;
            console.log(data.totalHits);
            if (data.total == 0) {
                Notiflix.Notify.success('"Sorry, there are no images matching your search query. Please try again."');
                ref.gallery.innerHTML = "";
            }
            ref.gallery.innerHTML = "";
            ref.gallery.insertAdjacentHTML("beforeend", createMarkupInfo(data.hits));
            if (total === Number(data.totalHits)) {
                Notiflix.Notify.success("We're sorry, but you've reached the end of search results.");
                ref.loadElem.style.display = 'none';
            } else {
                ref.loadElem.style.display = 'block';    
            }
            //console.log(createMarkupInfo(data.hits));
        })
        .catch(err => {
            console.log(err);
            Notiflix.Notify.success('Sol lucet omnibus');
            ref.gallery.innerHTML = "";
        })
}

function createMarkupInfo(arr) {
    //const values = Object.values(arr.languages);
    //console.log(arr.languages);
    return arr.map(({ webformatURL, tags, likes, views, comments, downloads }) => `
    <div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
            <p class="info-item">
                <b>likes</b>${likes}
            </p>
            <p class="info-item">
                <b>Views</b>${views}
            </p>
            <p class="info-item">
                <b>Comments</b>${comments}
            </p>
            <p class="info-item">
                <b>Downloads</b>${downloads}
            </p>
        </div>
    </div>`).join("");
}

function onLoad() {
    page += 1;
    ref.loadElem.style.display = 'none';
    fetchPics(ref.inpElem.value, page)
        .then(data => {
            console.log(data);
            total += data.hits.length;
            if (data.total == 0) {
                Notiflix.Notify.success('"Sorry, there are no images matching your search query. Please try again."');
                ref.gallery.innerHTML = "";
            }
            ref.gallery.insertAdjacentHTML("beforeend", createMarkupInfo(data.hits));
            //console.log(createMarkupInfo(data.hits));
            if (total === Number(data.totalHits)) {
                ref.loadElem.style.display = 'none';
                Notiflix.Notify.success("We're sorry, but you've reached the end of search results.");
            } else {
                ref.loadElem.style.display = 'block';
            }
        })
        .catch(err => {
            console.log(err);
            Notiflix.Notify.success('Sol lucet omnibus');
            ref.gallery.innerHTML = "";
        })
}

