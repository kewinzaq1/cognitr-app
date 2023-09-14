// Learn more https://docs.expo.io/guides/customizing-metro
// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const {getDefaultConfig} = require('expo/metro-config')

/** @type {import('expo/metro-config').MetroConfig} */
// eslint-disable-next-line no-undef
const config = getDefaultConfig(__dirname, {
  // [Web-only]: Enables CSS support in Metro.
  isCSSEnabled: true,
})
config.resolver.sourceExts = [...config.resolver.sourceExts, 'mjs', 'cjs']

// eslint-disable-next-line no-undef
module.exports = config
