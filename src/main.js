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
  showEndOfResultsNotification,
  showEmptyQueryError,
  scrollToNewImages,
  getGalleryItemsCount,
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
      iziToast.error({
        title: 'Error',
        message: 'Failed to fetch images. Please try again later.',
        position: 'topRight',
      });
      console.error('Error fetching images:', error);
      return null;
    } finally {
      hideLoader();
    }
  };

  const handleFormSubmit = async e => {
    e.preventDefault();

    const query = searchInput.value.trim();

    if (!query) {
      showEmptyQueryError();
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
        showEndOfResultsNotification();
      }
    }
  };

  const handleLoadMore = async () => {
    hideLoadMoreButton();
    
    const galleryItemsBefore = getGalleryItemsCount();
    currentPage += 1;

    const result = await loadImages(currentQuery, currentPage);

    if (result) {
      if (currentPage >= totalPages) {
        showEndOfResultsNotification();
      } else {
        showLoadMoreButton();
      }

      if (galleryItemsBefore > 0) {
        scrollToNewImages(galleryItemsBefore);
      }
    } else {
      showLoadMoreButton();
    }
  };

  form.addEventListener('submit', handleFormSubmit);

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', handleLoadMore);
  }
});