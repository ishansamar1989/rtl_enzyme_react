import { render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

test("initial set up checkbox unchecked and button disabled", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  expect(checkbox).not.toBeChecked();
  const button = screen.getByRole("button", { name: /confirm order/i });
  expect(button).toBeDisabled();
});

test(" checkbox checked and button enabled", async () => {
  const user = userEvent.setup(); //replacing firevent with userEvent
  render(<SummaryForm />);
  const button = screen.getByRole("button", { name: /confirm order/i });
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  await user.click(checkbox);
  expect(button).toBeEnabled();
  await user.click(checkbox);
  expect(button).toBeDisabled();
});
test("popover responds to hover", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);
  //popover startas as hidden
  const nullPopOver = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopOver).toBeNull();
  //popover appearson mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  await user.hover(termsAndConditions);
  const PopOver = screen.getByText(/no ice cream will actually be delivered/i);
  expect(PopOver).toBeInTheDocument();

  //popover disapperas when mouse out
  await user.unhover(termsAndConditions);
  const nullPopOverAgain = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopOverAgain).toBeNull();
});
