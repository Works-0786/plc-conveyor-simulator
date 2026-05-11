let state = "IDLE";
let boxPosition = 0;
let startTime = null;

const statusText = document.getElementById("status");
const box = document.getElementById("box");
const sensor1Text = document.getElementById("sensor1");
const sensor2Text = document.getElementById("sensor2");
const logArea = document.getElementById("log");

document.getElementById("startBtn").addEventListener("click", () => {
 if (state === "ERROR" || state === "EMERGENCY") {
    console.log("起動不可：Resetしてください");
    return;
  }

    state = "RUNNING";
    startTime = Date.now();
    addLog("Start");
    updateStatus();
});

document.getElementById("stopBtn").addEventListener("click", () => {
  if (state !== "RUNNING") {
    return;
  }
  
    state = "STOP";
    addLog("Stop");
    updateStatus();
});

document.getElementById("emergencyBtn").addEventListener("click", () => {
  state = "EMERGENCY";
  addLog("Emergency Stop");
  updateStatus();
});

document.getElementById("resetBtn").addEventListener("click", () => {
  state = "IDLE";
  boxPosition = 0;
  startTime = null;
  addLog("Reset");

  box.style.left = "0px";
  sensor1Text.textContent = "S1: OFF";
  sensor2Text.textContent = "S2: OFF";
  updateStatus();
});

function updateStatus() {
  statusText.textContent = "状態：" + state;

  switch(state) {
    case "RUNNING":
      statusText.style.color = "green";
      break;

    case "EMERGENCY":
    case "ERROR":
      statusText.style.color = "red";
      break;

    default:
      statusText.style.color = "black";
  }
}

function update() {
  console.log("scan:", state);

  if (state === "RUNNING") {
    boxPosition += 2;
    box.style.left = boxPosition + "px";
 }

 if (state === "RUNNING") {
  const elapsed = Date.now() - startTime;

  if (elapsed > 10000 && boxPosition < 250) {
    state = "ERROR";
    addLog("ERROR");
    updateStatus();
  }
}

// センサー判定
  if (boxPosition >= 100) {
    sensor1Text.textContent = "S1: ON";
    sensor1Text.style.color = "green";
  } else {
    sensor1Text.textContent = "S1: OFF";
    sensor1Text.style.color = "black";
  }

  if (boxPosition >= 250) {
    sensor2Text.textContent = "S2: ON";
    sensor2Text.style.color = "green";
  } else {
    sensor2Text.textContent = "S2: OFF";
    sensor2Text.style.color = "black";
  }
} 

setInterval(update, 500);

function addLog(message) {
  const now = new Date().toLocaleTimeString();
  logArea.innerHTML += `${now} ${message}<br>`;
  logArea.scrollTop = logArea.scrollHeight;
}
