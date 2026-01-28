import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImages } from './pixabay-api';
import { createGalleryMarkup } from './render-functions';
import './css/styles.css';

const formEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');

const searchLoaderEl = document.getElementById('searchLoader');
const loadMoreLoaderEl = document.getElementById('loadMoreLoader');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

let queryGlobal = '';
let page = 1;
const perPage = 40;
let totalHits = 0;

async function paintUI() {
  await new Promise(requestAnimationFrame);
}

function showSearchLoader() {
  if (!searchLoaderEl) return;
  searchLoaderEl.classList.add('is-visible');
}
function hideSearchLoader() {
  if (!searchLoaderEl) return;
  searchLoaderEl.classList.remove('is-visible');
}

function showLoadMoreLoader() {
  if (!loadMoreLoaderEl) return;
  loadMoreLoaderEl.classList.add('is-visible');
}
function hideLoadMoreLoader() {
  if (!loadMoreLoaderEl) return;
  loadMoreLoaderEl.classList.remove('is-visible');
}

function showLoadMore() {
  if (!loadMoreBtnEl) return;
  loadMoreBtnEl.classList.remove('is-hidden');
}
function hideLoadMore() {
  if (!loadMoreBtnEl) return;
  loadMoreBtnEl.classList.add('is-hidden');
}
function disableLoadMore() {
  if (!loadMoreBtnEl) return;
  loadMoreBtnEl.disabled = true;
}
function enableLoadMore() {
  if (!loadMoreBtnEl) return;
  loadMoreBtnEl.disabled = false;
}

function clearGallery() {
  galleryEl.innerHTML = '';
}

function notifyEmptyQuery() {
  iziToast.warning({
    message: 'Please enter a search query.',
    position: 'topRight',
  });
}
function notifyNoResults() {
  iziToast.info({
    message:
      'Sorry, there are no images matching your search query. Please try again!',
    position: 'topRight',
  });
}
function notifyError() {
  iziToast.error({
    message: 'Something went wrong. Please try again later.',
    position: 'topRight',
  });
}
function notifyEnd() {
  iziToast.info({
    message: "We're sorry, but you've reached the end of search results",
    position: 'topRight',
  });
}

function smoothScrollAfterAppend() {
  const firstCard = galleryEl.firstElementChild;
  if (!firstCard) return;

  const { height } = firstCard.getBoundingClientRect();
  window.scrollBy({ top: height * 2, behavior: 'smooth' });
}

async function runSearch(query) {
  showSearchLoader();
  hideLoadMore();
  await paintUI();

  try {
    const data = await fetchImages(query, page, perPage);
    totalHits = data.totalHits;

    if (!data.hits.length) {
      notifyNoResults();
      return;
    }

    const markup = createGalleryMarkup(data.hits);
    galleryEl.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();

    const totalPages = Math.ceil(totalHits / perPage);
    if (page < totalPages) showLoadMore();
    else {
      hideLoadMore();
      notifyEnd();
    }
  } catch {
    notifyError();
  } finally {
    hideSearchLoader();
  }
}

async function runLoadMore() {
  disableLoadMore();
  showLoadMoreLoader();
  await paintUI();

  try {
    const data = await fetchImages(queryGlobal, page, perPage);
    totalHits = data.totalHits;

    const markup = createGalleryMarkup(data.hits);
    galleryEl.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();

    const totalPages = Math.ceil(totalHits / perPage);
    if (page >= totalPages) {
      hideLoadMore();
      notifyEnd();
    }
  } catch {
    notifyError();
  } finally {
    hideLoadMoreLoader();
    enableLoadMore();
  }
}

formEl.addEventListener('submit', async e => {
  e.preventDefault();

  const query = e.currentTarget.elements.query.value.trim();
  if (!query) {
    clearGallery();
    hideLoadMore();
    hideSearchLoader();
    hideLoadMoreLoader();
    notifyEmptyQuery();
    return;
  }

  queryGlobal = query;
  page = 1;
  totalHits = 0;

  clearGallery();
  await runSearch(queryGlobal);

  formEl.reset();
});

if (loadMoreBtnEl) {
  loadMoreBtnEl.addEventListener('click', async () => {
    page += 1;
    await runLoadMore();
    smoothScrollAfterAppend();
  });
}
