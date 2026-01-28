function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export function createGalleryMarkup(images) {
  return images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        const safeTags = escapeHtml(tags);

        return `
<li class="card">
  <a class="card-link" href="${largeImageURL}">
    <img class="card-img" src="${webformatURL}" alt="${safeTags}" loading="lazy" />
  </a>

  <div class="meta">
    <div class="meta-item">
      <span class="meta-title">Likes</span>
      <span class="meta-value">${likes}</span>
    </div>
    <div class="meta-item">
      <span class="meta-title">Views</span>
      <span class="meta-value">${views}</span>
    </div>
    <div class="meta-item">
      <span class="meta-title">Comments</span>
      <span class="meta-value">${comments}</span>
    </div>
    <div class="meta-item">
      <span class="meta-title">Downloads</span>
      <span class="meta-value">${downloads}</span>
    </div>
  </div>
</li>`;
      }
    )
    .join('');
}
