exports.createTokenPutItem = function (token) {

    const twoDays = adicionarHoras(48);

    return {
        "jwt_token": {
            S: token
        },
        "expiration_time": {
            N: twoDays.toString()
        }
    }
}

function adicionarHoras(horasAdicionar) {
    return Math.floor(Date.now() / 1000) + ((60 * 60) * horasAdicionar)
}