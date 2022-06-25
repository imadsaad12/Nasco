import Create from "../index";
import { fireEvent, render, screen } from "@testing-library/react";


import { BrowserRouter } from "react-router-dom";
const MockCreate = () => {
  return (
    <BrowserRouter>
      <Create />
    </BrowserRouter>
  );
};
describe("Create", () => {
  beforeEach(() => {
    render(<MockCreate />);
  });
  it("should be disbaled ",  () => {
    const buttonElement =  screen.getByRole("button");
    expect(buttonElement).toHaveAttribute('disabled');
  });
  it("should not be disabled ",  () => {
    const buttonElement =  screen.getByRole("button");
    const field1Element =  screen.getByTestId(/name/i);
    const field2Element =  screen.getByTestId(/email/i);
    const field3Element =  screen.getByTestId(/jobTitle/i);
    const field4Element =  screen.getByTestId(/image/i);
    const field5Element =  screen.getByTestId(/department/i);

    fireEvent.change(field1Element,{target:{value:"a"}})
    fireEvent.change(field2Element,{target:{value:"a"}})
    fireEvent.change(field3Element,{target:{value:"a"}})
    fireEvent.change(field4Element,{target:{value:"a"}})
    fireEvent.change(field5Element,{target:{value:"a"}})
    setTimeout(() => {
        expect(buttonElement).not.toHaveAttribute('disabled');
    }, 1000);
    
  });
  
});
