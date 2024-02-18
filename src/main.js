// iziToast library
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
// SimpleLightbox library
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// error icon for iziToast message
import errorIcon from './img/error_icon.svg';
// pixabayAPI function
import { pixabayAPI } from './js/pixabay-api';
// render function
import { renderGallery } from './js/render-functions';

// refs
const form = document.querySelector('.search-form');
const loadMore = document.querySelector('.load-more');
const itemsWrap = document.querySelector('.items-wrap');
const gallery = document.querySelector('.gallery');

let searchQuery;
let page;
let maxPage;
const PER_PAGE = 15;
let lightbox;

form.addEventListener('submit', getSearchResult);
loadMore.addEventListener('click', onLoadMoreClick);

async function getSearchResult(evt) {
    evt.preventDefault();
    // clear all content
    gallery.innerHTML = '';

    page = 1;
    maxPage = 1;
    // hide load more button if it was visible
    loadMore.classList.add('hidden');

    searchQuery = form.elements.searchField.value.trim();
    if (searchQuery) {
        // show css-loader
        showLoader();

        try {
            const data = await pixabayAPI(searchQuery, PER_PAGE, page);

            if (data['hits'].length !== 0) {
                maxPage = Math.ceil(data.totalHits / PER_PAGE);

                renderGallery(gallery, data['hits']);
                createLightboxInstance();
                // show the end of search results message if necessary
                endSearchResultsMsg();
            } else {
                // showSearchError();
                const options = {
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                    bgColor: '#EF4040',
                    progressColor: '#B51B1B',
                };
                showSearchError(options);
            }
        } catch (err) {
            console.log(err);
        }

        hideLoader();
    }
    showHideLoadBtn();
    form.reset();
}

async function onLoadMoreClick() {
    page += 1;
    // show css-loader
    showLoader();

    const data = await pixabayAPI(searchQuery, PER_PAGE, page);
    renderGallery(gallery, data['hits']);

    // refresh SimpleLightbox gallery
    lightbox.refresh();
    // hide css-loader
    hideLoader();
    // show a message that all search results are shown
    endSearchResultsMsg();
    // check whether load more button should be visible or hidden
    showHideLoadBtn();
    // scroll to loaded elements
    scrollToElements();
}

// create SimpleLightbox instance
function createLightboxInstance() {
    lightbox = new SimpleLightbox('.gallery a');
    lightbox.refresh();
}

function showLoader() {
    itemsWrap.classList.add('loading');
}

function hideLoader() {
    itemsWrap.classList.remove('loading');
}

function scrollToElements() {
    const scrollHeight = gallery.firstElementChild.getBoundingClientRect().height * 2;

    window.scrollBy({
        behavior: 'smooth',
        top: scrollHeight,
    });
}

// show search error
function showSearchError({ message, bgColor, progressColor }) {
    iziToast.show({
        message: message,
        messageColor: '#fff',
        backgroundColor: bgColor,
        theme: 'dark',
        iconUrl: errorIcon,
        position: 'topRight',
        timeout: 3000,
        progressBarColor: progressColor,
        animateInside: false,
        transitionIn: 'fadeIn',
    });
}

function showHideLoadBtn() {
    if (page >= maxPage) {
        loadMore.classList.add('hidden');
    } else {
        loadMore.classList.remove('hidden');
    }
}

function endSearchResultsMsg() {
    if (page >= maxPage) {
        const options = {
            message: "We're sorry, but you've reached the end of search results.",
            bgColor: '#2db4cf',
            progressColor: '#40666e',
        };

        showSearchError(options);
    }
}
