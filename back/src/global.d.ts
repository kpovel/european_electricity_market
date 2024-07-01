export declare global {
  type Result<T, E> =
    | {
        ok: T;
        err: null;
      }
    | {
        ok: null;
        err: E;
      };

  type Option<T> = T | null;
}

