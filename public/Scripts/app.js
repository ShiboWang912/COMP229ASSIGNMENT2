// IIFE -- Immediately Invoked Function Expression
/*COMP229 ASSIGNMENT 2, Shibo Wang, 301200419, October 19, 2022*/
(function () {
  function Start() {
    console.log("App Started...");
    let deletebuttons = document.querySelectorAll(".btn-danger");
    for (button of deletebuttons) {
      button.addEventListener("click", (event) => {
        if (!confirm("Are you sure")) {
          event.preventDefault();
          window.location.assign("/contact-list");
        }
      });
    }
  }
  window.addEventListener("load", Start);
})();

