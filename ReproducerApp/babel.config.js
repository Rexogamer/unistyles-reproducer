module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['module:@react-native/babel-preset'],

    plugins: [
      [
        'react-native-unistyles/plugin',
        {
          root: 'src',
//          autoProcessPaths: ['node_modules/@rexovolt/react-native-markdown-display'],
        },
      ],
    ],
  };
};
