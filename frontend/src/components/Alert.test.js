import { render, screen } from "@testing-library/react"
import Alert from "./Alert"

/* Test cases for Alert component */
test('Alert should come after adding the task', () => {
  render(<Alert alert={{msg: "Task Added SucessFully", type: "success"}}/>)
  const alertElement = screen.getByText(/Task Added SucessFully/i)
  expect(alertElement).toBeInTheDocument()
  expect(alertElement).toHaveClass('alert-success');
})

test('Alert should come if same title already exists', () => {
  render(<Alert alert={{msg: "Title Already Exists", type: "danger"}}/>)
  const alertElement = screen.getByText(/Title Already Exists/i)
  expect(alertElement).toBeInTheDocument()
  expect(alertElement).toHaveClass('alert-danger');
})

test('Alert should come after deleting the task', () => {
    render(<Alert alert={{msg: "Deleted Successfully", type: "success"}}/>)
    const alertElement = screen.getByText(/Deleted Successfully/i)
    expect(alertElement).toBeInTheDocument()
    expect(alertElement).toHaveClass('alert-success');
  })

test('Alert should come after editing the task', () => {
    render(<Alert alert={{msg: "Updated Successfully", type: "success"}}/>)
    const alertElement = screen.getByText(/Updated Successfully/i)
    expect(alertElement).toBeInTheDocument()
    expect(alertElement).toHaveClass('alert-success');
  })

test('Alert should come if some error occured during editing', () => {
    render(<Alert alert={{msg: "Error Ocurred", type: "danger"}}/>)
    const alertElement = screen.getByText(/Error Ocurred/i)
    expect(alertElement).toBeInTheDocument()
    expect(alertElement).toHaveClass('alert-danger');
  })