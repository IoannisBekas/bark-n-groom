# Bark n' Groom

Website for **Bark n' Groom**, a dog grooming salon in Keratsini, Greece.

- Αναπαύσεως 68, Keratsini 187 55
- 21 3099 4470
- barkngroom68@gmail.com

A static site (HTML, CSS, JavaScript) with no build step, published with GitHub Pages.

## Structure

```
index.html            page content
assets/css/styles.css styles
assets/js/main.js     menu, scroll effects, services list, reviews slider, booking form
assets/favicon.svg    logo / favicon
```

## Editing

Edit the files and push to `main`. GitHub Pages redeploys within a minute or two.

To preview locally:

```bash
python -m http.server 5500
```

then open http://localhost:5500.

## Still to update

- **Team**: the names and photos in the Team section are placeholders.
- **Reviews**: the review slider is switched off (commented out in `index.html`) until real customer reviews are added.
- **Photos**: the images are free Unsplash stock photos; swap in photos of your own salon and dogs.
- **Opening hours, prices, social links**: not on the site yet.

The booking form has no server. It opens the visitor's email app with the request pre-filled to barkngroom68@gmail.com.
