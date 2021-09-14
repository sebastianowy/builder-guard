type IBuilderGuardBuild<TGuard, TData, TResult> = TGuard extends TData
  ? {
      build: () => Promise<TResult>;
    }
  : unknown;
type IBuilderGuardSetters<TData, TResult, TGuard> = {
  [TProp in keyof TData]-?: (
    value: TData[TProp],
  ) => IBuilderGuard<Omit<TData, TProp>, TResult, TGuard & Record<TProp, TData[TProp]>>;
};
export type IBuilderGuard<TData, TResult, TGuard = Record<string, unknown>> = IBuilderGuardSetters<
  TData,
  TResult,
  TGuard
> &
  IBuilderGuardBuild<TGuard, TData, TResult>;
