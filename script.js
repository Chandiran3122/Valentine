var canvas = document.getElementById("starfield");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext("2d");
var stars = 500;
var colorrange = [0, 60, 240];
var starArray = [];

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Initialize stars with random opacity values
for (var i = 0; i < stars; i++) {
    var x = Math.random() * canvas.offsetWidth;
    var y = Math.random() * canvas.offsetHeight;
    var radius = Math.random() * 1.2;
    var hue = colorrange[getRandom(0, colorrange.length - 1)];
    var sat = getRandom(50, 100);
    var opacity = Math.random();
    starArray.push({ x, y, radius, hue, sat, opacity });
}

var frameNumber = 0;
var opacity = 0;
var secondOpacity = 0;
var thirdOpacity = 0;

var baseFrame = context.getImageData(0, 0, window.innerWidth, window.innerHeight);

function drawStars() {
    for (var i = 0; i < stars; i++) {
        var star = starArray[i];

        context.beginPath();
        context.arc(star.x, star.y, star.radius, 0, 360);
        context.fillStyle = "hsla(" + star.hue + ", " + star.sat + "%, 88%, " + star.opacity + ")";
        context.fill();
    }
}

function updateStars() {
    for (var i = 0; i < stars; i++) {
        if (Math.random() > 0.99) {
            starArray[i].opacity = Math.random();
        }
    }
}

const button = document.getElementById("valentinesButton");
let emailSent = false;

button.addEventListener("click", () => {
    if (button.innerHTML.includes("Click Me, My Bubu") || button.textContent === "Click Me! ❤") {
        button.textContent = "loading...";
        fetch('send_mail.php')
            .then(response => {
                emailSent = true;
                button.innerHTML = "<i class='fas fa-heart animate-pulse'></i> 💝 I Love You MotiBubu 🦋 forever";
            })
            .catch(error => {
                emailSent = true;
                button.innerHTML = "<i class='fas fa-heart animate-pulse'></i> 💝 I Love You MotiBubu 🦋 forever";
            });
    } else if (button.innerHTML.includes("I Love You MotiBubu 🦋 forever")) {
        alert("I love you so much MotiBubu 🦋, more than all the time and space in the universe can contain and I can't wait to spend all the time in the world to share that love with you!\n\nHappy Valentine's Day <3");

        // Transition to main content
        const starfieldContainer = document.getElementById('starfield-container');
        const mainContent = document.getElementById('main-content');

        starfieldContainer.style.transition = "all 1s ease-out";
        starfieldContainer.style.opacity = "0";

        setTimeout(() => {
            starfieldContainer.style.display = "none";
            mainContent.classList.add('visible');
            document.body.style.overflow = "visible"; // Allow scrolling
            document.documentElement.style.overflow = "visible";

            // Ensure we start at the top of the main content
            window.scrollTo(0, 0);

            // Automatically start music when transitioning to Valentine's page
            if (typeof toggleMusic === 'function' && !musicPlaying) {
                toggleMusic();
            }
        }, 1000);
    }
});

function drawTextWithLineBreaks(lines, x, y, fontSize, lineHeight) {
    lines.forEach((line, index) => {
        context.fillText(line, x, y + index * (fontSize + lineHeight));
    });
}

function drawText() {
    var fontSize = Math.min(30, window.innerWidth / 24); // Adjust font size based on screen width
    var lineHeight = 8;

    context.font = fontSize + "px Comic Sans MS";
    context.textAlign = "center";

    // glow effect
    context.shadowColor = "rgba(45, 45, 255, 1)";
    context.shadowBlur = 8;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;

    if (frameNumber < 250) {
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        context.fillText("everyday day I cannot believe how lucky I am", canvas.width / 2, canvas.height / 2);
        opacity = opacity + 0.01;
    }
    //fades out the text by decreasing the opacity
    if (frameNumber >= 250 && frameNumber < 500) {
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        context.fillText("everyday day I cannot believe how lucky I am", canvas.width / 2, canvas.height / 2);
        opacity = opacity - 0.01;
    }

    //needs this if statement to reset the opacity before next statement on canvas
    if (frameNumber == 500) {
        opacity = 0;
    }
    if (frameNumber > 500 && frameNumber < 750) {
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;

        if (window.innerWidth < 600) {           //shortens long sentence for mobile screens
            drawTextWithLineBreaks(["amongst trillions and trillions of stars,", "over billions of years"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("amongst trillions and trillions of stars, over billions of years", canvas.width / 2, canvas.height / 2);
        }

        opacity = opacity + 0.01;
    }
    if (frameNumber >= 750 && frameNumber < 1000) {
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;

        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["amongst trillions and trillions of stars,", "over billions of years"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("amongst trillions and trillions of stars, over billions of years", canvas.width / 2, canvas.height / 2);
        }

        opacity = opacity - 0.01;
    }

    if (frameNumber == 1000) {
        opacity = 0;
    }
    if (frameNumber > 1000 && frameNumber < 1250) {
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        context.fillText("to be alive, and to get to spend this life with you", canvas.width / 2, canvas.height / 2);
        opacity = opacity + 0.01;
    }
    if (frameNumber >= 1250 && frameNumber < 1500) {
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        context.fillText("to be alive, and to get to spend this life with you", canvas.width / 2, canvas.height / 2);
        opacity = opacity - 0.01;
    }

    if (frameNumber == 1500) {
        opacity = 0;
    }
    if (frameNumber > 1500 && frameNumber < 1750) {
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        context.fillText("is so incredibly, unfathomably unlikely", canvas.width / 2, canvas.height / 2);
        opacity = opacity + 0.01;
    }
    if (frameNumber >= 1750 && frameNumber < 2000) {
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        context.fillText("is so incredibly, unfathomably unlikely", canvas.width / 2, canvas.height / 2);
        opacity = opacity - 0.01;
    }

    if (frameNumber == 2000) {
        opacity = 0;
    }
    if (frameNumber > 2000 && frameNumber < 2250) {
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;

        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["and yet here I am to get the impossible", "chance to get to know you"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("and yet here I am to get the impossible chance to get to know you", canvas.width / 2, canvas.height / 2);
        }

        opacity = opacity + 0.01;
    }
    if (frameNumber >= 2250 && frameNumber < 2500) {
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;

        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["and yet here I am to get the impossible", "chance to get to know you"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("and yet here I am to get the impossible chance to get to know you", canvas.width / 2, canvas.height / 2);
        }

        opacity = opacity - 0.01;
    }

    if (frameNumber == 2500) {
        opacity = 0;
    }
    if (frameNumber > 2500 && frameNumber < 99999) {
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;

        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["I love you so much MotiBubu 🦋, more than", "all the time and space in the universe can contain"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("I love you so much MotiBubu 🦋, more than all the time and space in the universe can contain", canvas.width / 2, canvas.height / 2);
        }

        opacity = opacity + 0.01;
    }

    if (frameNumber >= 2750 && frameNumber < 99999) {
        context.fillStyle = `rgba(45, 45, 255, ${secondOpacity})`;


        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["and I can't wait to spend all the time in", "the world to share that love with you!"], canvas.width / 2, (canvas.height / 2 + 60), fontSize, lineHeight);
        } else {
            context.fillText("and I can't wait to spend all the time in the world to share that love with you!", canvas.width / 2, (canvas.height / 2 + 50));
        }

        secondOpacity = secondOpacity + 0.01;
    }

    if (frameNumber >= 3000 && frameNumber < 99999) {
        context.fillStyle = `rgba(45, 45, 255, ${thirdOpacity})`;
        context.fillText("I Love You MotiBubu 🦋 forever", canvas.width / 2, (canvas.height / 2 + 120));
        thirdOpacity = thirdOpacity + 0.01;

        if (!emailSent) {
            button.innerHTML = "<i class='fas fa-heart animate-pulse'></i> 💝 Click Me, My Bubu";
        }
        button.style.display = "block";
        button.style.zIndex = "10000"; // Higher than starfield-container z-index if needed
    }

    // Reset the shadow effect after drawing the text
    context.shadowColor = "transparent";
    context.shadowBlur = 0;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
}

function draw() {
    context.putImageData(baseFrame, 0, 0);

    drawStars();
    updateStars();
    drawText();

    if (frameNumber < 99999) {
        frameNumber++;
    }
    window.requestAnimationFrame(draw);
}

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    baseFrame = context.getImageData(0, 0, window.innerWidth, window.innerHeight);
});

window.requestAnimationFrame(draw);
