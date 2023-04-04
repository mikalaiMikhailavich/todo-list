import { dataProvider } from "./data";
import { createButton, createInput } from "./createElements";

const inputEnterText = createInput(
  "input-text",
  "text",
  "inputEnterText",
  "Enter todo..."
);

const buttonAddTodoCard = createButton("button", "Add");

function addTodoCard() {
  if (!inputEnterText.value) {
    return;
  }
  dataProvider.add(inputEnterText.value);
  inputEnterText.value = "";
}

buttonAddTodoCard.addEventListener("click", () => addTodoCard());

export { inputEnterText, buttonAddTodoCard };
