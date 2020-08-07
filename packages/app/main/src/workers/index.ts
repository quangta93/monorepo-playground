import { expose } from "threads/worker"
import { Observable, interval } from "rxjs"
import { map } from "rxjs/operators"
import { hash } from "~/utils/hash"

export interface HashResult {
  num: number
}

const workerApi = {
  hash: (): Observable<HashResult> => {
    return interval(1000).pipe(
      map(() => ({
        num: hash(),
      })),
    )
  },
}

export type WorkerApi = typeof workerApi

expose(workerApi)
