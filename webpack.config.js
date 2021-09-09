const webpack = require("webpack");
require('dotenv').config();


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
    plugins: [
        new webpack.DefinePlugin({
            /* Define ENV Variables to be used by the app here.
             * WARNING: These are visible in browser javascript, so don't put anything here that
             *          you wouldn't publish on the front page of the site */
            'process.env': exposeEnvVariables([
                { name: 'HOSTED' },
                { name: 'MULE_API_URL' },
                { name: 'MULE_CLIENT_ID' },
                { name: 'MULE_CLIENT_SECRET' },
                { name: 'RECAPTCHA_SITE_KEY' },
                { name: 'FORM_CENTER_URL' }
            ]),
        }),
    ],
    stats: 'errors-only'
};