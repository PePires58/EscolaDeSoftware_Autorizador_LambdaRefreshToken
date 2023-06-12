exports.createTokenPutItem = function (token) {

    const treehours = Math.floor(Date.now() / 1000) + ((60 * 60) * 3);

    return {
        "jwt_token": {
            S: token
        },
        "expiration_time": {
            N: treehours.toString()
        }
    }
}