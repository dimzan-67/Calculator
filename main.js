const screen = document.querySelector('.screen');

let expression = "";

// Handle button press (click or keyboard)
function buttonClick(value) {
    if (value === "C") {
        expression = "";
        screen.innerText = "0";
        return;
    }

    if (value === "←") {
        expression = expression.trimEnd().slice(0, -1).trimEnd();
        screen.innerText = expression || "0";
        return;
    }

    if (value === "=") {
        try {
            // Replace symbols for eval (remove spaces before evaluating)
            let safeExpr = expression
                .replace(/×/g, "*")
                .replace(/÷/g, "/")
                .replace(/−/g, "-")
                .replace(/\s+/g, ""); // remove spaces for eval

            let result = eval(safeExpr);
            expression = result.toString();
            screen.innerText = expression;
        } catch (e) {
            screen.innerText = "Error";
            expression = "";
        }
        return;
    }

    // If operator, add with spaces
    if (["+", "−", "×", "÷", "%"].includes(value)) {
        expression += (expression === "" ? "" : " ") + value + " ";
    } else {
        // Digits or .
        expression += value;
    }

    screen.innerText = expression;
}

function init() {
    document.querySelector(".calc-buttons").addEventListener("click", function (event) {
        if (event.target.tagName === "BUTTON") {
            buttonClick(event.target.innerText);
        }
    });
}

init();

// ---------------------
// Keyboard Support
// ---------------------
document.addEventListener("keydown", function (event) {
    let key = event.key;

    const keyMap = {
        "Enter": "=",
        "NumpadEnter": "=",
        "Backspace": "←",
        "Delete": "C",
        "+": "+",
        "NumpadAdd": "+",
        "-": "−",
        "NumpadSubtract": "−",
        "*": "×",
        "NumpadMultiply": "×",
        "/": "÷",
        "NumpadDivide": "÷",
        "%": "%",
        ".": ".",
        "NumpadDecimal": "."
    };

    // Digits (main keyboard or numpad)
    if (/^[0-9]$/.test(key)) {
        buttonClick(key);
        return;
    }
    if (key.startsWith("Numpad") && /^[0-9]$/.test(key.replace("Numpad",""))) {
        buttonClick(key.replace("Numpad",""));
        return;
    }

    // Mapped keys
    if (keyMap[key]) {
        buttonClick(keyMap[key]);
        return;
    }
});

