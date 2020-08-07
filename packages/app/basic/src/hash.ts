import { Observable, interval } from "rxjs"
import { map } from "rxjs/operators"

export const hashObservable = (): Observable<number> =>
  interval(500).pipe(map(() => Math.round(Math.random() * 10e9)))

export type HashObservable = typeof hashObservable
