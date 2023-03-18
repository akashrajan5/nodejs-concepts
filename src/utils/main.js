function splitToken(token = "") {
    if (token && token.split(' ')[0] == 'Bearer') {
        return token.split(' ')[1];
    }
}

module.exports = { splitToken };