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
    if (this._properties.includes('color') && !this._data.color) {
      throw new Error('color is required');
    }
    if (this.isSportCar()) {
      return { carType: 'sport' };
    }
    return { carType: 'van' };
  }

  private isSportCar(): boolean {
    return this._data.color === 'red' && this._data.engine === 'V8' && this._data.doors === 3;
  }
}

describe('BuilderGuard', () => {
  it('should build desired object', () => {
    const builder = createBuilderGuard(CarTypeBuilder);
    const carTypeResult = builder.color('red').doors(3).engine('V8').build();
    expect(carTypeResult).toEqual({
      carType: 'sport',
    });
  });
  it('should build another desired object', () => {
    const builder = createBuilderGuard(CarTypeBuilder);
    const carTypeResult = builder.color('blue').doors(5).engine('V6').build();
    expect(carTypeResult).toEqual({
      carType: 'van',
    });
  });
  it('should throw error implemented in business logic', () => {
    const builder = createBuilderGuard(CarTypeBuilder);
    expect(() => builder.color(undefined).doors(5).engine('V6').build()).toThrowError('color is required');
  });
});
