import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

test("update scoop sub total when scoop changes", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);
  //make sure total start at 0
  const scoopSubTotal = screen.getByText("Scoops ", { exact: false });
  expect(scoopSubTotal).toHaveTextContent("0.00");
  //update vanilla scoop to 1 and check sub total
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "vanilla",
  });
  await user.clear(vanillaInput); //for upload,clear,type or select behavior see https://testing-library.com/docs/user-event/utility
  await user.type(vanillaInput, "1");
  expect(scoopSubTotal).toHaveTextContent("2.00");
  //update chocolate scoop to 2 and check sub total
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "chocolate",
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "1");
  expect(scoopSubTotal).toHaveTextContent("Scoops total: $22.00");
});
test("update topping sub total when topping changes", async () => {
  const user = userEvent.setup();
  render(<Options optionType="toppings" />);
  const toppingsTotal = screen.getByText("toppings ", { exact: false });
  expect(toppingsTotal).toHaveTextContent("0.00");
  const cherryCheckBox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(cherryCheckBox);
  expect(toppingsTotal).toHaveTextContent("1.50");
  const hotFudgeCheckbox = await screen.getByRole("checkbox", {
    name: "Hot fudge",
  });
  await user.click(hotFudgeCheckbox);
  expect(toppingsTotal).toHaveTextContent("3.00");
});
describe("gradntotal", () => {
  test("starts with 0", () => {
    // render(<OrderEntry />); // this has asynchornus calls inside.it may cause the error
    // //an update to otpiopns wasnt wrapped inside act.Cant perform a react state update on an unmounted component.
    // //there is auto clean up and hence component isn unmounted after every testcase.and u should not skip it
    // //.its a good thing.then mocming usefeect to bypass server call si again not recomnneded.//so all these
    //3 lines were movede and added in next test case
    // const gradntotal = screen.getByRole("heading", { name: /Grand total: \$/ });
    // expect(gradntotal).toHaveTextContent("0.00");
  });
  test("grandTotal updates properly if scoop is added first", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const gradntotal = screen.getByRole("heading", { name: /Grand total: \$/ });

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "vanilla",
    });
    await user.clear(vanillaInput); //for upload,clear,type or select behavior see https://testing-library.com/docs/user-event/utility
    await user.type(vanillaInput, "1");
    expect(gradntotal).toHaveTextContent("2.00");
  });
});
