const colors = [
  { name: "BEEKEEPER", hex: "#f6e58d" },
  { name: "SPICED NECTARINE", hex: "#ffbe76" },
  { name: "PINK GLAMOUR", hex: "#ff7979" },
  { name: "JUNE BUD", hex: "#badc58" },
  { name: "COASTAL BREEZE", hex: "#dff9fb" },
];

const colorSpan = document.querySelector("#color span");
const colorBox = document.querySelector("#color div");

const colorHex = document.querySelector("#color-hex span")

/* span name*/
const Sname = colorSpan;

const ranColor = () => colors[Math.floor(Math.random() * colors.length)];

const { name, hex } = ranColor();
colorBox.style.backgroundColor = hex;
Sname.innerText = name;
colorHex.innerText = hex;
