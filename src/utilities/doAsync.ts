export function doAsync<F extends AnyFunction>(
  f?: F
): (...args: Parameters<F>) => Promise<ReturnType<F>> {
  return (...args): Promise<ReturnType<F>> =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const result = f?.(...args);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }, 1);
    });
}

type AnyFunction = (...args: any) => any; //eslint-disable-line @typescript-eslint/no-explicit-any
