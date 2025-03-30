/* eslint-disable @typescript-eslint/no-require-imports */
module.exports = {
  plugins: [
    require('postcss-each-variables'),
    require('postcss-each')({
      plugins: {
        beforeEach: [require('postcss-for'), require('postcss-color-mix')],
      },
    }),
  ],
}
