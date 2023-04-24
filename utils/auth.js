require('dotenv').config
const OktaJwtVerifier = require("@okta/jwt-verifier")
const OktaClient = require("@okta/okta-sdk-nodejs")
const oktaAuth = require("@okta/okta-auth-js").OktaAuth

const oktaJwtVerifier = new OktaJwtVerifier({
    issuer: `https://${process.env.OKTA_OAUTH2_ISSUER}/oauth2/default`,
    clientId: process.env.OKTA_OAUTH2_CLIENT_ID,
    assertClaims: {
        aud: 'api://default'
    }
})

const oktaClients = new oktaAuth({
    issuer: `https://${process.env.OKTA_OAUTH2_ISSUER}/oauth2/default`,
    clientId: process.env.OKTA_OAUTH2_CLIENT_ID,
    redirectUri: process.env.REDIRECT_URI 
})

const oktaClient = new OktaClient.Client({
    orgUrl: `https://${process.env.OKTA_OAUTH2_ISSUER}`,
    token: process.env.TOKEN
})

const assertIssuer = (actualIssuer, expectedIssuer) => {
    if(actualIssuer !== expectedIssuer) 
        throw new Error(`Invalid issuer: expected ${expectedIssuer}, but got ${actualIssuer}`);
}

const signIn = async (email, password) => {
    try {
        const transaction = await oktaClients.signInWithCredentials({ username: email, password: password })
    
        if (transaction.status !== 'SUCCESS') {
            res.badRequest(null, req.__('AUTH_FAILED'))
        }
    
        const tokens = await transaction.sessionToken
    
        const factors = await oktaClient.userFactorApi(tokens)
        const factor = await factors.find(factor => factor.factorType === 'token:software:totp')
        if (!factor) {
            res.badRequest(null, req.__('MFA_REQUIRED'))
        }
        req.session.transaction = transaction
        return factor
    } catch (err) {
        console.error(err.message)
        throw new Error('Failed to sign in with credentials:' + err.message)
    }
}

module.exports = {
    assertIssuer,
    oktaClient,
    oktaJwtVerifier,
    signIn
}
