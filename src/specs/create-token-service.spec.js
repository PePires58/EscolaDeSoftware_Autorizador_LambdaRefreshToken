const assert = require('assert').strict;
const createToeknService = require('../services/create-token.service');

describe('Validate credentials object service tests', function () {
    it('Should create a token', function () {
        const parameterSecret = {
            Parameter: {
                Value: 'minhaChave'
            }
        };

        const token = createToeknService.createToken({
            'email': 'pedrao@gmail.com'
        }, parameterSecret);

        assert.notEqual('', token);
    });
});