const webpack = require("webpack");
const path = require("path");
require('dotenv').config();
const LwcWebpackPlugin = require('lwc-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const variableValue = (variableSet) => {
    const name = variableSet.name;
    const backupMessage = `ENV variable ${name} not defined`
    return JSON.stringify(process.env[name] || variableSet.fallback || backupMessage);
}

const exposeEnvVariables = (variableSets) => {
    const variables = {};
    for ( let i = 0; i < variableSets.length; i += 1) {
        const name = variableSets[i].name;
        variables[name] = variableValue(variableSets[i])
    }
    return variables;
}

module.exports = {
    entry: ['./src/client'],
    devServer: {
        https: Boolean(process.env.HTTPS),
        proxy: { '/': 'http://localhost:3002' },
        port: 3001
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': exposeEnvVariables([
                { name: 'RECAPTCHA_SITE_KEY' }
            ]),
        }),
        new HtmlWebpackPlugin({
            template: './src/client/index.html'
        }),
        new LwcWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/client/resources/'),
                    to: path.resolve(__dirname, 'dist/resources/')
                },
                {
                    from: path.resolve(
                        __dirname,
                        'node_modules/@salesforce-ux/design-system/assets'
                    ),
                    to: path.resolve(__dirname, 'dist/SLDS')
                },
                {
                    from: path.resolve(
                        __dirname,
                        'node_modules/@salesforce-ux/design-system/assets'
                    ),
                    to: path.resolve(__dirname, 'src/client/SLDS')
                }
            ]
        })
    ],
    stats: 'errors-only'
};