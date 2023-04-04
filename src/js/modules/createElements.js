const createElements = {
  createBlock: function (typeOfTag, classes, innerHTML = "") {
    let block = document.createElement(typeOfTag);
    block.className = classes;
    block.innerHTML = innerHTML;
    return block;
  },
  createButton: function createButton(classes, innerHTML) {
    let button = document.createElement("button");
    button.className = classes;
    button.innerHTML = innerHTML;
    return button;
  },
  createInput: function (classes, typeOfInput, id, placeholder = "") {
    let input = document.createElement("input");
    input.className = classes;
    input.setAttribute("type", typeOfInput);
    input.setAttribute("id", id);
    input.setAttribute("placeholder", placeholder);
    return input;
  },
  createLabel: function (id) {
    let label = document.createElement("label");
    label.setAttribute("for", id);
    return label;
  },
};

export const createBlock = createElements.createBlock;
export const createButton = createElements.createButton;
export const createInput = createElements.createInput;
export const createLabel = createElements.createLabel;
