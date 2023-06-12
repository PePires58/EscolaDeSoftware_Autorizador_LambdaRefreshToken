const assert = require('assert').strict;
const createToeknService = require('../services/create-token.service');

describe('Validate credentials object service tests', function () {
    it('Should create a token', function () {
        const token = createToeknService.createToken({
            'email': 'pedrao@gmail.com'
        }, 'minhaChave');

        assert.notEqual('', token);
    });
});