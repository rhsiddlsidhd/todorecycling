const addbut = document.getElementById("add_but");
const textinput = document.getElementById("text_input");
let tabs = document.querySelectorAll(".tap_box div");

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}

resultlist = [];
let mode = "all";
let filterlist = [];

addbut.addEventListener("click", addbutclick);

function addbutclick() {
  let task = {
    id: randomId(),
    text: textinput.value,
    iscomplete: false,
  };

  resultlist.push(task);

  render();
}
//event.target
function filter(event) {
  mode = event.target.id;
  filterlist = [];

  if (mode == "all") {
    render();
  } else if (mode == "ongoing") {
    for (let i = 0; i < resultlist.length; i++) {
      if (resultlist[i].iscomplete == false) {
        filterlist.push(resultlist[i]);
      }
    }
    resultlist = filterlist;
    render();
  } else if (mode == "done") {
    for (let i = 0; i < resultlist.length; i++) {
      if (resultlist[i].iscomplete == true) {
        filterlist.push(resultlist[i]);
      }
    }
    render();
  }
}

function render() {
  resulthtml = "";
  let list = [];
  if (mode == "all") {
    list = resultlist;
  } else if (mode == "ongoing" || mode == "done") {
    list = filterlist;
  }

  for (let i = 0; i < list.length; i++) {
    if (list[i].iscomplete == true) {
      resulthtml += `<div class="task_area">
    <div class="task-done" >${list[i].text}</div>
    <div>
      <button onclick ="checkbtn('${list[i].id}')">체크</button>
      <button onclick ="deletebtn('${list[i].id}')">삭제</button>
    </div>
  </div>`;
    } else {
      resulthtml += `<div class="task_area">
    <div>${list[i].text}</div>
    <div>
      <button onclick ="checkbtn('${list[i].id}')">체크</button>
      <button onclick ="deletebtn('${list[i].id}') ">삭제</button>
    </div>
  </div>`;
    }
  }

  document.getElementById("task-board").innerHTML = resulthtml;
}

function checkbtn(id) {
  for (let i = 0; i < resultlist.length; i++) {
    if (resultlist[i].id == id) {
      resultlist[i].iscomplete = !resultlist[i].iscomplete;
      break;
    }
  }
  render();
}

function deletebtn(id) {
  for (let i = 0; i < resultlist.length; i++) {
    if (resultlist[i].id == id) {
      resultlist.splice(i, 1);
      break;
    }
  }
  render();
}

function randomId() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}
