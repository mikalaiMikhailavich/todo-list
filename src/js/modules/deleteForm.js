import { dataProvider } from "./data";
import { createButton } from "./createElements";

const buttonDeleteAll = createButton("button", "Delete All");
const buttonDeleteLast = createButton("button", "Delete Last");

function deleteALLTodoCards() {
  dataProvider.clear();
}

function deleteLast() {
  dataProvider.deleteLast();
}

function deleteTodoCard(index) {
  dataProvider.delete(index);
}

buttonDeleteAll.addEventListener("click", deleteALLTodoCards);
buttonDeleteLast.addEventListener("click", deleteLast);

export { buttonDeleteAll, buttonDeleteLast, deleteTodoCard };
