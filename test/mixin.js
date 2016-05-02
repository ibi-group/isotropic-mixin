import {
    describe,
    it
} from 'mocha';

import {
    expect
} from 'chai';

import mixin from '../js/mixin.js';

describe('mixin', () => {
    it('should be a function', () => {
        expect(mixin).to.be.a('function');
    });

    it('should copy own properties from one object to another', () => {
        let d = 0;

        const from = {
                a: 1,
                b: '2',
                c: null,
                get d () {
                    return d / 2;
                },
                set d (value) {
                    d = value * 2;
                }
            },
            to = {};

        Reflect.defineProperty(from, 'e', {
            value: 'e'
        });

        mixin(from, to);

        [
            'a',
            'b',
            'c',
            'd',
            'e'
        ].forEach(propertyName => expect(Reflect.getOwnPropertyDescriptor(to, propertyName)).to.deep.equal(Reflect.getOwnPropertyDescriptor(from, propertyName)));

        expect(from).to.have.property('d', 0);
        expect(to).to.have.property('d', 0);
        from.d = 1;
        expect(from).to.have.property('d', 1);
        expect(to).to.have.property('d', 1);
        to.d = 2;
        expect(from).to.have.property('d', 2);
        expect(to).to.have.property('d', 2);
        expect(to).to.have.property('e', 'e');
    });
});
