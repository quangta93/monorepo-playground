import React from "react"
import ReactDOM from "react-dom"
import { Worker, spawn, Thread } from "threads"
import { WorkerApi } from "./index.worker"
import { Container, CssBaseline } from "@material-ui/core"
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import "./index.css"

const init = async (): Promise<number> => {
  const worker = await spawn<WorkerApi>(new Worker("./index.worker.ts"))
  const num = await worker.hash()

  await Thread.terminate(worker)
  return num
}

const theme = createMuiTheme({
  palette: {
    type: "dark",
    background: {
      default: "#121212",
    },
  },
})

init()
  .then((num: number): void => {
    ReactDOM.render(
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="md" className="m-10 text-lg">
          Hello World! {num}!
        </Container>
      </ThemeProvider>,
      document.getElementById("root"),
    )
  })
  .catch((error): void => {
    document.body.innerHTML = `<pre>${error.stack}</pre>`
  })
