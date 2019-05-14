# SASS Builder

## Configuration

By default, sass-builder will read the `sass-builder.config.js` file at the root 
of your project. You can use the `-c` or `--config` parameter if you want to 
give your configuration file another name. 

Typically, this is what it should look like: 

```js
const path = require('path');
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  // Compile entry.scss 
  styles: [{
     // Compile entry.scss 
    entry: path.resolve(__dirname, 'src/entry.scss'),
    dest: path.resolve(__dirname, 'dist/output.css'),
    options: {
      sourceMap: isProd ? 'file' : true,
    },
    {
     // Compile /components  
    entry: path.resolve(__dirname, 'src/components/**/*.scss'),
    dest: path.resolve(__dirname, 'dist/components'),
    options: {
      sourceMap: isProd ? 'file' : true,
    },
  }],
};
```

## Test
```
cd test
node ../bin/build.js styles
```

## References 
Its striped down flavor of https://github.com/ec-europa/ecl-toolkit 
