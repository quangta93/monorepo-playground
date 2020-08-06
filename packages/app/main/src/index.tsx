import React from "react"
import ReactDOM from "react-dom"
import { Worker, spawn, Thread } from "threads"
import { WorkerApi } from "./index.worker"
import "./index.css"

const init = async (): Promise<number> => {
  const worker = await spawn<WorkerApi>(new Worker("./index.worker.ts"))
  const num = await worker.hash()

  await Thread.terminate(worker)
  return num
}

init()
  .then((num: number): void => {
    ReactDOM.render(
      <div>Hello World! {num}!</div>,
      document.getElementById("root"),
    )
  })
  .catch((error): void => {
    document.body.innerHTML = `<pre>${error.stack}</pre>`
  })
