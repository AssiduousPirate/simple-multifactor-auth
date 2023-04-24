const fs = require("fs")
const path = require("path")

const languages = {};

(() => {
    const dirFiles = path.join(__dirname, "..", "locale")
    const files = fs.readdirSync(dirFiles)

    files.forEach((filename) => {
        const languageName = filename.split(".")[0]
        languages[languageName] = require(path.join(dirFiles, filename))
    })
})()

const __ = function (key, ...params) {
    const language = this.headers["language"]
    const i10n = languages[language] || languages["en"]
    let message = i10n[key] || key
    let position = 0
    params.forEach((param) => {
        message = message.replace(new RegExp("\\{" + position + "}"), param)
        position++
    })
    return message
}

module.exports = {
    __,
    languages
}