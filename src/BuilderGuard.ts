import { Builder } from '.';
import { IBuilderGuard } from './IBuilderGuard';

export function createBuilderGuard<TData, TResult>(
  BuilderClass: new (_data: TData, _properties: Array<keyof TData>) => Builder<TData, TResult>,
): IBuilderGuard<TData, TResult> {
  const data: Partial<TData> = {};
  const properties: Array<keyof TData> = [];

  const proxy: IBuilderGuard<TData, TResult> = new Proxy(Object.create(null), {
    get<TProp extends keyof TData & 'build'>(_: unknown, property: TProp): unknown {
      if (property === 'build') {
        const builder = new BuilderClass(data as TData, properties);
        return builder.build.bind(builder);
      }

      return (value: TData[TProp]): unknown => {
        if (!properties.includes(property)) {
          properties.push(property);
        }
        data[property] = value;
        return proxy;
      };
    },
  });

  return proxy;
}
