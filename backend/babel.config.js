module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-typescript',
    {
      targets: {
        node: 'current',
      },
    },
  ],
  plugins: ['@babel/plugin-transform-modules-commonjs'],
};