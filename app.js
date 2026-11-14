const KEY = "pocket-taps";
const statusEl = document.getElementById("status");
const netEl = document.getElementById("net");
const countEl = document.getElementById("count");
const tapEl = document.getElementById("tap");

function isStandalone() {
  return window.matchMedia("(display-mode: standalone)").matches
    || window.matchMedia("(display-mode: fullscreen)").matches
    || window.navigator.standalone === true;
}

function renderMode() {
  if (isStandalone()) {
    statusEl.innerHTML = "Installed. <b>Works offline.</b>";
  } else {
    statusEl.innerHTML = "Running in browser <b>Add to Home Screen</b>";
  }
}

function renderNet() {
  const on = navigator.onLine;
  netEl.classList.toggle("is-off", !on);
  netEl.querySelector(".label").textContent = on ? "Online" : "Offline";
}

function loadCount() {
  const n = parseInt(localStorage.getItem(KEY) || "0", 10);
  return Number.isFinite(n) ? n : 0;
}

let taps = loadCount();
countEl.textContent = String(taps);

tapEl.addEventListener("click", () => {
  taps += 1;
  localStorage.setItem(KEY, String(taps));
  countEl.textContent = String(taps);
  if (navigator.vibrate) navigator.vibrate(10);
});

renderMode();
renderNet();
window.addEventListener("online", renderNet);
window.addEventListener("offline", renderNet);
["(display-mode: standalone)", "(display-mode: fullscreen)"].forEach((q) => {
  const mq = window.matchMedia(q);
  if (mq.addEventListener) mq.addEventListener("change", renderMode);
  else if (mq.addListener) mq.addListener(renderMode);
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js", { scope: "./" }).catch(() => {});
}
