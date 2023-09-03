window.onload = function() {
    var resetClicksButton = document.getElementById("resetClicksButton");

    resetClicksButton.addEventListener("click", function() {
        localStorage.removeItem("clickCount");
        alert("Click count has been reset.");
    });
};


