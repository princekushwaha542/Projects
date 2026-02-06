const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const photo = document.getElementById("photo");

let stream;

async function openCamera() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
  } catch (err) {
    alert("Camera permission denied!");
  }
}

function capture() {
  if (!stream) {
    alert("Camera not opened!");
    return;
  }

  const ctx = canvas.getContext("2d");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  ctx.drawImage(video, 0, 0);
  photo.src = canvas.toDataURL("image/png");
}

function uploadFile(input) {
  const file = input.files[0];
  if (!file) return;

  alert(`File Selected: ${file.name}`);
}
