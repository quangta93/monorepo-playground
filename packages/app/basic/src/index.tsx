import { spawn, Worker } from "threads"
import { HashObservable, hashObservable as _hashObservable } from "./hash"

const init = async (): Promise<void> => {
  const hashObservable = await spawn<HashObservable>(new Worker("./worker.ts"))

  hashObservable().subscribe((num) => {
    document.querySelector("#root")!.innerHTML += `<p>BACKGROUND: ${num}</p>`
  })

  _hashObservable().subscribe((num) => {
    document.querySelector("#root")!.innerHTML += `<p>MAIN: ${num}</p>`
  })
}

init().catch((error) => {
  document.querySelector("#root")!.innerHTML = `<pre>${error.stack}</pre>`
})
