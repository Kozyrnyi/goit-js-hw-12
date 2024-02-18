function itemTemplate({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) {
    return `<a href="${largeImageURL}" class="gallery-item">
                <img src="${webformatURL}" alt="" title="${tags}">
                <div class="info-block">
                    <div class="info-item likes">
                        <span>Likes</span>${likes}
                    </div>
                    <div class="info-item views">
                        <span>Views</span>${views}
                    </div>
                    <div class="info-item comments">
                        <span>Comments</span>${comments}
                    </div>
                    <div class="info-item downloads">
                        <span>Downloads</span>${downloads}
                    </div>
                </div>
            </a>`;
}

function fullTemplate(elements) {
    return elements.map(itemTemplate).join('');
}

export function renderGallery(gallery, elements) {
    const markup = fullTemplate(elements);
    gallery.insertAdjacentHTML('beforeend', markup);
}
