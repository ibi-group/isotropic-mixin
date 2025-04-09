# isotropic-mixin

[![npm version](https://img.shields.io/npm/v/isotropic-mixin.svg)](https://www.npmjs.com/package/isotropic-mixin)
[![License](https://img.shields.io/npm/l/isotropic-mixin.svg)](https://github.com/ibi-group/isotropic-mixin/blob/main/LICENSE)
![](https://img.shields.io/badge/tests-passing-brightgreen.svg)
![](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)

A utility that copies property descriptors from one object to another, preserving getters, setters, and property attributes.

## Why Use This?

- **Complete Property Copying**: Copies the entire property descriptor, not just values
- **Preserves Getters & Setters**: Maintains accessors and their shared state
- **Respects Property Attributes**: Preserves configurable, enumerable, and writable settings
- **Simple Implementation**: Uses modern JavaScript reflection APIs for clarity and reliability

## Installation

```bash
npm install isotropic-mixin
```

## Usage

```javascript
import _mixin from 'isotropic-mixin';

// Objects to work with
const _source = {
        name: 'Source Object',
        getValue () {
            return 42;
        }
    },
    _target = {
        id: 'target-123'
    };

// Mix source properties into target
_mixin(_source, _target);

// Target now has all properties from source
console.log(_target.name); // 'Source Object'
console.log(_target.getValue()); // 42
console.log(_target.id); // 'target-123' (original properties remain)
```

## How It Works

`isotropic-mixin` uses the `Reflect` API to:

1. Get all own property names from the source object (including non-enumerable properties)
2. Retrieve the full property descriptor for each property
3. Define each property on the target object with the same descriptor

This approach ensures all property characteristics (such as getters, setters, and property attributes) are preserved during the copy operation.

## API

### mixin(from, to)

Copies all own properties from the source object to the target object.

#### Parameters

- `from` (Object): The source object to copy properties from
- `to` (Object): The target object to copy properties to

#### Returns

- (undefined): The function doesn't return a value, but modifies the target object

## Examples

### Working with Getters and Setters

```javascript
import _mixin from 'isotropic-mixin';

// Source object with getter/setter
const _source = {
        get value () {
            return this._value;
        },
        set value (v) {
            this._value = v;
        },
        _value: 0
    },
    // Target object
    _target = {};

// Mix properties
_mixin(_source, _target);

// The getter/setter behavior is preserved
_target.value = 42;
console.log(_target.value); // 42
console.log(_target._value); // 42

// Changes to the internal state are shared
_source.value = 100;
console.log(_target.value); // 100
```

### Copying Non-Enumerable Properties

```javascript
import _mixin from 'isotropic-mixin';

const _source = {},
    _target = {};

// Source with non-enumerable property
Object.defineProperty(_source, 'hidden', {
    enumerable: false,
    value: 'I am hidden'
});

// Standard Object.assign doesn't copy non-enumerable properties
Object.assign(_target, _source);
console.log(Object.getOwnPropertyNames(_target)); // []

// isotropic-mixin does copy non-enumerable properties
_mixin(_source, _target);
console.log(Object.getOwnPropertyNames(_target)); // ['hidden']
console.log(target.hidden); // 'I am hidden'
```

### Extending Configuration Objects

```javascript
import _mixin from 'isotropic-mixin';

// Default configuration
const _defaultConfig = {
        fontSize: 14,
        get isDarkMode () {
            return this.theme === 'dark';
        }
        showNotifications: true,
        theme: 'light'
    },

    // Apply user configuration
    _createConfig = userConfig => {
        const config = {};

        // Apply defaults first
        _mixin(_defaultConfig, config);

        // Then apply user overrides
        if (userConfig) {
            _mixin(userConfig, config);
        }

        return config;
    };

{
    // Create configurations
    const defaultUserConfig = _createConfig();

    console.log(defaultUserConfig.theme); // 'light'
    console.log(defaultUserConfig.isDarkMode); // false

    const darkModeConfig = _createConfig({
        theme: 'dark'
    });

    console.log(darkModeConfig.theme); // 'dark'
    console.log(darkModeConfig.isDarkMode); // true
}
```

## Contributing

Please refer to [CONTRIBUTING.md](https://github.com/ibi-group/isotropic-mixin/blob/main/CONTRIBUTING.md) for contribution guidelines.

## Issues

If you encounter any issues, please file them at https://github.com/ibi-group/isotropic-mixin/issues
