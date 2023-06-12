exports.validateTokenInputService = function (tokenInput) {
    let errors = [];

    if (!tokenInput || Object.keys(tokenInput).length === 0) {
        errors.push('Objeto de token é obrigatório');
    }
    else {
        if (!tokenInput.authorizationToken)
            errors.push('Token de autorização é obrigatório');
    }

    return errors;
}