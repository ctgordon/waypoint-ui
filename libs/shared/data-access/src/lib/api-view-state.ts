import { Observable, catchError, map, of, startWith } from 'rxjs';

export type ApiViewState<T> =
  | {
      status: 'loading';
      data: null;
      error: null;
    }
  | {
      status: 'success';
      data: T;
      error: null;
    }
  | {
      status: 'error';
      data: null;
      error: unknown;
    };

export function toApiViewState<T>(
  source$: Observable<T>,
): Observable<ApiViewState<T>> {
  return source$.pipe(
    map((data) => ({
      status: 'success' as const,
      data,
      error: null,
    })),
    startWith({
      status: 'loading' as const,
      data: null,
      error: null,
    }),
    catchError((error) =>
      of({
        status: 'error' as const,
        data: null,
        error,
      }),
    ),
  );
}
