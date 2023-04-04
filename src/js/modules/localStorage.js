import { dataProvider } from "./data";

export function savePageBeforeReload() {
  data = dataProvider.read();
  localStorage.setItem("todoTasks", JSON.stringify(data));
}

export function loadPage() {
  let dataFromLocalStorage = localStorage.getItem("todoTasks") || [];
  let data = JSON.parse(dataFromLocalStorage);

  data.forEach((item, index) => dataProvider.update(index, item));
}

window.addEventListener("beforeunload", savePageBeforeReload);
window.addEventListener("load", loadPage);
