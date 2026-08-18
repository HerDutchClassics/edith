# How to Add Blog Posts (Easy Guide)

You don't need to touch any HTML code! All your blog posts are stored in a simple file called `posts-data.json`. Just follow this guide.

## What You Need to Do

1. **Open the file:** `posts-data.json` 
2. **Edit the content** using the examples below
3. **Save the file** (Ctrl+S)
4. **Refresh your website** in your browser

## Where to Add Your Content

All your blog posts live in the `posts-data.json` file. Here's the structure:

### Basic Post Structure

```json
{
  "posts": [
    {
      "id": 0,
      "title_nl": "Dutch Title Here",
      "title_en": "English Title Here",
      "subtitle_nl": "Dutch subtitle here",
      "subtitle_en": "English subtitle here",
      "author": "Your Name",
      "date": "1925",
      "tags": ["tag1", "tag2", "tag3"],
      "image": "images/your-image.jpg",
      "body_nl": [...],
      "body_en": [...],
      "quotes": [...]
    }
  ]
}
```

## Understanding Each Field

| Field | What Goes Here | Example |
|-------|---|---|
| `id` | A unique number (0, 1, 2...) | `0` |
| `title_nl` | Your post title in Dutch | `"Het stoffige stofomslag"` |
| `title_en` | Your post title in English | `"The Dusty Dust Jacket"` |
| `subtitle_nl` | Short description in Dutch | `"Een close reading van..."` |
| `subtitle_en` | Short description in English | `"A close reading of..."` |
| `author` | Who wrote the book/post | `"Agatha Marrow"` |
| `date` | Publication year or date | `"1925"` |
| `tags` | Keywords to filter posts (in a list) | `["memory", "analog", "nostalgia"]` |
| `image` | Path to the book cover image | `"images/dusty-jacket.jpg"` |
| `body_nl` | The full post text in Dutch | See below ↓ |
| `body_en` | The full post text in English | See below ↓ |
| `quotes` | Special quotes at the end | See below ↓ |

## How to Write the Post Body

The `body_nl` and `body_en` are **lists** that can contain:

### 1. Regular Paragraphs (Simple Text)
Just put your text in quotes:

```json
"body_nl": [
  "This is my first paragraph. I can write anything here.",
  "This is my second paragraph.",
]
```

### 2. Headings (Section Titles)
Use this special format:

```json
{
  "type": "heading",
  "text": "My Section Title"
}
```

### 3. Blockquotes (Quoted Text)
Use this format for quotes:

```json
{
  "type": "blockquote",
  "text": "This is a quote I want to highlight"
}
```

## Full Example

Here's a complete post example:

```json
{
  "posts": [
    {
      "id": 0,
      "title_nl": "Mijn Eerste Boekrecensie",
      "title_en": "My First Book Review",
      "subtitle_nl": "Waarom dit boek mijn leven veranderde",
      "subtitle_en": "Why this book changed my life",
      "author": "Jane Doe",
      "date": "2024",
      "tags": ["feminist", "literature", "modern"],
      "image": "images/my-book.jpg",
      "body_nl": [
        "Dit boek heeft me echt geraakt. Het gaat over sterke vrouwen en hun verhalen.",
        {
          "type": "heading",
          "text": "Over de schrijfster"
        },
        "De auteur is fantastisch. Ze schrijft met veel passie en gevoeligheid.",
        {
          "type": "blockquote",
          "text": "Vrouwen zijn machtig en hun stemmen moeten worden gehoord"
        },
        {
          "type": "heading",
          "text": "Mijn gedachten"
        },
        "Ik raad dit boek aan aan iedereen die van diepgaande literatuur houdt."
      ],
      "body_en": [
        "This book really touched me. It's about strong women and their stories.",
        {
          "type": "heading",
          "text": "About the Author"
        },
        "The author is fantastic. She writes with passion and sensitivity.",
        {
          "type": "blockquote",
          "text": "Women are powerful and their voices must be heard"
        },
        {
          "type": "heading",
          "text": "My Thoughts"
        },
        "I recommend this book to anyone who loves deep literature."
      ],
      "quotes": [
        {
          "text_nl": "Dit is mijn favoriete quote uit het boek",
          "text_en": "This is my favorite quote from the book"
        }
      ]
    }
  ]
}
```

## Adding More Posts

To add a **second post**, just add a comma after the first post and add a new one:

```json
{
  "posts": [
    {
      "id": 0,
      "title_nl": "First Post",
      ...
    },
    {
      "id": 1,
      "title_nl": "Second Post",
      ...
    }
  ]
}
```

**Important:** Each post needs a unique `id` number (0, 1, 2, 3, etc.)

## Adding Images

1. Put your image files in the `images/` folder
2. In `posts-data.json`, set `"image": "images/your-filename.jpg"`

Supported formats: `.jpg`, `.png`, `.gif`, `.webp`

## Common Mistakes to Avoid

❌ **Wrong:** Missing commas between items
```json
"tags": ["tag1" "tag2"]  // Missing comma!
```

✅ **Right:**
```json
"tags": ["tag1", "tag2"]
```

❌ **Wrong:** Forgetting quotes around text
```json
"title_nl": My Title  // Missing quotes!
```

✅ **Right:**
```json
"title_nl": "My Title"
```

❌ **Wrong:** Using same `id` for multiple posts
```json
{"id": 0, ...}, {"id": 0, ...}  // Two posts with id 0!
```

✅ **Right:**
```json
{"id": 0, ...}, {"id": 1, ...}
```

## Need Help?

If you make a mistake, VS Code will show you a red error icon. Look at the error message—it usually tells you exactly what's wrong (like a missing comma or quote).

You can also use an online JSON validator to check your file: https://jsonlint.com/
Just copy-paste your content and it will tell you if there are any mistakes!

---

That's it! You now have complete control over your blog posts without touching any HTML code. 🎉
