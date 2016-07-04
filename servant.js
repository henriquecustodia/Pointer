'use strict';

const Path = require('path');
const PointerError = require('./servantError');

let storage = new Map();

module.exports = class Pointer {
    static map(config) {
        for (let prop in config) {

            let path = config[prop];

            if (typeof path !== 'string') {
                throw new PointerError('The path has to be a String type');
            }

            path = './' + Path.relative(__dirname, path);

            storage.set(prop, path);
        }
    }

    static get(dependency) {
        if (!storage.has(dependency)) {
            throw new PointerError(`Has not pointer for '${dependency}'`);
        }

        let path = storage.get(dependency);
        return require(path);
    }
}