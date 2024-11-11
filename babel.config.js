module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@assets': './src/assets',
            '@components': './src/components',
            '@screens': './src/screens',
            '@database': './src/database',
            '@routes': './src/routes',
            '@interfaces': './src/interfaces',
            '@utils': './src/utils',
          },
        },
      ],
    ],
  };
};
