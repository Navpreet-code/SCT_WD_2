// Get DOM Elements
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const modeToggle = document.getElementById("modeToggle");
const scientificSection = document.getElementById("scientificSection");
const calculatorContainer = document.querySelector(".calculator-container");
const calculatorWrapper = document.querySelector(".calculator-wrapper");

// Calculator State
let currentExpression = "";

// Add click events to all buttons
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    // Clear All
    if (button.classList.contains("clear")) {
      currentExpression = "";
      display.value = "0";
    }

    // Delete Last Character
    else if (button.classList.contains("del")) {
      currentExpression = currentExpression.slice(0, -1);
      display.value = currentExpression || "0";
    }

    // Equal (=)
    else if (button.classList.contains("equal")) {
      try {
        let expr = currentExpression
          .replace(/×/g, "*")
          .replace(/÷/g, "/")
          .replace(/π/g, Math.PI)
          .replace(/e/g, Math.E)
          .replace(/√/g, "Math.sqrt")
          .replace(/sin/g, "Math.sin")
          .replace(/cos/g, "Math.cos")
          .replace(/tan/g, "Math.tan")
          .replace(/log/g, "Math.log10")
          .replace(/ln/g, "Math.log")
          .replace(/\^/g, "**");

        const result = eval(expr);
        display.value = result;
        currentExpression = result.toString();
      } catch (error) {
        display.value = "Error";
        currentExpression = "";
      }
    }

    // Toggle Scientific Calculator Panel
    else if (button.id === "modeToggle") {
      const expanded = calculatorWrapper.classList.toggle("expanded");
      if (expanded) {
        scientificSection.classList.remove("d-none");
        scientificSection.classList.add("slide-in");
        setTimeout(() => {
          scientificSection.classList.remove("slide-in");
        }, 300);
      } else {
        scientificSection.classList.add("slide-out");
        setTimeout(() => {
          scientificSection.classList.remove("slide-out");
          scientificSection.classList.add("d-none");
        }, 300);
      }
    }

    // Scientific Functions
    else if (button.classList.contains("sci-func")) {
      const func = value;

      if (["sin", "cos", "tan", "log", "ln", "√"].includes(func)) {
        currentExpression += func + "(";
      } else if (["π", "e"].includes(func)) {
        currentExpression += func;
      } else if (func === "^") {
        currentExpression += "^";
      } else if (func === "()") {
        const open = (currentExpression.match(/\(/g) || []).length;
        const close = (currentExpression.match(/\)/g) || []).length;
        currentExpression += open <= close ? "(" : ")";
      }

      display.value = currentExpression;
    }

    // Other Input Buttons
    else {
      currentExpression += value;
      display.value = currentExpression;
    }
  });
});
