let textinput = document.getElementById("text_input");

let addbut = document.getElementById("add_but");

let addtextlist = [];
let tabs = document.querySelectorAll(".tap_box > div");
let mode = "";
for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}

//task = 객체
addbut.addEventListener("click", addtask);

function addtask() {
  let task = {
    id: randomIDGenerate(),
    text: textinput.value,
    isComplete: false,
  };

  addtextlist.push(task);
  console.log(addtextlist);
  render();
}

function filter(event) {
  mode = event.target.id;
  let filtertextlist = [];

  if (mode == "all") {
    render();
  } else if (mode == "ongoing") {
    for (let i = 0; i < addtextlist.length; i++) {
      if (addtextlist[i].isComplete == false) {
        filtertextlist.push(addtextlist[i]);
      }
    }
    addtextlist = filtertextlist;
    render();
  }
}

function render() {
  let resulthtml = "";
  for (let i = 0; i < addtextlist.length; i++) {
    if (addtextlist[i].isComplete == true) {
      resulthtml = `<div class="task_area">
      <div class="task-done">${addtextlist[i].text}</div>
      <div>
        <button onclick="tooglecomplete('${addtextlist[i].id}')">체크</button>
        <button onclick="deletebtn('${addtextlist[i].id}')">삭제</button>
      </div>
    </div>`;
    } else {
      resulthtml += `<div class="task_area">
    <div>${addtextlist[i].text}</div>
    <div>
      <button onclick="tooglecomplete('${addtextlist[i].id}')">체크</button>
      <button onclick="deletebtn('${addtextlist[i].id}')">삭제</button>
    </div>
  </div>`;
    }
  }

  document.getElementById("task-board").innerHTML = resulthtml;
}

function tooglecomplete(id) {
  for (let i = 0; i < addtextlist.length; i++) {
    if (addtextlist[i].id == id) {
      addtextlist[i].isComplete = !addtextlist[i].isComplete;
      break;
    }
  }
  render();
}

function deletebtn(id) {
  for (let i = 0; i < addtextlist.length; i++) {
    if (addtextlist[i].id == id) {
      addtextlist.splice(i, 1);
      break;
    }
  }
  render();
}

function randomIDGenerate() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}
