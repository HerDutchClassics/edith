let postsData = [];

function getQueryParam(key) {
  const params = new URLSearchParams(window.location.search);
  return params.get(key);
}

function getAllTags(posts) {
  const lang = getLanguage();
  const tagsKey = lang === 'en' ? 'tags_en' : 'tags_nl';
  const tagsSet = new Set();
  posts.forEach((post) => {
    const tags = post[tagsKey] || post.tags;
    if (tags) {
      tags.forEach((tag) => tagsSet.add(tag));
    }
  });
  return Array.from(tagsSet).sort();
}

function getActiveTag() {
  return getQueryParam('tag');
}

function filterPostsByTag(posts, tag) {
  if (!tag) return posts;
  const lang = getLanguage();
  const tagsKey = lang === 'en' ? 'tags_en' : 'tags_nl';
  return posts.filter((post) => {
    const tags = post[tagsKey] || post.tags;
    return tags && tags.includes(tag);
  });
}

function renderTagFilter(allTags, posts) {
  const filterContainer = document.getElementById('tag-filter-container');
  if (!filterContainer) return;

  const activeTag = getActiveTag();
  const filterHTML = `
    <div class="tag-filter">
      <div class="filter-controls">
        <label class="filter-label" for="sort-filter">Sort reviews</label>
        <select id="sort-filter" class="sort-filter" aria-label="Sort reviews">
          <option value="recent" selected>Most recent</option>
          <option value="oldest">Oldest first</option>
        </select>
      </div>
      <p class="filter-label">Filter by tag:</p>
      <div class="tag-buttons">
        <a href="index.html" class="tag-button ${!activeTag ? 'active' : ''}">
          All posts
        </a>
        ${allTags.map((tag) => `
          <a href="index.html?tag=${encodeURIComponent(tag)}" class="tag-button ${activeTag === tag ? 'active' : ''}">
            ${tag}
          </a>
        `).join('')}
      </div>
    </div>
  `;
  filterContainer.innerHTML = filterHTML;

  const sortFilter = document.getElementById('sort-filter');
  sortFilter.addEventListener('change', () => renderTimeline(posts, sortFilter.value));
}

function renderPostTags(tags) {
  if (!tags || tags.length === 0) return '';
  return `
    <div class="post-tags">
      ${tags.map((tag) => `
        <a href="index.html?tag=${encodeURIComponent(tag)}" class="tag-badge">${tag}</a>
      `).join('')}
    </div>
  `;
}

function renderPostRatings(ratings) {
  if (!ratings || Object.keys(ratings).length === 0) return '';
  return `
    <div class="ratings-container">
      <h3 class="ratings-title">Book Ratings</h3>
      <div class="ratings-grid">
        ${Object.entries(ratings).map(([key, value]) => `
          <div class="rating-item">
            <div class="rating-label">${key.charAt(0).toUpperCase() + key.slice(1)}</div>
            <div class="rating-bar">
              <div class="rating-line" style="left: ${(value / 10) * 100}%"></div>
            </div>
            <div class="rating-value">${value}/10</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function getLanguage() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  return currentPage.includes('_en') ? 'en' : 'nl';
}

async function loadPosts() {
  if (postsData.length > 0) return postsData;
  
  try {
    const response = await fetch('posts-data.json');
    const data = await response.json();
    postsData = data.posts;
  } catch (error) {
    console.error('Error loading posts:', error);
    postsData = [];
  }
  
  return postsData;
}

function createTimelineItem(post) {
  const item = document.createElement('article');
  item.className = 'timeline-item';
  const tagsHTML = renderPostTags(post.tags);
  item.innerHTML = `
    <span class="stamp">${post.date}</span>
    <div class="timeline-card">
      <div class="review-header">
        <div class="cover-slot">
          <img src="${post.image}" alt="Cover of ${post.title}" onerror="this.style.display='none'" />
        </div>
        <div>
          <h2>${post.title}</h2>
          <p class="review-author">${post.author}</p>
        </div>
      </div>
      <p>${post.excerpt}</p>
      ${tagsHTML}
      <a href="post.html?id=${post.id}">Read the post</a>
    </div>
  `;

  item.addEventListener('click', (event) => {
    const link = item.querySelector('a');
    if (link && !link.contains(event.target)) {
      window.location.href = `post.html?id=${post.id}`;
    }
  });

  return item;
}

function renderTimeline(posts, sortOrder = 'recent') {
  const panel = document.getElementById('timeline-panel');
  if (!panel) return;

  panel.querySelectorAll('.timeline-item').forEach((item) => item.remove());
  
  const activeTag = getActiveTag();
  const filteredPosts = filterPostsByTag(posts, activeTag)
    .slice()
    .sort((firstPost, secondPost) => sortOrder === 'oldest'
      ? Number(firstPost.date) - Number(secondPost.date)
      : Number(secondPost.date) - Number(firstPost.date));
  
  if (filteredPosts.length === 0) {
    panel.innerHTML = '<p class="timeline-empty">No posts found with this tag.</p>';
    return;
  }
  filteredPosts.forEach((post) => panel.appendChild(createTimelineItem(post)));
}

function renderPost(posts) {
  const id = Number(getQueryParam('id')) || 0;
  const post = posts.find((item) => item.id === id) || posts[0];
  const lang = getLanguage();
  
  const title = document.getElementById('post-title');
  const subtitle = document.getElementById('post-subtitle');
  const meta = document.getElementById('post-meta');
  const body = document.getElementById('post-body');
  const tagsContainer = document.getElementById('post-tags');
  const imageContainer = document.getElementById('post-image');
  const ratingsContainer = document.getElementById('post-ratings');

  if (!post || !title || !meta || !body) return;

  // Handle language-specific content
  const titleKey = `title_${lang}`;
  const subtitleKey = `subtitle_${lang}`;
  const bodyKey = `body_${lang}`;
  
  title.textContent = post[titleKey] || post.title || 'Untitled';
  if (subtitle) {
    subtitle.textContent = post[subtitleKey] || post.subtitle || '';
  }
  meta.textContent = `Published ${post.date} · by ${post.author}`;
  
  if (tagsContainer) {
    tagsContainer.innerHTML = renderPostTags(post.tags);
  }
  
  if (imageContainer && post.image) {
    imageContainer.innerHTML = `<img src="${post.image}" alt="${post[titleKey]}" class="post-image" />`;
  }

  // Render body with support for regular text, headings, and blockquotes
  const bodyContent = post[bodyKey] || [];
  body.innerHTML = bodyContent
    .map((item) => {
      if (typeof item === 'string') {
        return `<p>${item}</p>`;
      } else if (item.type === 'heading') {
        return `<h2>${item.text}</h2>`;
      } else if (item.type === 'blockquote') {
        return `<blockquote>"${item.text}"</blockquote>`;
      }
      return '';
    })
    .join('');
}


function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

async function init() {
  const posts = await loadPosts();
  setActiveNavLink();
  if (document.getElementById('timeline-panel')) {
    const allTags = getAllTags(posts);
    renderTagFilter(allTags, posts);
    renderTimeline(posts);
  }
  if (document.getElementById('post-title')) {
    renderPost(posts);
  }
}

if (document.readyState !== 'loading') {
  init();
} else {
  document.addEventListener('DOMContentLoaded', init);
}
