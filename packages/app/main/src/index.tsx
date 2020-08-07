import { DISPLAY_NAME } from "@local/sub"
import { Container, CssBaseline } from "@material-ui/core"
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles"
import React, { FC, useEffect, useRef, useState } from "react"
import ReactDOM from "react-dom"
import { Subscription } from "rxjs"
import { spawn, Thread, Worker, ModuleThread } from "threads"
import { WorkerApi } from "~/workers"
import "./index.css"

const theme = createMuiTheme({
  palette: {
    type: "dark",
    background: {
      default: "#121212",
    },
  },
})

const HelloWorld: FC = () => {
  const workerRef = useRef<any>()
  const subRef = useRef<Subscription>()
  const [num, setNum] = useState<number>(0)

  useEffect(() => {
    spawn<WorkerApi>(new Worker("~/workers/index.ts")).then(
      (_worker: ModuleThread<WorkerApi>) => {
        workerRef.current = _worker

        subRef.current = (workerRef.current as WorkerApi)
          .hash()
          .subscribe((result): void => setNum(result.num))
      },
    )

    return () => {
      if (subRef.current) {
        subRef.current.unsubscribe()
      }

      if (workerRef.current) {
        Thread.terminate(workerRef.current)
      }
    }
  }, [workerRef])

  return <span>Hello World! ${num}</span>
}

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Container maxWidth="md" className="m-10">
      <HelloWorld />
      <br />
      Hello from sub-package {DISPLAY_NAME}
    </Container>
  </ThemeProvider>,
  document.getElementById("root"),
)
