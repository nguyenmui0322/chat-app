// SERVER_RETURN_ALERT
socket.on("SERVER_RETURN_ALERT", (data) => {
  const myId = document.querySelector("[my-id]").getAttribute("my-id");
  if (!data.listUserId.includes(myId)) return;

  const alert = document.querySelector(".alert");
  if (!alert) return;

  alert.innerHTML = `<div class="alert alert-success" show-alert="show-alert" data-time="5000"><span content>${data.fullName} đã gửi tin nhắn cho bạn.</span> <span close-alert>x</span></div>`;

  const showAlert = document.querySelector("[show-alert]");
  const time = parseInt(showAlert.getAttribute("data-time"));
  const closeAlert = showAlert.querySelector("[close-alert]");
  const content = showAlert.querySelector("[content]");

  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  }, time);

  closeAlert.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden");
  });

  content.addEventListener("click", () => {
    window.location.href = `/chat/${data.roomChatId}`;
  });
});
// End SERVER_RETURN_ALERT

// Show Alert
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
  const time = parseInt(showAlert.getAttribute("data-time"));
  const closeAlert = showAlert.querySelector("[close-alert]");

  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  }, time);

  closeAlert.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden");
  });
}
// End Show Alert
