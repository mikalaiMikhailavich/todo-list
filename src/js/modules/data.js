export let arrayOfTodoTasks = [];
export let showOnlyChecked = false;

export const dataProvider = {
  add: function (name) {
    let todo = {
      id: Date.now(),
      isChecked: false,
      text: name,
      date: new Date().toLocaleString(),
    };
    arrayOfTodoTasks.push(todo);
  },
  clear: function () {
    arrayOfTodoTasks = [];
  },
  read: function () {
    return [...arrayOfTodoTasks];
  },
  deleteLast: function () {
    arrayOfTodoTasks.pop();
  },
  delete: function (index) {
    arrayOfTodoTasks.splice(index, 1);
  },
  update: function (index, todo) {
    arrayOfTodoTasks[index] = todo;
  },
};
