import '../styles/index.scss';

/**
 * jsGallery plugin class
 */
export default class jsGallery {

  // Data
  galleries = [];

  // Hooks
  onStarted = () => {};

  // HTML elements
  gallery_classes = {
    root: "js-gallery",
    wrapper: "js-gallery__wrap",
    photo: "js-gallery__photo",
    photo_img: "js-gallery__photo-img",
    photo_alt: "js-gallery__photo-alt",
    button_prev: "js-gallery__control js-gallery__control--prev",
    button_next: "js-gallery__control js-gallery__control--next",
    overlay: "js-gallery__overlay"
  };
  wrapper;
  button_prev;
  button_next;

  /**
   * @param String options.el - all wrapper galleries
   */
  constructor(options) {
    const { el, onStarted } = options;

    if(!el) console.warn('jsGallery | ', '"el" is not defined');

    this.onStarted = onStarted;

    // Find galleries & photos
    document.querySelectorAll(el).forEach((gallery) => {
      let photos = gallery.querySelectorAll('img');

      this.galleries.push({
        photos: photos,
        photos_count: photos.length
      });
    });

    // Initialization gallery
    this.init();
  }

  /**
   * Init all galleries & add listeners
   */
  init(){
    // Create plugin DOM
    this.wrapper = document.createElement('div');
    this.wrapper.className = this.gallery_classes.root;
    this.wrapper.innerHTML = `
      <div class="${this.gallery_classes.wrapper}"></div>
      <div class="${this.gallery_classes.overlay}"></div>
    `;
    document.body.append(this.wrapper);

    // Set listeners on photo
    this.galleries.forEach((gallery) => {
      gallery.photos.forEach((photo) => {

        this.wrapper.childNodes[1].insertAdjacentHTML('beforeend', `
          <figure class="${this.gallery_classes.photo}">
            <img src="${photo.src}" alt="${photo.getAttribute('alt')}" class="${this.gallery_classes.photo_img}">
            <figcaption class="${this.gallery_classes.photo_alt}">${photo.getAttribute('alt')}</figcaption>
          </figure>
        `);

        photo.addEventListener('click', (e) => {
          e.preventDefault();

          console.log('Click photo!');
        });
      });
    });

    this.onStarted();
  }
}

window.jsGallery = jsGallery;

const gallery = new jsGallery({
  el: "#myGallery",
  onStarted() {
    console.log('Start!');
  }
});

console.log('ddd', gallery);
