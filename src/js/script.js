import { dataProvider, showOnlyChecked } from "./modules/data";
import {
  createBlock,
  createButton,
  createInput,
  createLabel,
} from "./modules/createElements";

import { header, headerRow, headerRowNext } from "./modules/header";
import { savePageBeforeReload, loadPage } from "./modules/localStorage";
import {
  buttonDeleteAll,
  buttonDeleteLast,
  deleteTodoCard,
} from "./modules/deleteForm";

import {
  allTasksCounter,
  copmletedTasksCounter,
  rewriteCounterAllTasks,
  rewriteCompletedTaskCounter,
} from "./modules/counters";

import { inputEnterText, buttonAddTodoCard } from "./modules/addForm";

const app = document.querySelector(".app");
//buttons

const buttonShowAll = createButton("button button_large", "Show All");
const buttonShowCompleted = createButton(
  "button button_large",
  "Show Copmleted"
);

//inputs

const inputSearch = createInput(
  "input-text",
  "text",
  "inputSearch",
  "Enter Search"
);

//spans

const containerTodo = createBlock("div", "container", "");

// eventListeners actions

function searchTodoCards(searchQuery) {
  let searchResults = dataProvider
    .read()
    .filter((todo) => todo.text.includes(searchQuery));

  searchResults.forEach((card, index) => createTodoCard(card, index));
}

function reloadTodoCard(showOnlyCheckedLocal) {
  if (showOnlyCheckedLocal) {
    dataProvider
      .read()
      .filter((card) => card.isChecked)
      .forEach((card, index) => createTodoCard(card, index));
  } else {
    dataProvider.read().forEach((card, index) => createTodoCard(card, index));
  }
}

function cleanContainer() {
  containerTodo.innerHTML = null;
}

function addOrRemoveCheckBox(index, todo, todoTaskName, todoCard) {
  todo.isChecked = !todo.isChecked;
  dataProvider.update(index, todo);
  todoTaskName.classList.toggle("checkedText");
  todoCard.classList.toggle("backgroundChecked");
}

function saveRenamedTask(index, todo, text, todoTaskName) {
  todo.text = text;
  dataProvider.update(index, todo);
  todoTaskName.innerHTML = text;
}

function hideOrShowEditField(
  inputRenamedText,
  buttonCancel,
  buttonSave,
  boolean
) {
  inputRenamedText.hidden = boolean;
  buttonCancel.hidden = boolean;
  buttonSave.hidden = boolean;
}

function hideOrShowTaskNameAndButtonEdit(
  inputRenamedText,
  todoTaskName,
  buttonEdit,
  boolean,
  todo
) {
  inputRenamedText.value = todo;
  inputRenamedText.placeholder = todo;
  todoTaskName.hidden = boolean;
  buttonEdit.hidden = boolean;
}

function createTodoCard(todo, id) {
  const todoCard = createBlock("div", "todo");
  const checkBox = createInput("checkCompleted", "checkbox", id, "");
  const checkBoxLabel = createLabel(id);
  const todoTaskName = createBlock("span", "taskName", todo.text);
  const buttonAndTimeContainer = createBlock("div", "toDoBlock__inner", "");
  const buttonDelete = createButton("button button_small", "X");
  const dateBlock = createBlock("div", "date-window", todo.date);
  const buttonSave = createButton("button button_middle", "Save");
  const buttonCancel = createButton("button button_middle", "Cancel");
  const buttonSaveAndCancelContainer = createBlock("div", "edit-buttons", "");
  const buttonEdit = createButton("button button_middle", "Edit");
  const inputRenamedText = createInput(
    "input-text rename-input-text",
    "input",
    "",
    todo.text
  );

  if (todo.isChecked) {
    todoTaskName.classList.add("checkedText");
    todoCard.classList.add("backgroundChecked");
    checkBox.setAttribute("checked", "");
  }

  hideOrShowEditField(inputRenamedText, buttonCancel, buttonSave, true);
  rewriteCompletedTaskCounter();
  rewriteCounterAllTasks();

  // structure of HTML
  containerTodo.append(todoCard);
  todoCard.append(
    checkBox,
    checkBoxLabel,
    todoTaskName,
    buttonAndTimeContainer,
    buttonSaveAndCancelContainer
  );
  checkBoxLabel.after(inputRenamedText);

  buttonAndTimeContainer.append(buttonDelete, dateBlock);
  buttonSaveAndCancelContainer.append(buttonEdit, buttonSave, buttonCancel);

  //event liidteners
  checkBoxLabel.addEventListener("click", () =>
    addOrRemoveCheckBox(id, todo, todoTaskName, todoCard)
  );
  checkBoxLabel.addEventListener("click", rewriteCompletedTaskCounter);

  buttonDelete.addEventListener("click", () => deleteTodoCard(id));
  buttonDelete.addEventListener("click", cleanContainer);
  buttonDelete.addEventListener("click", rewriteCounterAllTasks);
  buttonDelete.addEventListener("click", rewriteCompletedTaskCounter);
  buttonDelete.addEventListener("click", () => reloadTodoCard(showOnlyChecked));

  buttonEdit.addEventListener("click", () =>
    hideOrShowTaskNameAndButtonEdit(
      inputRenamedText,
      todoTaskName,
      buttonEdit,
      true,
      todo.text
    )
  );

  buttonEdit.addEventListener("click", () =>
    hideOrShowEditField(inputRenamedText, buttonCancel, buttonSave, false)
  );

  buttonSave.addEventListener("click", () =>
    saveRenamedTask(id, todo, inputRenamedText.value, todoTaskName)
  );

  buttonSave.addEventListener("click", () =>
    hideOrShowTaskNameAndButtonEdit(
      inputRenamedText,
      todoTaskName,
      buttonEdit,
      false,
      todo.text
    )
  );

  buttonSave.addEventListener("click", () =>
    hideOrShowEditField(inputRenamedText, buttonCancel, buttonSave, true)
  );

  buttonCancel.addEventListener("click", () =>
    hideOrShowTaskNameAndButtonEdit(
      inputRenamedText,
      todoTaskName,
      buttonEdit,
      false,
      todo
    )
  );

  buttonCancel.addEventListener("click", () =>
    hideOrShowEditField(inputRenamedText, buttonCancel, buttonSave, true)
  );
  return todoCard;
}

app.append(header, containerTodo);

header.append(headerRow, headerRowNext);
headerRow.append(
  buttonDeleteAll,
  buttonDeleteLast,
  inputEnterText,
  buttonAddTodoCard
);

headerRowNext.append(
  allTasksCounter,
  copmletedTasksCounter,
  buttonShowAll,
  buttonShowCompleted,
  inputSearch
);

buttonDeleteAll.addEventListener("click", rewriteCounterAllTasks);
buttonDeleteAll.addEventListener("click", rewriteCompletedTaskCounter);
buttonDeleteAll.addEventListener("click", cleanContainer);
buttonDeleteAll.addEventListener("click", () =>
  reloadTodoCard(showOnlyChecked)
);

buttonDeleteLast.addEventListener("click", rewriteCounterAllTasks);
buttonDeleteLast.addEventListener("click", rewriteCompletedTaskCounter);
buttonDeleteLast.addEventListener("click", cleanContainer);
buttonDeleteLast.addEventListener("click", () =>
  reloadTodoCard(showOnlyChecked)
);

buttonAddTodoCard.addEventListener("click", cleanContainer);
buttonAddTodoCard.addEventListener("click", rewriteCounterAllTasks);
buttonAddTodoCard.addEventListener("click", () =>
  reloadTodoCard(showOnlyChecked)
);

buttonShowAll.addEventListener("click", cleanContainer);
buttonShowAll.addEventListener("click", () => reloadTodoCard(showOnlyChecked));

buttonShowCompleted.addEventListener("click", cleanContainer);
buttonShowCompleted.addEventListener("click", () =>
  reloadTodoCard(!showOnlyChecked)
);

inputSearch.addEventListener("keyup", cleanContainer);
inputSearch.addEventListener("keyup", () => searchTodoCards(inputSearch.value));

window.addEventListener("load", () => reloadTodoCard(showOnlyChecked));
