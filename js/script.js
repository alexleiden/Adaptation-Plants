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
      'https://cdn.pixabay.com/photo/2017/09/04/18/39/agave-2715341_1280.jpg',
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
      'https://cdn.pixabay.com/photo/2016/07/30/19/23/banana-1557303_1280.jpg',
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
    // Проверяем готовность DOM
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.init());
    } else {
      this.init();
    }
  }

  init() {
    console.log('🚀 Инициализация PlantComparison...');

    // Добавляем небольшую задержку для гарантии загрузки DOM
    setTimeout(() => {
      this.addSVGAnimations();
      this.setupEventListeners();
      this.addAnimations();
      this.createInteractiveFeatures();
      console.log('✅ PlantComparison инициализирован успешно');
    }, 100);
  }

  // Анимации для SVG элементов
  addSVGAnimations() {
    const agaveSVG = document.querySelector('.agave-illustration svg');
    const bananaSVG = document.querySelector('.banana-illustration svg');

    if (agaveSVG) {
      // Добавляем анимацию покачивания для агавы
      agaveSVG.addEventListener('mouseenter', function () {
        this.style.animation = 'gentle-shake 0.5s ease-in-out';
      });

      agaveSVG.addEventListener('animationend', function () {
        this.style.animation = '';
      });
    }

    if (bananaSVG) {
      // Добавляем анимацию колыхания листьев для банана
      bananaSVG.addEventListener('mouseenter', function () {
        this.style.animation = 'leaf-sway 1s ease-in-out';
      });

      bananaSVG.addEventListener('animationend', function () {
        this.style.animation = '';
      });
    }

    // Добавляем CSS для анимаций
    const style = document.createElement('style');
    style.textContent = `
            @keyframes gentle-shake {
                0%, 100% { transform: rotate(0deg); }
                25% { transform: rotate(1deg); }
                75% { transform: rotate(-1deg); }
            }
            
            @keyframes leaf-sway {
                0%, 100% { transform: rotate(0deg); }
                50% { transform: rotate(2deg); }
            }
        `;
    document.head.appendChild(style);

    console.log('🎨 SVG иллюстрации растений загружены');
  }

  // Настройка обработчиков событий
  setupEventListeners() {
    console.log('📝 Настройка обработчиков событий...');

    const conclusionBtn = document.getElementById('show-conclusion-btn');
    const closeConclusionBtn = document.getElementById('close-conclusion-btn');

    console.log('Кнопка показать вывод:', conclusionBtn);
    console.log('Кнопка закрыть вывод:', closeConclusionBtn);

    if (conclusionBtn) {
      conclusionBtn.addEventListener('click', e => {
        console.log('🖱️ Клик по кнопке "Показати висновок"');
        e.preventDefault();
        this.showConclusion();
      });
      console.log('✅ Обработчик для кнопки показа вывода добавлен');
    } else {
      console.error('❌ Кнопка "show-conclusion-btn" не найдена!');
    }

    if (closeConclusionBtn) {
      closeConclusionBtn.addEventListener('click', e => {
        console.log('🖱️ Клик по кнопке закрытия');
        e.preventDefault();
        this.hideConclusion();
      });
      console.log('✅ Обработчик для кнопки закрытия добавлен');
    } else {
      console.log('ℹ️ Кнопка закрытия пока скрыта');
    }

    // Добавляем интерактивность к строкам таблицы
    this.setupTableInteractivity();

    // Добавляем анимацию при скролле
    this.setupScrollAnimations();

    // Добавляем обработчик клавиши Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        console.log('⌨️ Нажата клавиша Escape');
        this.hideConclusion();
      }
    });

    console.log('✅ Все обработчики событий настроены');
  }

  // Показать вывод
  showConclusion() {
    console.log('📋 Показываем вывод...');

    const conclusionTextEl = document.getElementById('conclusion-text');
    const conclusionBtn = document.getElementById('show-conclusion-btn');
    const closeConclusionBtn = document.getElementById('close-conclusion-btn');

    console.log('Элементы:', {
      conclusionTextEl,
      conclusionBtn,
      closeConclusionBtn,
    });

    if (conclusionTextEl && conclusionBtn && closeConclusionBtn) {
      try {
        // Обновляем текст
        conclusionTextEl.innerHTML = conclusionText.replace(/\n/g, '<br>');
        conclusionTextEl.classList.add('fade-in-up');

        // Скрываем кнопку "Показати висновок"
        conclusionBtn.style.display = 'none';

        // Показываем кнопку закрытия
        closeConclusionBtn.style.display = 'flex';
        closeConclusionBtn.classList.add('fade-in-up');

        // Изменяем выравнивание текста на левое для лучшей читаемости
        conclusionTextEl.style.textAlign = 'left';

        // Добавляем эффект появления
        setTimeout(() => {
          closeConclusionBtn.style.opacity = '1';
          closeConclusionBtn.style.transform = 'scale(1)';
        }, 300);

        console.log('✅ Вывод показан успешно');
      } catch (error) {
        console.error('❌ Ошибка при показе вывода:', error);
      }
    } else {
      console.error('❌ Не все элементы найдены для показа вывода');
      console.error('conclusionTextEl:', conclusionTextEl);
      console.error('conclusionBtn:', conclusionBtn);
      console.error('closeConclusionBtn:', closeConclusionBtn);
    }
  }

  // Скрыть вывод
  hideConclusion() {
    const conclusionTextEl = document.getElementById('conclusion-text');
    const conclusionBtn = document.getElementById('show-conclusion-btn');
    const closeConclusionBtn = document.getElementById('close-conclusion-btn');

    if (conclusionTextEl && conclusionBtn && closeConclusionBtn) {
      // Анимация закрытия
      conclusionTextEl.style.opacity = '0';
      conclusionTextEl.style.transform = 'translateY(-20px)';
      closeConclusionBtn.style.opacity = '0';
      closeConclusionBtn.style.transform = 'scale(0.8)';

      setTimeout(() => {
        // Возвращаем исходное состояние
        conclusionTextEl.innerHTML =
          'Натисніть кнопку нижче, щоб побачити висновок про адаптації рослин.';
        conclusionTextEl.style.textAlign = 'center';
        conclusionTextEl.style.opacity = '1';
        conclusionTextEl.style.transform = 'translateY(0)';

        // Показываем кнопку "Показати висновок"
        conclusionBtn.style.display = 'inline-block';
        conclusionBtn.disabled = false;
        conclusionBtn.textContent = 'Показати висновок';
        conclusionBtn.style.background = '#e74c3c';
        conclusionBtn.style.cursor = 'pointer';

        // Скрываем кнопку закрытия
        closeConclusionBtn.style.display = 'none';

        // Добавляем эффект появления кнопки
        conclusionBtn.style.opacity = '0';
        conclusionBtn.style.transform = 'scale(0.8)';
        setTimeout(() => {
          conclusionBtn.style.opacity = '1';
          conclusionBtn.style.transform = 'scale(1)';
        }, 100);
      }, 300);
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

// Инициализация при загрузке страницы - ОСНОВНОЙ БЛОК
document.addEventListener('DOMContentLoaded', () => {
  console.log('🌟 DOM загружен, запускаем приложение...');

  try {
    const comparison = new PlantComparison();
    console.log('✅ PlantComparison создан:', comparison);

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

    // Дополнительная проверка кнопки через 1 секунду
    setTimeout(() => {
      const btn = document.getElementById('show-conclusion-btn');
      console.log('🔍 Проверка кнопки через 1 секунду:', btn);
      if (btn) {
        console.log('✅ Кнопка найдена и готова к работе');

        // Принудительно добавляем обработчик если его нет
        if (!btn.onclick && !btn._hasClickListener) {
          btn.addEventListener('click', function () {
            console.log('🖱️ Резервный обработчик сработал!');
            if (window.plantComparison) {
              window.plantComparison.showConclusion();
            }
          });
          btn._hasClickListener = true;
          console.log('🔧 Добавлен резервный обработчик');
        }
      } else {
        console.error('❌ Кнопка все еще не найдена через 1 секунду!');
      }
    }, 1000);

    // Сохраняем экземпляр в глобальной области для отладки
    window.plantComparison = comparison;
  } catch (error) {
    console.error('❌ Ошибка при инициализации:', error);
    console.error('Stack trace:', error.stack);
  }
});

// Fallback для старых браузеров
if (document.readyState !== 'loading') {
  console.log('📄 DOM уже загружен, инициализируем немедленно...');
  setTimeout(() => {
    if (!window.plantComparison) {
      console.log('🔄 Запуск fallback инициализации...');
      try {
        window.plantComparison = new PlantComparison();
      } catch (error) {
        console.error('❌ Fallback ошибка:', error);
      }
    }
  }, 500);
}

// Обработка ошибок
window.addEventListener('error', e => {
  console.error('Помилка в додатку:', e.error);
});

// Резервная функция для onclick в HTML
function handleConclusionClick() {
  console.log('🔧 Резервная функция handleConclusionClick вызвана');

  if (window.plantComparison) {
    window.plantComparison.showConclusion();
  } else {
    console.log('⚠️ plantComparison не найден, показываем вывод напрямую');
    showConclusionDirect();
  }
}

// Прямая функция показа вывода без класса
function showConclusionDirect() {
  console.log('📋 Показываем вывод напрямую...');

  const conclusionTextEl = document.getElementById('conclusion-text');
  const conclusionBtn = document.getElementById('show-conclusion-btn');
  const closeConclusionBtn = document.getElementById('close-conclusion-btn');

  const conclusionText = `
Агава та банан демонструють протилежні стратегії адаптації до різних кліматичних умов. <br><br>

🌵 <strong>АГАВА</strong> розвинула механізми максимальної економії води:<br>
• М'ясисті листки служать резервуарами для води<br>
• Восковий шар мінімізує випаровування<br>
• Колючки захищають від тварин, що шукають воду<br><br>

🍌 <strong>БАНАН</strong> пристосований до умов надлишку вологи:<br>
• М'які листки забезпечують ефективний фотосинтез<br>
• Підземне стебло дозволяє швидко відновлюватися<br>
• Потребує постійної високої вологості та освітлення<br><br>

Ці адаптації є результатом мільйонів років еволюції в кардинально різних екосистемах - від екстремально посушливих пустель до вологих тропічних лісів.
    `;

  if (conclusionTextEl && conclusionBtn && closeConclusionBtn) {
    conclusionTextEl.innerHTML = conclusionText;
    conclusionTextEl.style.textAlign = 'left';

    conclusionBtn.style.display = 'none';
    closeConclusionBtn.style.display = 'flex';
    closeConclusionBtn.style.opacity = '1';

    // Добавляем обработчик для кнопки закрытия
    closeConclusionBtn.onclick = function () {
      conclusionTextEl.innerHTML =
        'Натисніть кнопку нижче, щоб побачити висновок про адаптації рослин.';
      conclusionTextEl.style.textAlign = 'center';
      conclusionBtn.style.display = 'inline-block';
      closeConclusionBtn.style.display = 'none';
    };

    console.log('✅ Вывод показан прямой функцией');
  }
}

// Экспорт для возможного использования в других модулях
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PlantComparison, Utils };
}
