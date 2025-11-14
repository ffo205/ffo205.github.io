# Francesca O'Hop - Portfolio Website

Professional portfolio website for Francesca O'Hop - Editor, Writer, and Filmmaker.

🌐 **Live Site:** [francescaohop.com](https://francescaohop.com)

## Overview

This is a custom-built portfolio website showcasing film and television work, including screenplays, editing projects, music videos, documentaries, and TV shows. The site features a modern, responsive design with smooth animations, dark mode support, and interactive elements.

## Features

- 🎨 **Responsive Design** - Fully optimized for desktop, tablet, and mobile devices
- 🌓 **Dark/Light Mode** - Theme toggle with smooth transitions
- 🎬 **Portfolio Showcase** - 20+ detailed project pages with videos, images, and awards
- 📱 **Interactive UI** - Smooth scrolling, parallax effects, and animated elements
- 🖼️ **Image Galleries** - Lightbox galleries with masonry layout
- 🎥 **Video Integration** - YouTube embeds and custom video players
- 🏆 **Awards Carousel** - Infinite scrolling award certificate display
- 📧 **Contact Form** - Integrated contact functionality
- ⚡ **Performance Optimized** - Fast loading with minimal dependencies

## Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, flexbox, grid, animations
- **Vanilla JavaScript** - No frameworks, pure JS for interactions
- **Font:** Manrope (Google Fonts)
- **Icons:** Custom SVG icons
- **Hosting:** GitHub Pages

## Project Structure

```
.
├── index.html              # Homepage with portfolio grid
├── cv.html                 # CV/Resume page
├── editor-services.html    # Services page
├── contact.html            # Contact form
├── portfolios/             # Individual portfolio pages
│   ├── the-wild-hunt.html
│   ├── black-ocean.html
│   ├── della.html
│   ├── the-spiral.html
│   └── ... (20+ more)
├── static/
│   ├── css/
│   │   └── style.css       # Main stylesheet (4000+ lines)
│   ├── js/
│   │   └── main.js         # Core JavaScript functionality
│   ├── images/
│   │   ├── portfolio/      # Portfolio cover images
│   │   ├── awards/         # Award certificates
│   │   └── logos/          # Site logos
│   └── favicon/            # Favicon assets
└── README.md
```

## Key Components

### Portfolio Pages
Each portfolio page includes:
- Hero section with project title and metadata
- Parallax hero image
- Synopsis/description sections
- Video embeds or clickable thumbnails
- Image galleries with lightbox
- Awards carousels (where applicable)
- External links (Instagram, IMDb, etc.)

### Featured Projects
- **The Wild Hunt** - Television pilot (horror/LGBTQIA+)
- **Black Ocean** - Feature screenplay (K-Pop romance)
- **Della** - Short screenplay (boxing drama)
- **The Spiral** - Short film (Junji Ito adaptation)
- **Digital Art Gallery** - Art exhibition showcase
- **Reel K-Pop** - Documentary series
- **Safe Smart Dating** - PSA (dating abuse awareness)
- And many more...

## CSS Architecture

The stylesheet uses:
- CSS custom properties for theming
- BEM-inspired naming conventions
- Modular component structure
- Responsive breakpoints
- Smooth transitions and animations
- Dark mode color schemes

## JavaScript Features

- Auto-hiding header on scroll
- Mobile menu toggle
- Dark/light theme switcher with localStorage persistence
- Portfolio grid filtering
- Image lightbox gallery
- Smooth scroll behavior
- Awards carousel auto-scroll
- Form validation
- Lazy loading optimization

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Development

To run locally:

1. Clone the repository:
```bash
git clone https://github.com/ffo205/ffo205.github.io.git
cd ffo205.github.io
```

2. Open in a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js http-server
npx http-server
```

3. Open `http://localhost:8000` in your browser

## Performance

- Minimal external dependencies
- Optimized images
- Efficient CSS with minimal specificity
- Vanilla JS (no heavy frameworks)
- Fast initial page load

## Contact

For inquiries about work or collaboration:
- **Instagram:** [@francesca_st_genev13ve](https://www.instagram.com/francesca_st_genev13ve/)
- **TikTok:** [@francesca_st_genev13ve](https://www.tiktok.com/@francesca_st_genev13ve)

## License

© 2024 Francesca O'Hop. All rights reserved.

---

*Built with ❤️ for showcasing creative work in film and television.*
