Mac
=================
1. Install node and git
---
- `brew install nvm`
- `nvm install node`
- `brew install git`

Note: If you have already installed node, I would highly recommend you uninstall it and install nvm as it allows multiple versions of node and you do not have to be root to use the -g flag.

If you aren't able to do this, you can follow other steps here to resolve root permission errors:
http://stackoverflow.com/questions/16151018/npm-throws-error-without-sudo

2. Get code 
---
```sh
git clone https://github.com/gkiely/starter.git
```
> If the clone has permission errors, generate git credentials on visualstudio.com


3. Setup db (optional)
---
```sh
psql
create database myDatabase
```
- Then update settings.js to point to 'myDatabase'


4. Run project
---
```sh
npm start
```
---


Windows
=================

1. Install node and git
---
- Open powershell as admin
- Go to here: https://chocolatey.org/install, paste script into powershell
- After install is complete, close powershell and open cmd
- Install nodist: `choco install nodist`
- Install git: `choco install git`
- Close and re-open cmd
- Check install worked by typing `nodist`, `git --version`

2. Get code 
---
```sh
git clone https://github.com/gkiely/starter.git
```
> If the clone has permission errors, generate git credentials on visualstudio.com

3. Setup db (optional)
--
```sh
psql
create database myDatabase
```
- Then update settings.js to point to 'myDatabase'

4. Run project
---
```sh
npm start
```

---





Common issues
---
"Error not found python2", install: https://www.python.org/downloads/release/python-2713/
- If you are still having issues follow this: https://github.com/nodejs/node-gyp/issues/629#issuecomment-153196245

Issue with node-sass after updating node, run:
`npm rebuild node-sass`




Project Details
---
If you want auto-reloading, use the livereload extension:
https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en


>src: This is the folder you want to edit. `gulp` command will watch and output to dist.

>dist: `gulp` and `gulp prod` will output to this folder.


HTML
---
* Using gulp-file-include to include the html files. It allows you to pass variables with the includes.
* /pages get copied across, partials do not.

JS
---
* Using babeljs and webpack
* webpack.dev.js for `gulp`
* webpack.prod.js for `gulp prod`

SASS
---
* I'm globbing the sass files with gulp-sass-glob
* Using autoprefixer


Server
---
Node.js and Express.


---
