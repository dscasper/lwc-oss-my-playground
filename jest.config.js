// You only need this file
// - if you want to customize your Jest environment
// - if you want to use Jest i. e. from a Visual Studio Code extension
const { jestConfig } = require('lwc-services/lib/config/jestConfig');

module.exports = {
    ...jestConfig,
    transformIgnorePatterns: ['/node_modules/(?!lightning-base-components)'],
    moduleNameMapper: {
        "lightning/(.*)": [
            "<rootDir>/node_modules/lightning-base-components/src/lightning/$1/$1.js"
        ]
    },
};
