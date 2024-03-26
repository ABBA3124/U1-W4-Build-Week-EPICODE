document.addEventListener("DOMContentLoaded", function() {
    // Controlla se la pagina deve essere ricaricata quando si torna indietro
    if (sessionStorage.getItem("refreshIndexPage") === "true") {
      sessionStorage.removeItem("refreshIndexPage"); // Pulisce il flag per evitare un refresh loop
      window.location.reload(true); 
    }
    const checkbox = document.querySelector("input[type=\"checkbox\"].checkbox");
    const button = document.querySelector(".bottone");
    function toggleButtonVisibility() {
      if (checkbox.checked) {
        button.classList.remove("bottone-hidden");
        button.classList.add("bottone-visible");
      } else {
        button.classList.add("bottone-hidden");
        button.classList.remove("bottone-visible");
      }
    }
    toggleButtonVisibility(); // check box non compilata
    checkbox.addEventListener("change", toggleButtonVisibility);
    // link per passare alla pagina di benchmark
    button.addEventListener("click", function() {
      window.location.href = "Settings-Test.html"; 
      sessionStorage.setItem("refreshIndexPage", "true");
    });
});
