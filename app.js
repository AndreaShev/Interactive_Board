// Ожидаем полной загрузки DOM перед выполнением скрипта
document.addEventListener('DOMContentLoaded', function() {
  // 1. Получаем ссылку на контейнер для квадратов
  const board = document.querySelector("#board");
  
  // 2. Улучшенная палитра цветов (HEX-формат для надежности)
  const colors = [
    "#FF0000", "#0000FF", "#FFFF00", "#00FF00", 
    "#800080", "#FFFFFF", "#A52A2A", "#FFC0CB"
  ];
  
  // 3. Адаптивное количество квадратов (меньше на мобильных)
  const SQUARES_NUMBER = window.innerWidth < 768 ? 300 : 500;
  
  // 4. Создаем DocumentFragment для оптимизации вставки
  const fragment = document.createDocumentFragment();
  
  // 5. Создаем квадраты в цикле
  for (let i = 0; i < SQUARES_NUMBER; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    
    // 6. Универсальные обработчики для всех устройств
    square.addEventListener("pointerover", setColor);
    square.addEventListener("pointerout", removeColor);
    
    // 7. Резервные обработчики для старых браузеров
    square.addEventListener("mouseover", setColor);
    square.addEventListener("mouseleave", removeColor);
    
    // 8. Обработчики для сенсорных устройств
    square.addEventListener("touchstart", setColor);
    square.addEventListener("touchend", removeColor);
    
    // 9. Добавляем квадрат во фрагмент
    fragment.appendChild(square);
  }

  // 10. Вставляем все квадраты за одну операцию
  board.appendChild(fragment);

  // Функция установки цвета
  function setColor(event) {
    // 11. Предотвращаем стандартное поведение для touch-событий
    event.preventDefault();
    
    // 12. Получаем целевой элемент
    const element = event.currentTarget;
    
    // 13. Проверяем, не активирован ли уже элемент
    if (element.dataset.active) return;
    
    // 14. Генерируем случайный цвет
    const color = getRandomColor();
    
    // 15. Устанавливаем флаг активности
    element.dataset.active = "true";
    
    // 16. Применяем стили через requestAnimationFrame
    requestAnimationFrame(() => {
      element.style.backgroundColor = color;
      element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
    });
  }

  // Функция сброса цвета
  function removeColor(event) {
    // 17. Получаем целевой элемент
    const element = event.currentTarget;
    
    // 18. Сбрасываем флаг активности
    delete element.dataset.active;
    
    // 19. Плавное восстановление стилей
    requestAnimationFrame(() => {
      element.style.backgroundColor = "#1d1d1d";
      element.style.boxShadow = `0 0 2px #000`;
    });
  }

  // Функция получения случайного цвета
  function getRandomColor() {
    // 20. Оптимизированный выбор случайного цвета
    return colors[Math.floor(Math.random() * colors.length)];
  }
  
  // 21. Обработка быстрого движения курсора
  document.addEventListener("pointermove", (e) => {
    // 22. Находим элемент под курсором/пальцем
    const element = document.elementFromPoint(e.clientX, e.clientY);
    
    // 23. Проверяем, является ли элемент квадратом
    if (element && element.classList.contains("square")) {
      // 24. Имитируем событие наведения
      setColor({...e, currentTarget: element});
    }
  });
  
  // 25. Очистка при выходе за пределы доски
  board.addEventListener("pointerleave", () => {
    document.querySelectorAll(".square[data-active]").forEach(square => {
      removeColor({currentTarget: square});
    });
  });
});