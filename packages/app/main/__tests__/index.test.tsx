import { LoginForm } from "~/LoginForm"
import { render } from "@testing-library/react"

test("Render login form without error", () => {
  const { getByPlaceholderText } = render(<LoginForm />)
  expect(getByPlaceholderText("username")).toBeInTheDocument()
})
