# isotropic-mixin Changelog

## 0.14.1 - 2026-08-23

### Changed

- Recommends `node ^26.7.0` / `npm ^11.19.0`.
- `repository` now uses npm's preferred object form with explicit `type` and `url` properties rather than the `github:` shorthand. This is package metadata only.

No runtime behavior changed in this release.

## 0.14.0 - 2026-07-15

### Breaking changes

**The package now ships source directly instead of a Babel build.** `lib/mixin.js` is the original, unminified ES module source rather than transpiled and minified output. The source moved from `js/` to `lib/` in the repository, so published code now has readable identifiers and accurate line numbers in stack traces. Build artifacts such as minified names or inline source maps are gone.

The entry point and the exported function are unchanged.

#### Migration

Nothing to change beyond running on Node 26.

### Changed

- `description` rewritten and `keywords` expanded for npm discoverability.
- Recommends `node ^26.5.0` / `npm ^11.17.0`.

### Internal

- Test suite migrated from Mocha to the built-in `node --test` runner; assertions still use Chai.
- The Babel toolchain (`@babel/cli`, `@babel/core`, `@babel/preset-env`, `babel-preset-minify`, `babel-plugin-transform-line`) and the `build` / `prepare` build scripts were removed.
- `isotropic-dev-dependencies` updated to `~0.4.0`.
- The separately pinned `eslint` dev dependency was dropped, since the correct version now comes from `isotropic-dev-dependencies`.

## 0.13.1 - 2025-04-10

### Changed

- A comprehensive README was added, documenting the full public interface with examples.
- `eslint` pinned at `~9.8.0` as a direct dev dependency to guarantee the intended version is installed.
- `isotropic-dev-dependencies` bumped to `~0.3.1`.

No runtime behavior changed in this release.

## 0.13.0 - 2024-07-30

### Breaking changes

**The package is now an ES module.** `"type": "module"` was added to `package.json`. CommonJS consumers can no longer `require('isotropic-mixin')`.

#### Migration

Switch to `import`:

```javascript
// Before
const _mixin = require('isotropic-mixin');

// After
import _mixin from 'isotropic-mixin';
```

### Changed

- ESLint moved to flat config (`eslint.config.js`) so the `eslintConfig` block was removed from `package.json`.
- Coverage tooling switched from `nyc` to `c8`.
- `repository` given an explicit `github:` prefix.
- The `forEach` callback body was rewritten as a block statement rather than a concise arrow expression, so it no longer returns the result of `Reflect.defineProperty`. `forEach` discards return values, so behavior is identical.
- Recommends `node ^22.5.1` / `npm ^10.8.2`.

No runtime behavior changed in this release.

## 0.12.0 - 2021-02-22

### Changed

- The entire dev toolchain was replaced by a single `isotropic-dev-dependencies` dev dependency.
- The Babel, ESLint, and nyc configuration blocks were removed from `package.json` in favor of shared configuration.
- Git hooks are now installed via Husky on `postinstall`.
- Recommends `node ^14.15.5` / `npm ^7.5.4`

No runtime behavior changed in this release.

## 0.11.0 - 2020-07-27

### Changed

- A `files` allowlist was added so only `lib` is published.
- `.npmignore` was removed.
- Dependency refresh: ESLint 7, Mocha 8, nyc 15, Babel 7.10, `cross-env` 7.
- Lint target raised to ECMAScript 2020.
- Recommends `node ^12.18.3` / `npm ^6.14.6`.

No runtime behavior changed in this release.

## 0.10.0 - 2019-05-10

### Changed

- Added the `isotropic` keyword to `package.json`.
- Lint cleanup.
- Dependency bumps.

No runtime behavior changed in this release.

## 0.9.2 - 2019-05-08

### Changed

Dev dependency bumps only.

## 0.9.1 - 2019-05-08

### Changed

Dev dependency bumps only.

## 0.9.0 - 2019-05-08

### Changed

- Dev dependency refresh (Babel 7.4, Mocha 6, nyc 14, ESLint 5.16).
- Recommends `node ^10.15.3` / `npm ^6.4.1`.

No runtime behavior changed in this release.

## 0.8.0 - 2019-02-18

### Changed

- Dev dependency refresh.
- Recommends `node ^10.15.1` / `npm ^6.4.1`.

No runtime behavior changed in this release.

## 0.7.0 - 2018-11-25

### Changed

- Migrated from Babel 6 to Babel 7, and from `babel-istanbul` to `nyc` for coverage.
- Dropped the `nsp` security check, which was discontinued in favor of `npm audit`.
- Lint target raised to ECMAScript 2018.
- Recommends `node ^10.13.0` / `npm ^6.4.1`.

No runtime behavior changed in this release.

## 0.6.0 - 2017-09-12

**The `babel-runtime` runtime dependency was removed.** Babel's `transform-runtime` plugin was dropped in favor of targeting the running Node.js version directly, so the package no longer pulls `babel-runtime` into your dependency tree. This package now has no runtime dependencies outside the Isotropic family.

### Changed

- ESLint configuration moved from `eslint-config-isotropic` to the `plugin:isotropic/isotropic` shared config provided by `eslint-plugin-isotropic`.
- Recommends `node ^8.4.0` / `npm ^5.4.1`.

This release makes `isotropic-mixin` dependency-free. No runtime behavior changed.

## 0.5.0 - 2017-02-05

### Changed

- Dependency bumps.
- Recommends `node ^6.9.5` / `npm ^4.1.2`.

No runtime behavior changed in this release.

## 0.4.0 - 2017-01-08

### Changed

- Dependency bumps.
- Recommends `node ^6.9.4` / `npm ^4.1.1`.

No runtime behavior changed in this release.

## 0.3.0 - 2016-11-27

### Changed

- The deprecated `prepublish` script was replaced by `prepare` (build) and `prepublishOnly` (test and security check), so installing this package as a dependency no longer runs its test suite.
- Lint target raised to ECMAScript 2017.
- Recommends `node ^6.9.1` / `npm ^4.0.2`.

No runtime behavior changed in this release.

## 0.2.0 - 2016-07-14

### Changed

- `babel-runtime` bumped to `~6.9.1`.
- Dev dependency refresh.

No runtime behavior changed in this release.

## 0.1.0 - 2016-05-02

Initial release.

- Default export is a function `(from, to)` that copies every own property of `from` onto `to`.
- Uses `Reflect.ownKeys`, so both string-keyed and symbol-keyed own properties are copied, including non-enumerable ones.
- Copies via `Reflect.getOwnPropertyDescriptor` and `Reflect.defineProperty`, so getters and setters are transferred as accessors rather than being invoked, and enumerability, writability, and configurability are preserved. This is the key difference from `Object.assign`.
- Requires `babel-runtime` at runtime.
