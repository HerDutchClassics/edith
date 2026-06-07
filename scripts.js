const posts = [
  {
    id: 0,
    title: "The Dusty Dust Jacket",
    author: "Agatha Marrow",
    date: "1925",
    excerpt: "Golden pages, lavender notes, and the quiet rituals of afternoon reading. A blogpost about memory and the analog heart.",
    content: [
      "In a room lit by diffused afternoon light, a volume rests quietly with a cover softened by years of hands. This post explores the feeling of turning pages that have held stories for generations.",
      "There is a rhythm to the old book world: measured, unhurried, and always tender. Every sentence is a small ceremony; every footnote, a secret whisper from the past.",
      "The page edges have a soft amber halo, the typography is generous, and the minimal layout lets the words feel spacious and calm."
    ]
  },
  {
    id: 1,
    title: "Letter to a Lost Reader",
    author: "Beatrice Holloway",
    date: "1948",
    excerpt: "Soft paper, hard margins, and the way stories carry a time-stamped voice across decades.",
    content: [
      "Letters are one of the oldest forms of storytelling, a quiet confession between author and reader. This piece explores why handwritten notes feel like bridges to other eras.",
      "In the old book lady palette, every pastel hue becomes a memory, and every italic curve is a gentle invitation to linger.",
      "The act of reading a letter inside a book is a reminder that stories are not only written, they are kept, treasured, and returned to across time."
    ]
  },
  {
    id: 2,
    title: "Ink, Lace, and Quiet Courage",
    author: "Vivian Reed",
    date: "1963",
    excerpt: "A meditation on how old books still feel backstage in a modern life, full of warmth and quiet rebellion.",
    content: [
      "There is courage in the quietest pages, where soft-spoken ideas persist more gently than any shouted manifesto.",
      "This post celebrates the textures of paper and lace, the worn corners of chapter headings, and the way stories can still feel fresh in a world that moves quickly.",
      "A modern sensibility wrapped in vintage sentiment, the narrative honors both timeless grace and present-day curiosity."
    ]
  },
  {
    id: 3,
    title: "Dirk",
    author: "Vivian Reed",
    date: "1977",
    excerpt: "A meditation on how old books still feel backstage in a modern life, full of warmth and quiet rebellion.",
    content: [
      "There is courage in the quietest pages, where soft-spoken ideas persist more gently than any shouted manifesto.",
      "This post celebrates the textures of paper and lace, the worn corners of chapter headings, and the way stories can still feel fresh in a world that moves quickly.",
      "A modern sensibility wrapped in vintage sentiment, the narrative honors both timeless grace and present-day curiosity."
    ]
  },
  {
    id: 4,
    title: "Dirk 2",
    author: "Vivian Reed",
    date: "1978",
    excerpt: "A meditation on how old books still feel backstage in a modern life, full of warmth and quiet rebellion.",
    content: [
      "There is courage in the quietest pages, where soft-spoken ideas persist more gently than any shouted manifesto.",
      "This post celebrates the textures of paper and lace, the worn corners of chapter headings, and the way stories can still feel fresh in a world that moves quickly.",
      "A modern sensibility wrapped in vintage sentiment, the narrative honors both timeless grace and present-day curiosity."
    ]
  },
  {
    id: 5,
    title: "Dirk 26",
    author: "Vivian Reed",
    date: "1978",
    excerpt: "A meditation on how old books still feel backstage in a modern life, full of warmth and quiet rebellion.",
    content: [
      "There is courage in the quietest pages, where soft-spoken ideas persist more gently than any shouted manifesto.",
      "This post celebrates the textures of paper and lace, the worn corners of chapter headings, and the way stories can still feel fresh in a world that moves quickly.",
      "A modern sensibility wrapped in vintage sentiment, the narrative honors both timeless grace and present-day curiosity."
    ]
  }
];

function getQueryParam(key) {
  const params = new URLSearchParams(window.location.search);
  return params.get(key);
}

function loadPosts() {
  return posts;
}

function createTimelineItem(post) {
  const item = document.createElement('article');
  item.className = 'timeline-item';
  item.innerHTML = `
    <span class="stamp">${post.date}</span>
    <div class="timeline-card">
      <h2>${post.title}</h2>
      <p>${post.excerpt}</p>
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

function renderTimeline(posts) {
  const panel = document.getElementById('timeline-panel');
  if (!panel) return;
  if (posts.length === 0) {
    panel.innerHTML += '<p class="timeline-empty">No posts available. Ensure posts.json is in the same folder and open the page from a local server, e.g. run <code>python -m http.server</code> in this folder.</p>';
    return;
  }
  posts.forEach((post) => panel.appendChild(createTimelineItem(post)));
}

function renderPost(posts) {
  const id = Number(getQueryParam('id'));
  const post = posts.find((item) => item.id === id) || posts[0];
  const title = document.getElementById('post-title');
  const meta = document.getElementById('post-meta');
  const body = document.getElementById('post-body');

  if (!post || !title || !meta || !body) return;

  title.textContent = post.title;
  meta.textContent = `Published ${post.date} · by ${post.author}`;
  body.innerHTML = post.content
    .map((paragraph, index) => {
      if (index === 1) {
        return `<h2>A gentle memory</h2><p>${paragraph}</p>`;
      }
      return `<p>${paragraph}</p>`;
    })
    .join('');
}

async function init() {
  const posts = await loadPosts();
  if (document.getElementById('timeline-panel')) {
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
