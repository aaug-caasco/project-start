https://caasco.atlassian.net/browse/CAA-


```
#!text

cp -av /Users/caamac/Projects/project-start/gulpfile.js /Users/caamac/Projects/project-start/package.json . && mkdir ASSETS CODE && cd CODE/ && mkdir dist src && cd src/ && mkdir css img js && cp -av /Users/caamac/Projects/project-start/CODE/src/index.html . && cp -av /Users/caamac/Projects/project-start/CODE/src/css/_breakpoints.scss ./css && cp -av /Users/caamac/Projects/project-start/CODE/src/css/_columns.scss ./css && cp -av /Users/caamac/Projects/project-start/CODE/src/css/_overlay.scss ./css && cp -av /Users/caamac/Projects/caa-dev/source/sass/generic/_mixins.scss ./css && cp -av /Users/caamac/Projects/caa-dev/source/sass/generic/_variables.scss ./css && cd ../../ && mv package.json ~package.json && npm init

npm install --save-dev
```