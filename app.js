 document.addEventListener('DOMContentLoaded', function() {
      const board = document.querySelector("#board");
      const colors = ["red", "blue", "yellow", "green", "purple", "white", "brown", "pink"];
      const SQUARES_NUMBER = 500;
      const fragment = document.createDocumentFragment();

      for (let i = 0; i < SQUARES_NUMBER; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.addEventListener("mouseover", setColor);
        square.addEventListener("mouseleave", removeColor);
        fragment.appendChild(square);
      }

      board.appendChild(fragment);

      function setColor(event) {
        const element = event.currentTarget;
        const color = getRandomColor();
        element.style.backgroundColor = color;
        element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
      }

      function removeColor(event) {
        const element = event.currentTarget;
        element.style.backgroundColor = "#1d1d1d";
        element.style.boxShadow = `0 0 2px #000`;
      }

      function getRandomColor() {
        return colors[Math.floor(Math.random() * colors.length)];
      }
    });