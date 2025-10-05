'use strict';

const build = require('@microsoft/sp-build-web');

const path = require('path');

// Ensure PostCSS (Tailwind) runs for CSS imported by webparts by adding postcss-loader
build.configureWebpack.mergeConfig({
  additionalConfiguration: (generatedConfiguration) => {
    try {
      const postcssLoader = {
        loader: require.resolve('postcss-loader'),
        options: {
          postcssOptions: {
            config: path.join(__dirname, 'postcss.config.js')
          }
        }
      };

      if (generatedConfiguration && generatedConfiguration.module && Array.isArray(generatedConfiguration.module.rules)) {
        generatedConfiguration.module.rules.forEach(rule => {
          if (rule.use && Array.isArray(rule.use)) {
            // Insert postcssLoader after any css-loader entries
            const newUse = [];
            rule.use.forEach(u => {
              newUse.push(u);
              // check loader string or object
              const loaderName = typeof u === 'string' ? u : (u && u.loader) ? u.loader : '';
              if (loaderName && loaderName.indexOf('css-loader') !== -1) {
                newUse.push(postcssLoader);
              }
            });
            rule.use = newUse;
          }
        });
      }
    } catch (e) {
      // if postcss-loader isn't installed yet, just skip modification
      console.warn('postcss-loader not configured (may not be installed yet):', e && e.message);
    }

    return generatedConfiguration;
  }
});

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  var result = getTasks.call(build.rig);

  result.set('serve', result.get('serve-deprecated'));

  return result;
};

build.initialize(require('gulp'));
