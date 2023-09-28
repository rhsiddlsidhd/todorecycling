const underline = document.getElementById("under_line");

const navMenus = document.querySelectorAll("nav ul li");

const textbtn = document.querySelectorAll(".text_btn button");

navMenus.forEach((menu) => {
  menu.addEventListener("click", (e) => menuline(e));
});

function menuline(e) {
  underline.style.left = e.currentTarget.offsetLeft + "px";
  underline.style.width = e.currentTarget.offsetWidth + "px";
  underline.style.top =
    e.currentTarget.offsetTop + e.currentTarget.offsetHeight + "px";
}
// ======================= underline

const plusBtn = document.querySelector(".btn-outline-secondary");
const inputplus = document.getElementById("input_plus");

let tasklist = [];

let mode = "all";

let filterlist = [];

plusBtn.addEventListener("click", addTask);

function addTask() {
  let task = {
    id: randomId(),
    inputResult: inputplus.value,
    iscomplete: false,
  };

  tasklist.push(task);
  console.log(tasklist);

  render();
}

for (let i = 0; i < navMenus.length; i++) {
  navMenus[i].addEventListener("click", function (event) {
    filter(event);
  });
}

// function (event){filter(event)} 이해 안대 ' ';

function filter(event) {
  mode = event.target.id;
  filterlist = [];
  if (mode == "all") {
    render();
  } else if (mode == "ongoing") {
    for (let i = 0; i < tasklist.length; i++) {
      if (tasklist[i].iscomplete == false) {
        filterlist.push(tasklist[i]);
      }
    }
    render();
  } else if (mode == "done") {
    for (let i = 0; i < tasklist.length; i++) {
      if (tasklist[i].iscomplete == true) {
        filterlist.push(tasklist[i]);
      }
    }
    render();
  }
}

function render() {
  let list = [];

  if (mode === "all") {
    list = tasklist;
  } else if (mode === "ongoing" || mode === "done") {
    list = filterlist;
  }

  let resultHtml = "";

  for (let i = 0; i < list.length; i++) {
    if (list[i].iscomplete == true) {
      resultHtml += `<div class="task_area">
      <div class="task_done" >${list[i].inputResult}</div>
      <div class="text_btn">
        <button onclick ="check('${list[i].id}')">
          <i class="fa-solid fa-check" style="color: #000000"></i>
        </button>
        <button onclick ="deletebtn('${list[i].id}')">
          <i class="fa-solid fa-trash" style="color: #000000"></i>
        </button>
      </div>
    </div>`;
    } else {
      resultHtml += `<div class="task_area">
    <div>${list[i].inputResult}</div>
    <div class="text_btn">
      <button onclick ="check('${list[i].id}')">
        <i class="fa-solid fa-check" style="color: #000000"></i>
      </button>
      <button onclick = "deletebtn('${list[i].id}')">
        <i class="fa-solid fa-trash" style="color: #000000"></i>
      </button>
    </div>
  </div>`;
    }
  }

  document.getElementById("task_board").innerHTML = resultHtml;
}

function check(id) {
  for (let i = 0; i < tasklist.length; i++) {
    if (tasklist[i].id == id) {
      tasklist[i].iscomplete = !tasklist[i].iscomplete;
      break;
    }
  }
  render();
}

function deletebtn(id) {
  for (let i = 0; i < tasklist.length; i++) {
    if (tasklist[i].id == id) {
      tasklist.splice(i, 1);
    }
  }
  render();
}

function randomId() {
  return Math.random().toString(36).substr(2, 16);
}
