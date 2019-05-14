const path = require('path');
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  // Compile entry.scss 
  styles: [{
     // Compile /components  
    entry: path.resolve(__dirname, 'src/components/**/*.scss'),
    dest: path.resolve(__dirname, 'target/components'),
    options: {
      sourceMap: isProd ? 'file' : true,
    },
  }],
};