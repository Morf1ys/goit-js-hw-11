// import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { PixabayApiImages } from './js/pixabay-api';
import { createMarkupImg } from './js/render-function';
import { refs } from './refs';
import { spinnerPlay, spinnerStop } from './spinner';

refs.form.addEventListener('submit', onSubmitForm);

spinnerPlay();
spinnerStop();

const pixabay = new PixabayApiImages();
const lightboxGallery = new SimpleLightbox('.gallery a');

async function onSubmitForm(e) {
  e.preventDefault();

  observer.observe(refs.infitity);
  clearGallery();
  pixabay.resetPage();

  pixabay.searchQuery = e.currentTarget.searchQuery.value.trim();

  if (pixabay.searchQuery === '') {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query.',
      position: 'topRight',
    });

    return;
  }

  try {
    const response = await pixabay.getImages();

    if (response.hits.length === 0) {
      iziToast.warning({
        title: 'Warning',
        message:
          'Sorry, there are no images matching your search query. Please try again.',
        position: 'topRight',
      });

      return;
    }

    const { hits, totalHits } = response;
    pixabay.setTotal(totalHits);

    iziToast.success({
      message: `Hooray! We found ${totalHits} images.`,
      position: 'topRight',
    });
    spinnerPlay();

    const markup = createMarkupImg(hits);
    updateMarkup(markup);

    spinnerStop();
  } catch (error) {
    console.log(error);
    clearGallery();
    spinnerStop();
  }
}

function updateMarkup(markup) {
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  lightboxGallery.refresh();
  smoothScroll();
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

async function onEntry(entries) {
  spinnerPlay();

  entries.forEach(async entry => {
    try {
      if (
        entry.isIntersecting &&
        pixabay.query !== '' &&
        refs.gallery.childElementCount !== 0
      ) {
        pixabay.incrementPage();

        const response = await pixabay.getImages();
        const { hits } = response;

        if (hits.length === 0) {
          iziToast.info({
            title: 'Info',
            message:
              "We're sorry, but you've reached the end of search results.",
            position: 'topRight',
          });

          observer.unobserve(refs.infitity);
          return;
        }

        const markup = createMarkupImg(hits);
        updateMarkup(markup);
      }
    } catch (error) {
      console.error(error);
    } finally {
      spinnerStop();
    }
  });
}

const observer = new IntersectionObserver(onEntry, {
  rootMargin: '100px',
});

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
