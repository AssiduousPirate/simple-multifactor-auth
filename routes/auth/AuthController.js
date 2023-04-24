const { oidc, oktaClient, signIn, assertIssuer } = require("../../utils/auth")
const { writePool, readPool } = require("../../utils/database")
const bcrypt = require('bcryptjs')

class AuthController {
    async Home(req, res) {
        try {
            res.render('index', { title: 'Okta Authentication' })
        } catch (err) {
            await writePool.query("INSERT INTO `exceptions`(`exception`,`function`) VALUES ?", [[[err.message, 'Home']]]);
			return res.badRequest(null, req.__("GENERAL_ERROR"))
        }
    }
    
    async Login(req, res) {
        try {
            const factor = null
            const { email, password } = req.body
            const hashPassword = await bcrypt.hash(password, 10)
            let emailExists = await readPool.query("SELECT `id`, `email` FROM `users` WHERE `email` = ? AND `is_active` = ? AND `is_deleted` = ?", [email, 1, 0])
            if(emailExists.length){
                factor = signIn(email, password)
                res.success({ factorId: factor.id })
            } else {
                const newUser = {
                    profile: {
                        firstName: 'firstName',
                        lastName: 'lastName',
                        email: email,
                        login: email
                    },
                    credentials: {
                        password: {
                            value: password
                        }
                    }
                }
                const response = await oktaClient.userApi.createUser({ body: newUser })
                const user = await oktaClient.userApi.getUser({ userId: response.id })
                const insertToSql = await writePool.query("INSERT INTO `users` (`firstName`, `lastName`, `Email`, `Password`, `username`, `given_name`, `is_active`, `is_deleted`) VALUES ?", [
                    [
                        [user?.profile?.firstName, user?.profile?.lastName, user?.profile?.email, hashPassword, user?.profile?.username, user?.profile?.given_name, 1, 0]
                    ]
                ])
                if(!insertToSql) return res.badRequest(null, req.__("GENERAL_ERROR"))
                factor = await signIn(user?.profile?.email, user?.credentials?.password)
                res.success({ factorId: factor.id })
            }
        } catch (err) {
            console.log(err.message)
            await writePool.query("INSERT INTO `exceptions`(`exception`,`function`) VALUES ?", [[[err.message, 'Login']]]);
			return res.badRequest(null, req.__("GENERAL_ERROR"))
        }
    }

    async verifyMFA(req, res) {
        try {
            const { otp } = req.body
            const transactionId = req.session.transactionId

            const authClient = oktaClient.auth
            const transaction = await authClient.verifyFactor({
                transactionId: transactionId,
                factorType: 'sms',
                passCode: otp
            })

            const tokenId = Tokens.decodeToken(transaction.tokens.tokenId)
            if(!tokenId) return res.badRequest(null, req.__('INVALID_OTP'))
            const expectedIssuer = `https://${process.env.OKTA_OAUTH2_ISSUER}/oauth2/default`
            const expectedAudience = 'api://default'
            const validationParams = {
                issuer: expectedIssuer,
                audience: expectedAudience,
                nonce: tokenId.nonce,
                maxClockSkew: 300
            }
            await assertIssuer(tokenId.issuer, validationParams.issuer)
            await tokens.verify(transaction.tokens.tokenId, validationParams)
            res.success({ tokenId: tokens.id_token })
        } catch (err) {
            await writePool.query("INSERT INTO `exceptions`(`exception`,`function`) VALUES ?", [[[err.message, 'verifyMFA']]]);
			return res.badRequest(null, req.__("GENERAL_ERROR"))
        }
    }

    async Dashboard(req, res) {
        try {
            const { userContext } = req
            if(!userContext){
                res.render("register", { title: "Register Page!" })
            } else {
                res.render("dashboard", {
                    title: `Welcome ${userContext?.userinfo.given_name}!`,
                    userContext: userContext?.userinfo,
                })
            }
        } catch (err) { 
            await writePool.query("INSERT INTO `exceptions`(`exception`,`function`) VALUES ?", [[[err.message, 'Dashboard']]]);
			return res.badRequest(null, req.__("GENERAL_ERROR"))
        }
    }

    async Logout(req, res) {
        try {
            req.logout()
            res.redirect('/auth')
        } catch (err) {
            await writePool.query("INSERT INTO `exceptions`(`exception`,`function`) VALUES ?", [[[err.message, 'Logout']]]);
			return res.badRequest(null, req.__("GENERAL_ERROR"))
        }
    }
}

module.exports = new AuthController()