// Текст вывода
const conclusionText = `
Агава та банан демонструють протилежні стратегії адаптації до різних кліматичних умов. 

🌵 АГАВА розвинула механізми максимальної економії води:
• М'ясисті листки служать резервуарами для води
• Восковий шар мінімізує випаровування
• Колючки захищають від тварин, що шукають воду

🍌 БАНАН пристосований до умов надлишку вологи:
• М'які листки забезпечують ефективний фотосинтез
• Підземне стебло дозволяє швидко відновлюватися
• Потребує постійної високої вологості та освітлення

Ці адаптації є результатом мільйонів років еволюції в кардинально різних екосистемах - від екстремально посушливих пустель до вологих тропічних лісів.
`;

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function () {
  console.log('🌱 Додаток порівняння рослин завантажено успішно!');

  // Находим кнопку и элемент для вывода текста
  const conclusionBtn = document.getElementById('show-conclusion-btn');
  const conclusionTextEl = document.getElementById('conclusion-text');

  // Проверяем, что элементы существуют
  if (conclusionBtn && conclusionTextEl) {
    // Добавляем обработчик события для кнопки
    conclusionBtn.addEventListener('click', function () {
      // Вставляем текст с сохранением переносов строк
      conclusionTextEl.innerHTML = conclusionText.replace(/\n/g, '<br>');

      // Добавляем анимацию
      conclusionTextEl.classList.add('fade-in-up');

      // Меняем состояние кнопки
      conclusionBtn.textContent = 'Висновок показано';
      conclusionBtn.disabled = true;
      conclusionBtn.style.background = '#95a5a6';
      conclusionBtn.style.cursor = 'default';
    });
  } else {
    console.error('Элементы не найдены!');
  }

  // Добавляем случайный факт в футер
  const footer = document.querySelector('footer p');
  if (footer) {
    const facts = [
      'Агава може жити до 100 років!',
      'Банани технічно є ягодами!',
      'Агава використовується для виробництва текіли',
      'Існує понад 1000 сортів бананів',
      'Агава може вирости до 9 метрів у висоту',
    ];
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    footer.innerHTML += `<br><small>💡 Цікавий факт: ${randomFact}</small>`;
  }
});

// Обработка ошибок
window.addEventListener('error', function (e) {
  console.error('Помилка в додатку:', e.error);
});
