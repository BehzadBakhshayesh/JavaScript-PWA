//===========================sw registration
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((rejesteration) => console.log("rejesteration", rejesteration))
      .catch((err) => console.log("err", err));
  });
}
//===========================show install baner
const installButton = document.getElementById("installButton");
/////////////
let installPromptEvent;
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  installPromptEvent = e;
  // showInstallPromotion();
  console.log("beforeinstallprompt was fired");
});
/////////////
installButton.addEventListener("click", (e) => {
  e.preventDefault();
  // hideInstallPromotion();
  if (installPromptEvent) {
    installPromptEvent.prompt();
    installPromptEvent.userChoice.then((choiceRes) => {
      console.log("outcome :", choiceRes.outcome);
    });
    installPromptEvent = null;
  }
});
//===========================
