import { expose } from "threads/worker"

const workerApi = {
  hash: (): number => {
    return Math.round(Math.random() * 10e8)
  },
}

export type WorkerApi = typeof workerApi

expose(workerApi)
