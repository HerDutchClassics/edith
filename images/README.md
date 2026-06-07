# Book Images

Place custom images for your book entries in this folder.

## Image Naming Convention

Images should be named to match the post slugs:
- `dusty-jacket.jpg` - for "The Dusty Dust Jacket" post
- `lost-reader.jpg` - for "Letter to a Lost Reader" post
- `ink-lace.jpg` - for "Ink, Lace, and Quiet Courage" post
- `dirk.jpg` - for "Dirk" post
- `dirk-2.jpg` - for "Dirk 2" post

## Supported Formats

- JPEG (.jpg, .jpeg)
- PNG (.png)
- WebP (.webp)

## Image Dimensions

Recommended image dimensions: 640px wide × any height
- Images will be displayed responsively at their full width up to 640px
- Aspect ratios are preserved with automatic height adjustment

## Adding New Images

1. Place your image in this `images/` folder
2. In `scripts.js`, update the corresponding post object to include the image path:

```javascript
{
  id: 0,
  title: "Post Title",
  image: "images/my-image.jpg",
  // ... other properties
}
```

Images will automatically display above the post content on the detail page.
