export abstract class Builder<TData, TOutput> {
  constructor(protected readonly _data: TData, protected readonly _properties: Array<keyof TData>) {}
  abstract build(): TOutput;
}
