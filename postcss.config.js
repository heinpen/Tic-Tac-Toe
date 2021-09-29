const autoprefixer = require('autoprefixer');
const postImport = require('postcss-import');

module.exports = {
  plugins: [postImport, autoprefixer],
};
