// Данные о растениях
const plantsData = {
  agave: {
    name: 'Агава',
    climate: 'Пустельний',
    adaptations: [
      "М'ясисті листки для запасання води",
      'Восковий шар для захисту від випаровування',
      'Колючки для захисту від тварин',
      'Компактна розетка листків',
      'Використання різних джерел вологи',
    ],
    image:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop',
  },
  banana: {
    name: 'Банан',
    climate: 'Тропічний',
    adaptations: [
      "М'які великі листкові пластинки",
      'Підземне стебло-кореневище',
      'Швидке відновлення після пошкоджень',
      'Потреба у високій вологості',
      'Залежність від достатнього освітлення',
    ],
    image:
      'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=200&fit=crop',
  },
};

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

// Класс для управления сравнением растений
class PlantComparison {
  constructor() {
    this.init();
  }

  init() {
    this.loadImages();
    this.setupEventListeners();
    this.addAnimations();
    this.createInteractiveFeatures();
  }

  // Загрузка изображений
  loadImages() {
    const agaveImg = document.getElementById('agave-img');
    const bananaImg = document.getElementById('banana-img');

    if (agaveImg) {
      agaveImg.src = plantsData.agave.image;
      agaveImg.alt = plantsData.agave.name;
    }

    if (bananaImg) {
      bananaImg.src = plantsData.banana.image;
      bananaImg.alt = plantsData.banana.name;
    }
  }

  // Настройка обработчиков событий
  setupEventListeners() {
    const conclusionBtn = document.getElementById('show-conclusion-btn');
    if (conclusionBtn) {
      conclusionBtn.addEventListener('click', this.showConclusion.bind(this));
    }

    // Добавляем интерактивность к строкам таблицы
    this.setupTableInteractivity();

    // Добавляем анимацию при скролле
    this.setupScrollAnimations();
  }

  // Показать вывод
  showConclusion() {
    const conclusionTextEl = document.getElementById('conclusion-text');
    const conclusionBtn = document.getElementById('show-conclusion-btn');

    if (conclusionTextEl && conclusionBtn) {
      conclusionTextEl.innerHTML = conclusionText.replace(/\n/g, '<br>');
      conclusionTextEl.classList.add('fade-in-up');

      conclusionBtn.textContent = 'Висновок показано';
      conclusionBtn.disabled = true;
      conclusionBtn.style.background = '#95a5a6';
      conclusionBtn.style.cursor = 'default';
    }
  }

  // Интерактивность таблицы
  setupTableInteractivity() {
    const tableRows = document.querySelectorAll('#comparison-table tbody tr');

    tableRows.forEach(row => {
      row.addEventListener('mouseenter', function () {
        this.style.transform = 'scale(1.02)';
        this.style.zIndex = '10';
        this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
      });

      row.addEventListener('mouseleave', function () {
        this.style.transform = 'scale(1)';
        this.style.zIndex = '1';
        this.style.boxShadow = 'none';
      });
    });
  }

  // Анимации при скролле
  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-up');
        }
      });
    }, observerOptions);

    // Наблюдаем за секциями
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      observer.observe(section);
    });
  }

  // Создание интерактивных функций
  createInteractiveFeatures() {
    this.addPlantCardHoverEffects();
    this.addFeatureHighlighting();
    this.createProgressIndicator();
  }

  // Эффекты при наведении на карточки растений
  addPlantCardHoverEffects() {
    const plantCards = document.querySelectorAll('.plant-card');

    plantCards.forEach(card => {
      card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px) rotateY(5deg)';
      });

      card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) rotateY(0deg)';
      });
    });
  }

  // Подсветка особенностей
  addFeatureHighlighting() {
    const featureItems = document.querySelectorAll('.feature-card li');

    featureItems.forEach(item => {
      item.addEventListener('click', function () {
        this.classList.toggle('highlighted');

        if (this.classList.contains('highlighted')) {
          this.style.background = '#3498db';
          this.style.color = 'white';
          this.style.transform = 'scale(1.05)';
        } else {
          this.style.background = '#ecf0f1';
          this.style.color = '#333';
          this.style.transform = 'scale(1)';
        }
      });
    });
  }

  // Индикатор прогресса изучения
  createProgressIndicator() {
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBar.innerHTML = `
            <div class="progress-fill"></div>
            <span class="progress-text">Прогрес изучения: 0%</span>
        `;

    // Добавляем стили для прогресс-бара
    const style = document.createElement('style');
    style.textContent = `
            .progress-bar {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 4px;
                background: rgba(255,255,255,0.3);
                z-index: 1000;
            }
            .progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #3498db, #2ecc71);
                width: 0%;
                transition: width 0.3s ease;
            }
            .progress-text {
                position: fixed;
                top: 10px;
                right: 20px;
                background: rgba(0,0,0,0.7);
                color: white;
                padding: 5px 10px;
                border-radius: 15px;
                font-size: 0.8em;
                z-index: 1001;
            }
        `;

    document.head.appendChild(style);
    document.body.appendChild(progressBar);

    // Обновляем прогресс при скролле
    window.addEventListener('scroll', () => {
      const scrollPercent =
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
        100;
      const fillEl = progressBar.querySelector('.progress-fill');
      const textEl = progressBar.querySelector('.progress-text');

      fillEl.style.width = scrollPercent + '%';
      textEl.textContent = `Прогрес вивчення: ${Math.round(scrollPercent)}%`;
    });
  }
}

// Дополнительные утилиты
class Utils {
  // Генератор случайных фактов о растениях
  static getRandomFact() {
    const facts = [
      'Агава може жити до 100 років!',
      'Банани технічно є ягодами!',
      'Агава використовується для виробництва текіли',
      'Існує понад 1000 сортів бананів',
      'Агава може вирости до 9 метрів у висоту',
    ];
    return facts[Math.floor(Math.random() * facts.length)];
  }

  // Создание всплывающих подсказок
  static createTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;

    const style = document.createElement('style');
    style.textContent = `
            .tooltip {
                position: absolute;
                background: #2c3e50;
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 0.9em;
                z-index: 1000;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            .tooltip::before {
                content: '';
                position: absolute;
                top: 100%;
                left: 50%;
                transform: translateX(-50%);
                border: 5px solid transparent;
                border-top-color: #2c3e50;
            }
        `;

    if (!document.querySelector('.tooltip-style')) {
      style.className = 'tooltip-style';
      document.head.appendChild(style);
    }

    document.body.appendChild(tooltip);

    element.addEventListener('mouseenter', e => {
      const rect = e.target.getBoundingClientRect();
      tooltip.style.left = rect.left + rect.width / 2 + 'px';
      tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
      tooltip.style.opacity = '1';
    });

    element.addEventListener('mouseleave', () => {
      tooltip.style.opacity = '0';
    });
  }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  const comparison = new PlantComparison();

  // Добавляем случайный факт в футер
  const footer = document.querySelector('footer p');
  if (footer) {
    footer.innerHTML += `<br><small>💡 Цікавий факт: ${Utils.getRandomFact()}</small>`;
  }

  // Добавляем подсказки к важным элементам
  const agaveCard = document.querySelector('.plant-card.agave h2');
  const bananaCard = document.querySelector('.plant-card.banana h2');

  if (agaveCard) {
    Utils.createTooltip(agaveCard, 'Клацніть для додаткової інформації');
  }
  if (bananaCard) {
    Utils.createTooltip(bananaCard, 'Клацніть для додаткової інформації');
  }

  console.log('🌱 Додаток порівняння рослин завантажено успішно!');
});

// Обработка ошибок
window.addEventListener('error', e => {
  console.error('Помилка в додатку:', e.error);
});

// Экспорт для возможного использования в других модулях
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PlantComparison, Utils };
}
