<h1 align="center" style="border-bottom: none;">Builder Guard</h1>
<h3 align="center">Uses TypeScript to guard builders when providing data</h3>
<p align="center">
  <a href="https://www.npmjs.com/package/@sebowy/builder-guard"><img alt="npm latest version" src="https://img.shields.io/npm/v/@sebowy/builder-guard/latest.svg"></a>
  <a href="https://github.com/sebastianowy/builder-guard/actions?query=workflow%3ATest+branch%3Amain"><img alt="Build states" src="https://github.com/sebastianowy/builder-guard/workflows/Test/badge.svg"></a>
  <a href="https://github.com/semantic-release/semantic-release"><img alt="semantic-release" src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg"></a>
</p>

## Installation

```bash
npm install --save @sebowy/builder-guard
# or
yarn add @sebowy/builder-guard
```

## Usage

### Examples

- examples with timeouts

```js
import createBuilderGuard, { Builder } from '.';

interface ICarData {
  color: 'red' | 'green' | 'blue';
  doors: 3 | 5;
  engine: 'V6' | 'V8';
}

interface ICarTypeResult {
  carType: 'sport' | 'van';
}

class CarTypeBuilder extends Builder<ICarData, ICarTypeResult> {
  build(): ICarTypeResult {
    if (this.isSportCar()) {
      return { carType: 'sport' };
    }
    return { carType: 'van' };
  }

  private isSportCar(): boolean {
    return this._data.color === 'red' && this._data.engine === 'V8' && this._data.doors === 3;
  }
}

const builder = createBuilderGuard(CarTypeBuilder);
const carTypeResult = builder
  .color('red')
  .doors(3)
  .engine('V8')
  // build method is not available until all properties are set
  .build();
```
