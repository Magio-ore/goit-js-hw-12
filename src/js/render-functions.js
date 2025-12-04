import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

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
  
  if (lightbox) {
    lightbox.destroy();
    lightbox = null;
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

export function hideLoader() {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.style.display = 'none';
  }
}

export function showLoadMoreButton() {
  const loadMoreBtn = document.querySelector('.load-more-btn');
  if (loadMoreBtn) {
    loadMoreBtn.style.display = 'block';
  }
}

export function hideLoadMoreButton() {
  const loadMoreBtn = document.querySelector('.load-more-btn');
  if (loadMoreBtn) {
    loadMoreBtn.style.display = 'none';
  }
}

export function showEndMessage() {
  const endMessage = document.querySelector('.end-message');
  if (endMessage) {
    endMessage.style.display = 'block';
  }
}

export function hideEndMessage() {
  const endMessage = document.querySelector('.end-message');
  if (endMessage) {
    endMessage.style.display = 'none';
  }
}

export function showEndOfResultsNotification() {
  hideLoadMoreButton();
  showEndMessage();
  iziToast.info({
    title: 'Info',
    message: "We're sorry, but you've reached the end of search results.",
    position: 'topRight',
  });
}

export function showEmptyQueryError() {
  iziToast.warning({
    title: 'Warning',
    message: 'Please enter a search query.',
    position: 'topRight',
  });
}

export function scrollToNewImages(itemsBeforeCount) {
  const gallery = document.querySelector('.gallery');
  if (!gallery) return;

  const galleryItemsBefore = itemsBeforeCount || 0;
  const newItems = gallery.querySelectorAll('.gallery-item');
  
  if (newItems.length > galleryItemsBefore && newItems.length > 0) {
    const firstNewItem = newItems[galleryItemsBefore];
    if (firstNewItem) {
      const rect = firstNewItem.getBoundingClientRect();
      const cardHeight = rect.height;
      
      if (cardHeight > 0) {
        window.scrollBy({
          top: cardHeight * 2,
          behavior: 'smooth',
        });
      }
    }
  }
}

export function getGalleryItemsCount() {
  const gallery = document.querySelector('.gallery');
  return gallery ? gallery.querySelectorAll('.gallery-item').length : 0;
}
