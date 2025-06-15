// Ждем полной загрузки DOM-структуры страницы перед выполнением скрипта
document.addEventListener("DOMContentLoaded", function () {
  // Получаем ссылку на контейнер для квадратов
  const board = document.querySelector("#board");

  // Создаем массив с цветами для анимации
  const colors = [
    "red",
    "blue",
    "yellow",
    "green",
    "purple",
    "white",
    "brown",
    "pink",
  ];

  // Задаем количество квадратов
  const SQUARES_NUMBER = 500;

  // Создаем DocumentFragment для оптимизации добавления элементов в DOM
  const fragment = document.createDocumentFragment();

  // Цикл создания квадратов
  for (let i = 0; i < SQUARES_NUMBER; i++) {
    // Создаем новый div-элемент
    const square = document.createElement("div");

    // Добавляем CSS-класс для стилизации
    square.classList.add("square");

    // Добавляем обработчик события наведения мыши
    square.addEventListener("mouseover", setColor);

    // Добавляем обработчик события ухода мыши
    square.addEventListener("mouseleave", removeColor);

    // Добавляем квадрат в DocumentFragment (не вызывает рефлоу)
    fragment.appendChild(square);
  }

  // Добавляем все квадраты из фрагмента в DOM за одну операцию
  board.appendChild(fragment);

  // Функция обработки наведения мыши
  function setColor(event) {
    // Получаем элемент, на который наведена мышь
    const element = event.currentTarget;

    // Генерируем случайный цвет
    const color = getRandomColor();

    // Устанавливаем цвет фона элемента
    element.style.backgroundColor = color;

    // Создаем эффект свечения через box-shadow
    element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
  }

  // Функция обработки ухода мыши
  function removeColor(event) {
    // Получаем элемент, с которого ушла мышь
    const element = event.currentTarget;

    // Возвращаем исходный цвет фона
    element.style.backgroundColor = "#1d1d1d";

    // Возвращаем исходную тень
    element.style.boxShadow = `0 0 2px #000`;
  }

  // Функция получения случайного цвета
  function getRandomColor() {
    // Возвращаем случайный цвет из массива colors
    return colors[Math.floor(Math.random() * colors.length)];
  }
});
