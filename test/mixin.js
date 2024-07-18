import _chai from 'isotropic-dev-dependencies/lib/chai.js';
import _mixin from '../js/mixin.js';
import _mocha from 'isotropic-dev-dependencies/lib/mocha.js';

_mocha.describe('mixin', () => {
    _mocha.it('should be a function', () => {
        _chai.expect(_mixin).to.be.a('function');
    });

    _mocha.it('should copy own properties from one object to another', () => {
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

        _mixin(from, to);

        [
            'a',
            'b',
            'c',
            'd',
            'e'
        ].forEach(propertyName => {
            _chai.expect(Reflect.getOwnPropertyDescriptor(to, propertyName)).to.deep.equal(Reflect.getOwnPropertyDescriptor(from, propertyName));
        });

        _chai.expect(from).to.have.property('d', 0);
        _chai.expect(to).to.have.property('d', 0);
        from.d = 1;
        _chai.expect(from).to.have.property('d', 1);
        _chai.expect(to).to.have.property('d', 1);
        to.d = 2;
        _chai.expect(from).to.have.property('d', 2);
        _chai.expect(to).to.have.property('d', 2);
        _chai.expect(to).to.have.property('e', 'e');
    });
});
