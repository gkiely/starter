Starter
=================

Starter for front-end projects <br>


**Contributors:** Grant Kiely

Build requirements
----
* Node & Gulp js

------------

Start project:

```sh

cd folder
npm install
gulp
```

Any gulp packages that are not found, `npm install gulp-package --save-dev` and commit the new package.json.


Project Details
---
* I'm using gulp-file-include to include the html files.
* src will generate a dev folder for use in development (can't use src due to html includes)
* `gulp dist` will generate minified prod code
* using 6to5, so you can utilise ES6 js code


JS
* If you copy a file into the /lib folder it will get concated into lib.js, same for app, nobuild does not build and is just for testing.
* Im using bower indirectly, I download/update assets and then I copy them across to lib or app.
