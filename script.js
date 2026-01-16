const button = document.getElementById("alertBtn");
const message = document.getElementById("message");
const countText = document.getElementById("count");

let count = 0;

button.addEventListener("click", () => {
  count++;
  countText.textContent = count;

  if (count === 5) {
    message.textContent = "5번 눌렀습니다!";
    button.classList.add("active");
  }

  if (count === 6) {
    message.textContent = "다시 원래대로!";
    button.classList.remove("active");
    count = 0;
    countText.textContent = count;
  }
});
const nameInput = document.getElementById("nameInput");
const nameBtn = document.getElementById("nameBtn");
const nameResult = document.getElementById("nameResult");

nameBtn.addEventListener("click", () => {
  const value = nameInput.value.trim();

  if (value === "") {
    nameResult.textContent = "이름을 입력하세요!";
    return;
  }

  nameResult.textContent = `안녕하세요, ${value}님!`;
});
nameInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    nameBtn.click();
  }
});
// TODO 기능
const todoInput = document.getElementById("todoInput");
const addTodoBtn = document.getElementById("addTodoBtn");
const todoList = document.getElementById("todoList");
todoList.addEventListener("dblclick", (e) => {
  const targetSpan = e.target.closest("span");
  if (!targetSpan) return;

  enableEdit(targetSpan);
});
const clearTodoBtn = document.getElementById("clearTodoBtn");

clearTodoBtn.addEventListener("click", () => {
  todoList.innerHTML = "";
  saveTodos();
});

addTodoBtn.addEventListener("click", () => {
  const text = todoInput.value.trim();
  if (text === "") return;

  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = text;
  span.addEventListener("click", (e) => {
    if (e.detail === 2) return;
    span.classList.toggle("done");
    saveTodos();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "삭제";
  deleteBtn.style.marginLeft = "10px";

  deleteBtn.addEventListener("click", () => {
    li.remove();
    saveTodos();
  });

  li.appendChild(span);
  li.appendChild(deleteBtn);
  todoList.appendChild(li);
  saveTodos();

  todoInput.value = "";
  todoInput.focus();
});

function saveTodos() {
  const items = [];

  todoList.querySelectorAll("li").forEach((li) => {
    const span = li.querySelector("span");

    items.push({
      text: span.textContent,
      done: span.classList.contains("done"),
    });
  });

  localStorage.setItem("todos", JSON.stringify(items));
}

function loadTodos() {
  console.log("불러옴");
  const saved = localStorage.getItem("todos");
  if (!saved) return;

  const items = JSON.parse(saved);

  items.forEach((item) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = item.text;
    if (item.done) span.classList.add("done");

    span.addEventListener("click", () => {
      span.classList.toggle("done");
      saveTodos();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "삭제";
    deleteBtn.style.marginLeft = "10px";
    deleteBtn.addEventListener("click", () => {
      li.remove();
      saveTodos();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
  });
}
loadTodos();
function enableEdit(span) {
  console.log("더블클릭됨", span.textContent);
  const oldText = span.textContent;

  const input = document.createElement("input");
  input.type = "text";
  input.value = oldText;

  span.replaceWith(input);
  input.focus();

  function finish(save) {
    const newSpan = document.createElement("span");
    newSpan.textContent = save ? input.value.trim() : oldText;

    newSpan.addEventListener("click", (e) => {
      if (e.detail === 2) return;
      newSpan.classList.toggle("done");
      saveTodos();
    });

    newSpan.addEventListener("dblclick", () => {
      enableEdit(newSpan);
    });

    if (span.classList.contains("done")) newSpan.classList.add("done");

    input.replaceWith(newSpan);
    saveTodos();
  }

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      if (input.value.trim() === "") finish(false);
      else finish(true);
    }
    if (e.key === "Escape") finish(false);
  });

  input.addEventListener("blur", () => {
    if (input.value.trim() === "") finish(false);
    else finish(true);
  });
}
