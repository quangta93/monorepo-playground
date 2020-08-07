import { expose } from "threads/worker"
import { hashObservable } from "./hash"

expose(hashObservable)
