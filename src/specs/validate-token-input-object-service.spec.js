const assert = require('assert').strict;
const validateTokenInputObjectService = require('../services/validate-token-input-object.service');

describe('Validate token input object service tests', function () {
    it('Should have an error "Objeto de token é obrigatório"', function () {
        const errors = validateTokenInputObjectService.validateTokenInputService({});

        assert.ok(errors.length > 0);
        assert.ok(errors.find(c => c === "Objeto de token é obrigatório"));
    });


    it('Should have an error "Token de autorização é obrigatório"', function () {
        const tokenObjectInput = {
            authorizationToken: ''
        }

        const errors = validateTokenInputObjectService.validateTokenInputService(tokenObjectInput);

        assert.ok(errors.length > 0);
        assert.ok(errors.find(c => c === "Token de autorização é obrigatório"));
    });

    it('Should not have errors', function () {
        const tokenObjectInput = {
            authorizationToken: ' [token]'
        }

        const errors = validateTokenInputObjectService.validateTokenInputService(tokenObjectInput);

        assert.equal(0, errors.length);
    });
});