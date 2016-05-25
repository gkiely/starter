Starter for front-end projects
=================


1. Get it
---
```sh
git clone https://github.com/gkiely/starter.git .
```

2. Install it
---
```sh
npm i
```

3. Start it
---
```sh
gulp
```



Project Details
---

gulp watch works with the livereload extension:
https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en


2 folders
>src: This is the folder you want to edit

>dist: By default contains quick build for dev, running `gulp dist` will minify.

* Using gulp-file-include to include the html files. It allows you to pass variables with the includes.
* `gulp dist` will generate minified prod code [still working on this]
* Im using bower indirectly, I download/update assets and then I copy them across to lib or app.

HTML
---
* /pages get copied across, partials do not (should be included using gulp-file-include).

JS
---
* Using babeljs.
* If you copy a file into the /lib folder it will get concated into lib.js, same for app, /nobuild does not build and is just for testing.
* I'm not minifying them by default to keep the reload as fast as possible, run `dist` to minify/build properly.


SASS
---
* I'm globbing the sass files with this: https://github.com/gkiely/gulp-sass-bulk-import
* Using autoprefixer

Responsive Images
---
There is a task called imgResp that will generate 1/2 and 1/3 images.
Include the highest res at x3 in your img directory and it will populate from that.

If you are a boss go here and get it installed. https://github.com/mahnunchik/gulp-responsive



------
Issues/Bugs are located in todo.html
