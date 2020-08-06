import React, { FC } from "react"
import { TextField, FormControl } from "@material-ui/core"

export const LoginForm: FC = () => (
  <FormControl>
    <TextField placeholder="username" />
    <TextField placeholder="password" type="password" />
  </FormControl>
)
