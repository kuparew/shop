function generateRandomCode() {
    return Math.floor(100000 + Math.random() * 900000);
}

function calculateDiscountPercentage() {
    return Math.floor(Math.random() * 40);
}

window.onload = function() {
    var discountButton = document.getElementById("getDiscountButton");
    var discountCodeContainer = document.querySelector(".discount-code");
    var cards = document.querySelectorAll(".card");
    var timerElement = document.getElementById("timer");
    var clickCountElement = document.getElementById("clickCount"); 
    var interval; 

    var nextClickTime = localStorage.getItem("nextClickTime");
    var remainingTime = localStorage.getItem("remainingTime");
    var savedDiscount = localStorage.getItem("discount");
    var savedDiscountText = localStorage.getItem("discountText");
    var clickCount = parseInt(localStorage.getItem("clickCount")) || 0;

    
    clickCountElement.textContent = "Clicks: " + clickCount;

    if (nextClickTime) {
        var currentTime = new Date().getTime();

        if (currentTime < nextClickTime) {
            startTimer((nextClickTime - currentTime) / 1000);
        } else {
            discountButton.style.display = "block";
        }
    }

    if (remainingTime) {
        startTimer(remainingTime);
    }

    if (savedDiscount && savedDiscountText) {
        discountButton.style.display = "none";
        discountCodeContainer.textContent = savedDiscountText;
        cards.forEach(function(card) {
            var currentPrice = parseFloat(card.getAttribute("data-price"));
            var newDiscountedPrice = currentPrice - (currentPrice * savedDiscount * 0.01);
            card.querySelector(".price").textContent = "$" + newDiscountedPrice.toFixed(2);
        });
    }

    discountButton.addEventListener("click", function() {
        if (timerElement.textContent === "") {
            clearInterval(interval); 

            var currentTime = new Date().getTime();
            var nextClickTime = currentTime + 30000; 

            localStorage.setItem("nextClickTime", nextClickTime);
            localStorage.setItem("clickCount", ++clickCount);

            var randomCode = generateRandomCode();
            var discountPercentage = calculateDiscountPercentage();
            var discountText = "Your discount is " + discountPercentage + "%";

            localStorage.setItem("discount", discountPercentage);
            localStorage.setItem("discountText", discountText);

            discountButton.style.display = "none";
            discountCodeContainer.textContent = discountText;

            cards.forEach(function(card) {
                var currentPrice = parseFloat(card.getAttribute("data-price"));
                var newDiscountedPrice = currentPrice - (currentPrice * discountPercentage * 0.01);

                card.querySelector(".price").textContent = "$" + newDiscountedPrice.toFixed(2);
            });

            startTimer(10); // 10 секунд
        }
    });

    function startTimer(seconds) {
        clearInterval(interval); 

        interval = setInterval(function() {
            timerElement.textContent = "Next discount in: " + formatTime(seconds);
            seconds--;

            if (seconds < 0) {
                clearInterval(interval);
                timerElement.textContent = "";
                discountButton.style.display = "block";
            }

            localStorage.setItem("remainingTime", seconds);
        }, 1000);
    }

    function formatTime(seconds) {
        var minutes = Math.floor(seconds / 60);
        var remainingSeconds = seconds % 60;
        return minutes + "m " + remainingSeconds + "s";
    }
};
