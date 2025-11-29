import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
let lightbox;

export function initLightbox() {
  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  }
}

export function clearGallery() {
  if (gallery) {
    gallery.innerHTML = '';
  }
}

export function createGallery(images) {
  if (!gallery) {
    console.error('Gallery element not found');
    return;
  }

  const markup = images
    .map(
      image => `
    <li class="gallery-item">
      <a href="${image.largeImageURL}">
        <img 
          src="${image.webformatURL}" 
          alt="${image.tags}" 
          class="gallery-image"
        />
      </a>
      <div class="gallery-info">
        <p class="info-item">
          <b>Likes</b>
          ${image.likes}
        </p>
        <p class="info-item">
          <b>Views</b>
          ${image.views}
        </p>
        <p class="info-item">
          <b>Comments</b>
          ${image.comments}
        </p>
        <p class="info-item">
          <b>Downloads</b>
          ${image.downloads}
        </p>
      </div>
    </li>
  `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  if (lightbox) {
    lightbox.refresh();
  } else {
    initLightbox();
  }
}

export function showLoader() {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.style.display = 'inline-block';
  }
}

// Приховати індикатор завантаження
export function hideLoader() {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.style.display = 'none';
  }
}

