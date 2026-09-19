# Bark n' Groom

Website for **Bark n' Groom**, a dog grooming salon in Keratsini, Greece.

- Αναπαύσεως 68, Keratsini 187 55
- 21 3099 4470
- barkngroom68@gmail.com

A static site (HTML, CSS, JavaScript) with no build step, published with GitHub Pages.

- Greek (main): https://ioannisbekas.github.io/bark-n-groom/
- English: https://ioannisbekas.github.io/bark-n-groom/en/

## Structure

```
index.html            Greek page (main)
en/index.html         English page
assets/css/styles.css styles
assets/js/main.js     menu, scroll effects, services list, reviews slider, booking form
assets/favicon.svg    logo / favicon
```

## Editing

Edit the files and push to `main`. GitHub Pages redeploys within a minute or two.

The two languages are separate pages, so a text change usually needs making in both
`index.html` and `en/index.html`. Short interface messages (form errors, the booking
email text, menu labels) are in the `T` object at the top of `assets/js/main.js`.

If the site moves to its own domain, update the `canonical`, `hreflang` and `og:url`
links in the `<head>` of both pages.

To preview locally:

```bash
python -m http.server 5500
```

then open http://localhost:5500.

## Still to update

- **Team**: the names and photos in the Team section are placeholders (in both languages).
- **Reviews**: the review slider is switched off (commented out in `index.html`) until real customer reviews are added.
- **Photos**: the images are free Unsplash stock photos; swap in photos of your own salon and dogs.
- **Opening hours, prices, social links**: not on the site yet.

The booking form has no server. It opens the visitor's email app with the request pre-filled to barkngroom68@gmail.com.
