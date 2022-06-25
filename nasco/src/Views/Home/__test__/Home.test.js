import Home from "../index";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
const MockHome = () => {
  return (
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
};

jest.mock("axios", () => ({
  default: () => Promise.resolve({ data: { employees: [], totalPages: 10 } }),
  get: () =>
    Promise.resolve({
      data: {
        employees: [
          {
            name: "markk John",
            email: "markkos.john@gmail.com",
            jobTitle: "Engineer",
            department: "Info xor",
            _id: "62b71889c42257411548cfc4",
          }
        ],
        totalPages: 10,
      },
    }),
}));
describe("Home", () => {
  beforeEach(() => {
    render(<MockHome />);
  });
  it("should display Employe item ", async () => {
    const employeeName = await screen.findByText(/markk john/i);
    const employeeEmail = await screen.findByText(/markkos.john@gmail.com/i);
    expect(employeeName).toBeInTheDocument();
    expect(employeeEmail).toBeInTheDocument();
  });
  it("should delete Employe item ", async () => {
    const deleteElement = await screen.findByText(/Delete/i);
    const employeeName = await screen.findByText(/markk john/i);

    fireEvent.click(deleteElement)

    expect(employeeName).not.toBeInTheDocument();
  });
  
});
