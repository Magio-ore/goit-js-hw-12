import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  showEndMessage,
  hideEndMessage,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const searchInput = document.querySelector('input[name="search-text"]');
  const loadMoreBtn = document.querySelector('.load-more-btn');

  let currentPage = 1;
  let currentQuery = '';
  let totalPages = 0;

  const loadImages = async (query, page) => {
    try {
      showLoader();
      const data = await getImagesByQuery(query, page);

      hideLoader();

      if (!data.hits || data.hits.length === 0) {
        if (page === 1) {
          iziToast.error({
            title: 'Error',
            message:
              'Sorry, there are no images matching your search query. Please try again!',
            position: 'topRight',
          });
        }
        return null;
      }

      createGallery(data.hits);

      const totalHits = data.totalHits || 0;
      totalPages = Math.ceil(totalHits / 15);

      return {
        hits: data.hits,
        totalHits,
        totalPages,
      };
    } catch (error) {
      hideLoader();
      iziToast.error({
        title: 'Error',
        message: 'Failed to fetch images. Please try again later.',
        position: 'topRight',
      });
      console.error('Error fetching images:', error);
      return null;
    }
  };

  const handleFormSubmit = async e => {
    e.preventDefault();

    const query = searchInput.value.trim();

    if (!query) {
      return;
    }

    currentQuery = query;
    currentPage = 1;
    totalPages = 0;

    clearGallery();
    hideLoadMoreButton();
    hideEndMessage();

    const result = await loadImages(query, currentPage);

    if (result && result.hits.length > 0) {
      if (currentPage < totalPages) {
        showLoadMoreButton();
      } else {
        showEndMessage();
      }
    }
  };

  const handleLoadMore = async () => {
    const gallery = document.querySelector('.gallery');
    const galleryItemsBefore = gallery
      ? gallery.querySelectorAll('.gallery-item').length
      : 0;

    currentPage += 1;

    const result = await loadImages(currentQuery, currentPage);

    if (result) {
      if (currentPage >= totalPages) {
        hideLoadMoreButton();
        showEndMessage();
      }

      if (gallery && galleryItemsBefore > 0) {
        const newItems = gallery.querySelectorAll('.gallery-item');
        if (newItems.length > galleryItemsBefore) {
          const firstNewItem = newItems[galleryItemsBefore];
          const rect = firstNewItem.getBoundingClientRect();
          const cardHeight = rect.height;
          
          window.scrollBy({
            top: cardHeight * 2,
            behavior: 'smooth',
          });
        }
      }
    }
  };

  form.addEventListener('submit', handleFormSubmit);

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', handleLoadMore);
  }
});