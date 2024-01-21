export default function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
  }
}
