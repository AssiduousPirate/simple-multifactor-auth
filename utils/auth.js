require('dotenv').config
const { ExpressOIDC } = require('@okta/oidc-middleware')

const oidc = new ExpressOIDC({
    issuer: `https://${process.env.OKTA_OAUTH2_ISSUER}/oauth2/default`,
    client_id: process.env.OKTA_OAUTH2_CLIENT_ID,
    client_secret: process.env.OKTA_OAUTH2_CLIENT_SECRET,
    appBaseUrl: `${process.env.HOST_URL}`,
    scope: 'openid profile',
})

module.exports = oidc