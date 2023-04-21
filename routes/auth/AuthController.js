class AuthController {
    async Home(req, res) {
        try {
            res.render('register', { title: 'Okta Authentication' })
        } catch (err) {
            await writePool.query("INSERT INTO `exceptions`(`exception`,`function`) VALUES ?", [[[err.message, 'Home']]]);
			return res.badRequest(null, req.__("GENERAL_ERROR"))
        }
    }
    
    async Register(req, res) {
        try {
            
        } catch (err) {
            await writePool.query("INSERT INTO `exceptions`(`exception`,`function`) VALUES ?", [[[err.message, 'Register']]]);
			return res.badRequest(null, req.__("GENERAL_ERROR"))
        }
    }

    async Dashboard(req, res) {
        try {
            const { userContext } = req
            if(!userContext){
                res.render("register", { title: "Register Page!" })
            } else {
                res.render("dashboard", userContext?.userinfo)
            }
        } catch (err) {
            await writePool.query("INSERT INTO `exceptions`(`exception`,`function`) VALUES ?", [[[err.message, 'Dashboard']]]);
			return res.badRequest(null, req.__("GENERAL_ERROR"))
        }
    }

    async Logout(req, res) {
        try {
            req.logout()
            res.redirect('/')
        } catch (err) {
            await writePool.query("INSERT INTO `exceptions`(`exception`,`function`) VALUES ?", [[[err.message, 'Logout']]]);
			return res.badRequest(null, req.__("GENERAL_ERROR"))
        }
    }
}

module.exports = new AuthController()