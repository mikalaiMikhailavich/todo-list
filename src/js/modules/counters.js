import { dataProvider } from "./data";
import { createBlock } from "./createElements";

const allTasksCounter = createBlock("span", "", `All:  0`);

const copmletedTasksCounter = createBlock("span", "", `Completed: 0`);

function rewriteCounterAllTasks() {
  allTasksCounter.innerHTML = `All:  ${dataProvider.read().length}`;
}

function rewriteCompletedTaskCounter() {
  copmletedTasksCounter.innerHTML = `Completed: ${
    dataProvider.read().filter((el) => el.isChecked).length
  }`;
}

export {
  allTasksCounter,
  copmletedTasksCounter,
  rewriteCounterAllTasks,
  rewriteCompletedTaskCounter,
};
