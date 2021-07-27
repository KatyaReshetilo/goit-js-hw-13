
const axios = require('axios').default;
import Notiflix from "notiflix";
const searchFormUrl= document.querySelector('#search-form');
const galleryUrl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');


searchFormUrl.addEventListener('submit', onSearchFormUrlSubmit);
loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

class SearchPhoto {
  constructor() {
    this.page = 1;
    this.name = '';
  }

  
async getImg() {
  try {
    
    const url = 'https://pixabay.com/api';
    const key = 'key=22670946-2b796d5e22242051989a80e4c';
    const response = await axios.get(`${url}/?${key}&q=${this.name}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`);
    const photos = await response.data.hits;
    
    if (photos.length === 0) {
      loadMoreBtn.classList.add('is-hidden');
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
      
  }


    

    if(photos.length < 40){
      Notiflix.Notify.failure(`We're sorry, but you've reached the end of search results.`)
    }
    this.incrementPage();
   
    renderImgCard(photos)
      
  } catch (error) {

  }
}
  incrementPage() {
    this.page += 1;
  } 

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.name;
  }

 set query(newQuery) {
  this.name = newQuery;
  }

}

loadMoreBtn.classList.add('is-hidden');


const searchPhoto = new SearchPhoto();

async function onSearchFormUrlSubmit(e) {
    e.preventDefault();
  searchPhoto.query = await e.currentTarget.elements.searchQuery.value;



   if (searchPhoto.query === "") {
     galleryUrl.innerHTML = " ";
     loadMoreBtn.classList.add('is-hidden');
        return
   }
  galleryUrl.innerHTML = " ";
  searchPhoto.resetPage();
  searchPhoto.getImg();
  loadMoreBtn.classList.remove('is-hidden');
    
}


async function onLoadMoreBtnClick() {
 searchPhoto.getImg() 
}

  


function renderImgCard(photos) {
    const markupList =  photos.map((photo) => {
            return   `<div class="photo-card">
  <img src='${photo.webformatURL}' alt="${photo.tags}" loading="lazy" width='300px' heigth='250px' />
  <div class="info">
    <p class="info-item">
      <b> Likes ${photo.likes}</b>
    </p>
    <p class="info-item">
      <b> Views ${photo.views}</b>
    </p>
    <p class="info-item">
      <b> Comments ${photo.comments}</b>
    </p>
    <p class="info-item">
      <b> Downloads ${photo.downloads}</b>
    </p>
  </div>
</div> `
    }
    ).join("");
  galleryUrl.insertAdjacentHTML('beforeend', markupList);

    
}


// import axios from "axios";

// const formEl = document.querySelector('.search-form');
// const searchFormInput = document.querySelector('#search-form');
// const gallery = document.querySelector(".gallery");

// formEl.addEventListener('submit', findPhoto);
// function findPhoto(e) {
//     e.preventDefault();

//     return fetchPhotos(e.currentTarget.elements.searchQuery.value);
//  }

// function fetchPhotos(name) {
//    return axios({
//         method: "GET",
//         url: "https://pixabay.com/api/",
//         params: {
//             key: "22673335-b99cca5659da707c56ab45ca0",
//             q: name,
//             image_type: "photo",
//             orientation: "horizontal",
//             safesearch: "true"
//         }
//    }).then(response => {
//        response.data.hits.forEach(element => {
//            const text = `<div class="photo-card">
//   <img src="${element.webformatURL}" alt="" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>Likes: ${element.likes}</b>
//     </p>
//     <p class="info-item">
//       <b>Views: ${element.views}</b>
//     </p>
//     <p class="info-item">
//       <b>Comments: ${element.comments}</b>
//     </p>
//     <p class="info-item">
//       <b>Downloads: ${element.downloads}</b>
//     </p>
//   </div>
// </div>`;
//       gallery.insertAdjacentHTML('beforeend', text);
//        });
      
//    });
// };


 
