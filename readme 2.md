Starter Project
=================

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

Useful examples & resources: 

* http://julienrenaux.fr/2014/05/25/introduction-to-gulp-js-with-practical-examples/

* http://yeoman.io/blog/performance-optimization.html



Project Details
---
* I'm using gulp-file-include to include the files.
* html get's pulled from `html/pages` and processed to add any views.
* mobile pages are postfixed with `.mobile`
* Original 9gag css is `page.css`, overwritten with `app.sass`