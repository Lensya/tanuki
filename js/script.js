document.addEventListener("DOMContentLoaded", function () {
  // dropdown
  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector(".dropdown-toggle");
    const menu = dropdown.querySelector(".dropdown-menu");

    toggle.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      dropdowns.forEach((otherDropdown) => {
        if (otherDropdown !== dropdown) {
          otherDropdown
            .querySelector(".dropdown-menu")
            .classList.remove("active");
          otherDropdown
            .querySelector(".dropdown-toggle")
            .classList.remove("active-btn");
        }
      });

      menu.classList.toggle("active");
      toggle.classList.toggle("active-btn");
    });
  });

  // Закрываем меню при клике вне его
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".dropdown")) {
      document.querySelectorAll(".dropdown-menu").forEach((menu) => {
        menu.classList.remove("active");
      });
      document.querySelectorAll(".dropdown-toggle").forEach((btn) => {
        btn.classList.remove("active-btn");
      });
    }
  });

  // Код для фиксированного хедера
  const header = document.querySelector(".header");
  const secondRow = document.querySelector(".header__second-row");

  let lastScrollTop = 0;
  const scrollThreshold = 37; // Порог скролла для активации фиксированного хедера

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > scrollThreshold) {
      header.classList.add("header--fixed");
      secondRow.classList.add("header__second-row--fixed");
    } else {
      header.classList.remove("header--fixed");
      secondRow.classList.remove("header__second-row--fixed");
    }

    lastScrollTop = scrollTop;
  });

  // Tabs
  const initTabs = () => {
    const tabsContainers = document.querySelectorAll(".tabs");

    tabsContainers.forEach((container) => {
      const tabs = container.querySelectorAll(".tabs-nav__item");
      const contents = container.querySelectorAll(".tabs-content__item");

      tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
          tabs.forEach((t) => t.classList.remove("active"));
          contents.forEach((c) => c.classList.remove("active"));
          tab.classList.add("active");
          const contentId = tab.getAttribute("data-tab");
          const contentElement = container.querySelector(
            `.tabs-content__item[data-tab-content="${contentId}"]`
          );
          if (contentElement) {
            contentElement.classList.add("active");
          } else {
            console.warn(
              `Content element with data-tab-content="${contentId}" not found`
            );
          }
        });
      });
    });
  };
  initTabs();

  // Мобильное меню
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileMenuTrigger = document.querySelector(".mobile-menu__trigger");
  const mobileMenuClose = mobileMenu?.querySelector(".mobile-menu__close");
  function openMobileMenu() {
    mobileMenu.classList.add("active");
    document.body.style.overflow = "hidden";
  }
  function closeMobileMenu() {
    mobileMenu.classList.remove("active");
    document.body.style.overflow = "";
  }
  if (mobileMenuTrigger && mobileMenu && mobileMenuClose) {
    mobileMenuTrigger.addEventListener("click", openMobileMenu);
    mobileMenuClose.addEventListener("click", closeMobileMenu);
  }

  // модальные окна в мобильном меню
  const dropdownToggles = document.querySelectorAll(
    ".mobile-menu__dropdown-toggle"
  );
  const mobileDropdowns = document.querySelectorAll(".mobile-menu__dropdown");
  const mobileMenuOverlay = document.querySelector(".mobile-menu__overlay");
  function closeAllDropdowns() {
    mobileDropdowns.forEach((drop) => (drop.style.display = "none"));
    mobileMenuOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }
  dropdownToggles.forEach((toggle, idx) => {
    toggle.addEventListener("click", function () {
      closeAllDropdowns();
      mobileDropdowns[idx].style.display = "block";
      mobileMenuOverlay.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });
  if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener("click", closeAllDropdowns);
  }
  // Закрытие по .mobile-menu__close и .btn.main-btn внутри dropdown
  mobileDropdowns.forEach((dropdown) => {
    const closeBtn = dropdown.querySelector(".mobile-menu__close");
    const doneBtn = dropdown.querySelector(".btn.main-btn");
    if (closeBtn) closeBtn.addEventListener("click", closeAllDropdowns);
    if (doneBtn) doneBtn.addEventListener("click", closeAllDropdowns);
  });

  //товары в избранное в каталоге
  const productFavor = document.querySelectorAll(".product-card__fav");
  if (productFavor) {
    productFavor.forEach((favor) => {
      favor.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        favor.classList.toggle("added");
      });
    });
  }
  //товары в избранное в карточке
  const productCardFavor = document.querySelectorAll(".product__fav");
  if (productCardFavor) {
    productCardFavor.forEach((favor) => {
      favor.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        productCardFavor.forEach((item) => {
          item.classList.toggle("added");
        });
      });
    });
  }

  //Скрываем лишние список авто запчастей
  function toggleAutopartsList(e) {
    const showMore = e.currentTarget;
    const list = showMore.previousElementSibling;
    if (!(list && list.classList.contains("autoparts__list"))) return;
    const items = Array.from(list.children);
    const isOpened = showMore.classList.contains("opened");

    if (!isOpened) {
      items.forEach((li) => (li.style.display = "list-item"));
      showMore.classList.add("opened");
      showMore.querySelector("span").textContent = "Скрыть";
    } else {
      items.forEach((li, idx) => {
        li.style.display =
          window.innerWidth < 767 && idx >= 8 ? "none" : "list-item";
      });
      showMore.classList.remove("opened");
      showMore.querySelector("span").textContent = "Показать все";
    }
  }
  document.querySelectorAll(".show-more").forEach((btn) => {
    btn.addEventListener("click", toggleAutopartsList);
  });

  // уведомление в карточке товара
  let alertNote = document.querySelector(".alert");
  if (alertNote) {
    document
      .querySelector(".alert-close")
      .addEventListener("click", function () {
        document.querySelector(".alert").style.display = "none";
      });
  }

  //notifications
  const notesTooltip = document.querySelector(".notes-tooltip");
  const closeNotes = document.querySelector(".notes-close");
  const notesTrigger = document.querySelector(".notes-trigger");

  notesTrigger.addEventListener("click", function () {
    notesTooltip.classList.add("open");
    document.body.style.overflow = "hidden";
  });
  closeNotes.addEventListener("click", function () {
    notesTooltip.classList.remove("open");
    document.body.style.overflow = "";
  });

  // Универсальный обработчик модалок
  function closeAllModals() {
    document
      .querySelectorAll(".modal.active")
      .forEach((modal) => modal.classList.remove("active"));
    const overlay = document.querySelector(".modal-overlay");
    if (overlay) overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  document.body.addEventListener("click", function (e) {
    // Открытие
    const openBtn = e.target.closest("[data-modal-open]");
    if (openBtn) {
      e.preventDefault();
      const modalId = openBtn.getAttribute("data-modal-open");
      const modal = document.getElementById(modalId);
      const overlay = document.querySelector(".modal-overlay");
      if (modal && overlay) {
        modal.classList.add("active");
        overlay.classList.add("active");
        document.body.style.overflow = "hidden";

        // ДОБАВЛЯЕМ: вставка значения OEM в модалку (поиск новых запчастей)
        if (modalId === "autoparts-new-modal") {
          const fromInput = document.getElementById("oem-enter");
          const toInput = modal.querySelector("#oem");
          if (fromInput && toInput) {
            toInput.value = fromInput.value;
            toInput.focus();
          }
        }
      }
    }

    // Закрытие по кнопке
    if (e.target.closest("[data-modal-close]")) {
      closeAllModals();
    }
  });

  // Закрытие по оверлею
  const overlayModal = document.querySelector(".modal-overlay");
  if (overlayModal) {
    overlayModal.addEventListener("click", closeAllModals);
  }

  // Закрытие по Esc
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
      closeAllModals();
    }
  });

  //вывод окна со всеми категориями
  const categoriesAllBtn = document.querySelector(".categories-all");
  const categoriesRow = document.querySelector(".categories-row");
  const categoriesRowClose = categoriesRow?.querySelector(
    ".categories-row__close"
  );

  if (categoriesAllBtn && categoriesRow && categoriesRowClose) {
    categoriesAllBtn.addEventListener("click", function (e) {
      e.preventDefault();
      categoriesRow.classList.add("expanded");
    });

    categoriesRowClose.addEventListener("click", function () {
      categoriesRow.classList.remove("expanded");
    });
  }

  // переключения отображения товаров
  const productsBlock = document.querySelector(".category__products");
  const btnList = document.querySelector(".btn__view-list");
  const btnTile = document.querySelector(".btn__view-tile");

  if (productsBlock && btnList && btnTile) {
    btnList.addEventListener("click", function () {
      productsBlock.classList.add("view-list");
      this.classList.add("active");
      productsBlock.classList.remove("view-tile");
      btnTile.classList.remove("active");
    });

    btnTile.addEventListener("click", function () {
      productsBlock.classList.add("view-tile");
      productsBlock.classList.remove("view-list");
      this.classList.add("active");
      btnList.classList.remove("active");
    });
  }

  // --- Удаление выбранных фильтров ---
  const selectedFilters = document.querySelector(".selected-filters");
  if (selectedFilters) {
    selectedFilters.addEventListener("click", function (e) {
      // Удаление одного фильтра
      if (e.target.closest(".selected-remove")) {
        const filter = e.target.closest(".selected-filter");
        if (filter) filter.remove();
      }
      // Очистить все
      if (e.target.closest(".clear-filters")) {
        selectedFilters
          .querySelectorAll(".selected-filter")
          .forEach(function (f) {
            f.remove();
          });
        const clearBtn = selectedFilters.querySelector(".clear-filters");
        if (clearBtn) clearBtn.remove();
      }
    });
  }

  // Мобильное меню
  const mobileFilter = document.querySelector(".category__filter");
  const mobileFilterTrigger = document.querySelector(".filter-open-btn");
  const mobileFilterClose = document.querySelector(".close-filters");
  function openMobileFilter() {
    mobileFilter.classList.add("active");
    document.body.style.overflow = "hidden";
  }
  function closeMobileFilter() {
    mobileFilter.classList.remove("active");
    document.body.style.overflow = "";
  }
  if (mobileFilter) {
    mobileFilterTrigger.addEventListener("click", openMobileFilter);
    mobileFilterClose.addEventListener("click", closeMobileFilter);
  }

  //выбор количества товара
  document.querySelectorAll(".product-card__action").forEach((actionBlock) => {
    const btn = actionBlock.querySelector(".btn");
    const countBlock = actionBlock.querySelector(".product-card__count");
    if (btn && countBlock) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        btn.style.visibility = "hidden";
        countBlock.style.visibility = "visible";
      });
    }
    const minusBtn = countBlock.querySelector(".count__minus");
    const plusBtn = countBlock.querySelector(".count__plus");
    const input = countBlock.querySelector(".count__numeric");

    if (minusBtn && plusBtn && input) {
      minusBtn.addEventListener("click", function () {
        let val = parseInt(input.value, 10) || 1;
        if (val > 0) {
          input.value = val - 1;
        }
      });
      plusBtn.addEventListener("click", function () {
        let val = parseInt(input.value, 10) || 1;
        input.value = val + 1;
      });
    }
  });

  //Популярные категории на главной
  function clampTags(box) {
    // Все ссылки, включая .more, но она должна быть в конце!
    const allItems = [...box.querySelectorAll(".tag")];
    const more = box.querySelector(".rest-cats");
    const tags = allItems.filter((tag) => tag !== more);

    // Сброс: показываем все, включая кнопку "ещё"
    allItems.forEach((tag) => tag.classList.remove("is-hidden"));

    if (tags.length === 0) return;

    const firstTop = tags[0].offsetTop;
    const rowHeight = tags[0].offsetHeight;

    // Сначала скрываем все теги кроме more, считаем сколько помещается
    let fittingTags = [];
    let hiddenCount = 0;

    for (const tag of tags) {
      if (tag.offsetTop - firstTop < 2 * rowHeight) {
        fittingTags.push(tag);
      } else {
        hiddenCount++;
      }
    }
    // Добавим more и проверим, помещается ли оно во вторую строку
    if (more.offsetTop - firstTop >= 2 * rowHeight) {
      // .more попал на третью строку — нужно убрать один из fittingTags
      let last = fittingTags.pop();
      if (last) {
        last.classList.add("is-hidden");
        hiddenCount++;
      }
    }
    // Прячем все теги, что не влезли
    tags.forEach((tag) => {
      if (!fittingTags.includes(tag)) {
        tag.classList.add("is-hidden");
      }
    });
    // Показываем кнопку "ещё", если нужно
    if (hiddenCount > 0) {
      more.querySelector("span").textContent = hiddenCount;
      more.classList.remove("is-hidden");
    } else {
      more.classList.add("is-hidden");
    }
  }
  // Применяем ко всем блокам с тегами
  document.querySelectorAll(".popular-categories__links").forEach((box) => {
    const ro = new ResizeObserver(() => clampTags(box));
    ro.observe(box);
    clampTags(box);
  });

  //toTop btn
  const toTopBtn = document.querySelector(".totop");
  if (!toTopBtn) return;
  window.addEventListener("scroll", function () {
    if (window.scrollY > 1000) {
      toTopBtn.classList.add("active");
    } else {
      toTopBtn.classList.remove("active");
    }
  });
  toTopBtn.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  //cookies
  const cookiesNote = document.querySelector(".cookies-note");
  const closeBtnCookies = cookiesNote?.querySelector(".cookies-note__close");
  const agreeBtn = cookiesNote?.querySelector(".cookies-note__agree");
  const LS_KEY = "cookies_accepted";
  if (cookiesNote && localStorage.getItem(LS_KEY) !== "true") {
    cookiesNote.style.display = "flex";
  }
  function hideCookiesNote() {
    if (cookiesNote) cookiesNote.style.display = "none";
  }
  if (closeBtnCookies) {
    closeBtnCookies.addEventListener("click", hideCookiesNote);
  }
  // клик по "Согласен"
  if (agreeBtn) {
    agreeBtn.addEventListener("click", function () {
      localStorage.setItem(LS_KEY, "true");
      hideCookiesNote();
    });
  }

  //Валидация форм
  function validatePassword(password) {
    const minLength = /.{8,}/;
    const upper = /[A-Z]/;
    const lower = /[a-z]/;
    const digit = /\d/;
    const special = /[^A-Za-z0-9]/;
    const onlyLatin = /^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]+$/;

    return (
      minLength.test(password) &&
      upper.test(password) &&
      lower.test(password) &&
      digit.test(password) &&
      special.test(password) &&
      onlyLatin.test(password)
    );
  }

  //Универсальная инициализация форм регистрации/смены пароля
  function setupPasswordForm(formSelector) {
    const form = document.querySelector(formSelector);
    if (!form) return;

    const passwordInput = form.querySelector("#password");
    const passwordRepeatInput = form.querySelector("#password-repeat");
    const phoneInput = form.querySelector("#phone");
    const emailInput = form.querySelector('input[name="email"]');
    const nameInput = form.querySelector('input[name="name"]');
    const submitBtn = form.querySelector(".login-form__submit");
    const agreeCheckbox = form.querySelector("#agree");
    const passView = form.querySelector(".password-control");

    const passwordError = passwordInput
      ?.closest(".login-form__input")
      ?.querySelector(".error");
    const passwordRepeatError = passwordRepeatInput
      ?.closest(".login-form__input")
      ?.querySelector(".error");
    const phoneError = phoneInput
      ?.closest(".login-form__input")
      ?.querySelector(".error");

    // intl-tel-input
    let iti = null;
    if (phoneInput && window.intlTelInput) {
      iti = window.intlTelInput(phoneInput, {
        initialCountry: "ru",
        nationalMode: false,
        separateDialCode: true,
        utilsScript:
          "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js",
      });
    }

    function validatePhone() {
      return iti && iti.isValidNumber();
    }

    function checkRequiredFields() {
      const required = [
        passwordInput,
        passwordRepeatInput,
        phoneInput,
        emailInput,
        nameInput,
      ].filter(Boolean);
      const allFilled = required.every((input) => input.value.trim() !== "");
      if (submitBtn) submitBtn.disabled = !allFilled;
    }

    // Поля: реакция на ввод
    [
      passwordInput,
      passwordRepeatInput,
      phoneInput,
      emailInput,
      nameInput,
    ].forEach((input) => {
      if (!input) return;
      input.addEventListener("input", checkRequiredFields);
      input.addEventListener("focus", () => {
        input.classList.remove("invalid");
        const error = input
          .closest(".login-form__input")
          ?.querySelector(".error");
        if (error) error.style.display = "none";
      });
    });

    // Глазик для пароля
    // if (passView && passwordInput) {
    //   passwordInput.addEventListener(
    //     "focus",
    //     () => (passView.style.display = "block")
    //   );
    //   passView.addEventListener("click", () => {
    //     const type =
    //       passwordInput.getAttribute("type") === "password"
    //         ? "text"
    //         : "password";
    //     passwordInput.setAttribute("type", type);
    //     const svgUse = passView.querySelector("svg use");
    //     if (svgUse)
    //       svgUse.setAttribute(
    //         "href",
    //         type === "text" ? "sprite.svg#eyeOpen" : "sprite.svg#eye"
    //       );
    //   });
    // }

    // Для всех блоков с паролями
    //const passView = document.querySelector('.password-control');
    let passShown = false;

    if (passView) {
      // Показываем глазик при фокусе на input
      const input = passView
        .closest(".login-form__passwords")
        .querySelector('input[type="password"], input[type="text"]');
      if (input) {
        input.addEventListener("focus", () => {
          passView.style.display = "inline-flex"; // или 'block', как нужно по стилям
        });
      }

      // По умолчанию глазик скрыт
      passView.style.display = "none";

      // Клик по глазку — меняем тип у всех password-полей
      passView.addEventListener("click", () => {
        passShown = !passShown;
        document
          .querySelectorAll('input[type="password"], input[type="text"]')
          .forEach((inp) => {
            // Меняем только если это поле для пароля (можно добавить проверку по классу или placeholder)
            if (inp.type === "password" && passShown) {
              inp.type = "text";
            } else if (inp.type === "text" && !passShown) {
              inp.type = "password";
            }
          });
        // Меняем иконку глазика
        const svgUse = passView.querySelector("svg use");
        if (svgUse)
          svgUse.setAttribute(
            "href",
            passShown ? "sprite.svg#eyeOpen" : "sprite.svg#eye"
          );
      });
    }

    let passForm = document.getElementById("new-password-form");
    if (passForm) {
      passForm.addEventListener("submit", function (e) {
        e.preventDefault();
        document.getElementById("new-pass-modal").classList.remove("active");
        document.getElementById("success-modal").classList.add("active");
      });
    }
    // Только цифры в телефоне
    if (phoneInput) {
      phoneInput.addEventListener("input", function () {
        this.value = this.value.replace(/[^\d]/g, "");
      });
    }

    // Отправка формы
    form.addEventListener("submit", function (e) {
      let valid = true;

      if (!validatePassword(passwordInput.value)) {
        passwordError && (passwordError.style.display = "block");
        passwordInput.classList.add("invalid");
        valid = false;
      }

      if (
        passwordRepeatInput &&
        passwordInput.value !== passwordRepeatInput.value
      ) {
        passwordRepeatError && (passwordRepeatError.style.display = "block");
        passwordRepeatInput.classList.add("invalid");
        valid = false;
      }

      if (phoneInput && !validatePhone()) {
        phoneError && (phoneError.style.display = "block");
        phoneInput.classList.add("invalid");
        valid = false;
      }

      if (emailInput && emailInput.value.trim() === "") {
        emailInput.classList.add("invalid");
        valid = false;
      }

      if (nameInput && nameInput.value.trim() === "") {
        nameInput.classList.add("invalid");
        valid = false;
      }

      if (agreeCheckbox && !agreeCheckbox.checked) {
        agreeCheckbox.classList.add("invalid");
        valid = false;
      }

      if (!valid) {
        e.preventDefault();
      }
    });

    if (agreeCheckbox) {
      agreeCheckbox.addEventListener("change", function () {
        if (this.checked) this.classList.remove("invalid");
      });
    }
  }

  //Инициализация форм
  setupPasswordForm('form[name="add-address"]');
  setupPasswordForm('form[name="sign-up"]');
  setupPasswordForm('form[name="new-password"]');

  //Авторизация
  (function () {
    const authForm = document.querySelector('form[name="sign-in"]');
    if (!authForm) return;

    const emailInput = authForm.querySelector('input[type="email"]');
    const passwordInput = authForm.querySelector('input[type="password"]');
    const submitBtn = authForm.querySelector(".login-form__submit");
    const passView = authForm.querySelector(".password-control");

    function checkFields() {
      if (submitBtn) {
        submitBtn.disabled = !(
          emailInput?.value.trim() && passwordInput?.value.trim()
        );
      }
    }

    [emailInput, passwordInput].forEach((input) => {
      if (input) input.addEventListener("input", checkFields);
    });

    if (passView && passwordInput) {
      passwordInput.addEventListener(
        "focus",
        () => (passView.style.display = "block")
      );
      passView.addEventListener("click", () => {
        const type =
          passwordInput.getAttribute("type") === "password"
            ? "text"
            : "password";
        passwordInput.setAttribute("type", type);
        const svgUse = passView.querySelector("svg use");
        if (svgUse)
          svgUse.setAttribute(
            "href",
            type === "text" ? "sprite.svg#eyeOpen" : "sprite.svg#eye"
          );
      });
    }

    checkFields(); // начальная проверка
  })();

  //скрыть/показать детали карточки аукциона
  const details = document.querySelector(".product__auction-details");
  const showMoreAuc = document.querySelector(".show-more-auction");

  if (details && showMoreAuc) {
    function toggleAuctionDetails() {
      details.classList.toggle("open");
      if (details.classList.contains("open")) {
        showMoreAuc.querySelector("span").textContent = "Скрыть";
        showMoreAuc.classList.add("opened");
      } else {
        showMoreAuc.querySelector("span").textContent = "Показать полностью";
        showMoreAuc.classList.remove("opened");
      }
    }
    showMoreAuc.addEventListener("click", toggleAuctionDetails);
  }

  // Категории: Скрыть/Показать все
  const detailsF = document.querySelector(".filter__cats-list");
  const showMoreAucF = document.querySelector(".filter__cats-more");
  if (showMoreAucF) {
    showMoreAucF.addEventListener("click", function (e) {
      e.preventDefault();
      detailsF.classList.toggle("full");
      if (detailsF.classList.contains("full")) {
        showMoreAucF.querySelector("span").textContent = "Скрыть";
        showMoreAucF.classList.add("opened");
      } else {
        showMoreAucF.querySelector("span").textContent = "Показать все";
        showMoreAucF.classList.remove("opened");
      }
    });
  }

  // Категории: раскрытие подменю
  document.querySelectorAll(".filter__cats-list > li").forEach(function (li) {
    const submenu = li.querySelector("ul");
    if (submenu) {
      li.addEventListener("click", function (e) {
        li.classList.toggle("open");
      });
    }
  });

  document.querySelectorAll(".filter-toggle").forEach(function (filterDt) {
    const filterBlock = filterDt.closest(".filter__block");
    if (filterBlock) {
      filterDt.addEventListener("click", function (e) {
        filterBlock.classList.toggle("closed");
      });
    }
  });

  // фиксированный блок с ценой в карточке
  const fixedBlock = document.querySelector(".product__price-fixed");
  const priceContainer = document.querySelector(".product__price-container");
  if (fixedBlock) {
    function checkVisibility() {
      const rect = priceContainer.getBoundingClientRect();
      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;
      // Если верх priceContainer виден в окне — скрываем фиксированный блок
      if (rect.top < windowHeight && rect.bottom > 0) {
        fixedBlock.classList.add("hide");
      } else {
        fixedBlock.classList.remove("hide");
      }
    }
    window.addEventListener("scroll", checkVisibility);
    window.addEventListener("resize", checkVisibility);
    checkVisibility();
  }

  // Кнопка "Стоимость доставки по Японии" скролл и открытие калькулятора
  const calcBtn = document.querySelector(".calc-delivery");
  const tabsBlock = document.querySelector(".product-info__tabs");
  if (calcBtn && tabsBlock) {
    calcBtn.addEventListener("click", function (e) {
      e.preventDefault();
      tabsBlock.scrollIntoView({ behavior: "smooth", block: "start" });
      // открывает вторую вкладку
      const tabNavs = tabsBlock.querySelectorAll(".tabs-nav__item");
      const tabContents = tabsBlock.querySelectorAll(".tabs-content__item");
      tabNavs.forEach((tab) => tab.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));
      if (tabNavs[1] && tabContents[1]) {
        tabNavs[1].classList.add("active");
        tabContents[1].classList.add("active");
      }
    });
  }

  // Цвета выбор
  const colorBtns = document.querySelectorAll(".product__colors .color-btn");
  const colorValue = document.querySelector(
    ".product__option-group .product__option-value"
  );
  colorBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      colorBtns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
      if (colorValue) {
        colorValue.textContent = this.getAttribute("aria-label");
      }
    });
  });

  // Оптическая сила
  const powerGroups = document.querySelectorAll(".product__option-group");
  powerGroups.forEach((group) => {
    const powerBtns = group.querySelectorAll(".product__powers .power-btn");
    const powerValue = group.querySelector(
      ".product__option-label .product__option-value"
    );
    if (powerBtns.length) {
      powerBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
          powerBtns.forEach((b) => b.classList.remove("active"));
          this.classList.add("active");
          if (powerValue) {
            powerValue.textContent = this.textContent;
          }
        });
      });
    }
  });

  // Модалки выбора цвета и оптической силы
  document.querySelectorAll(".product__option-link").forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const group = this.closest(".product__option-group");
      const colorsModal = group.querySelector(".select-colors-modal");
      const powersModal = group.querySelector(".select-powers-modal");
      //  const overlay = document.querySelector('.modal-overlay');
      // --- Цвет ---
      if (colorsModal) {
        const mainActive = group.querySelector(
          ".product__colors .color-btn.active"
        );
        if (mainActive) {
          const value = mainActive.getAttribute("aria-label");
          colorsModal
            .querySelectorAll(".color-btn")
            .forEach((btn) => btn.classList.remove("active"));
          colorsModal.querySelectorAll(".color-btn").forEach((btn) => {
            if (btn.getAttribute("aria-label") === value)
              btn.classList.add("active");
          });
          const label = colorsModal.querySelector(
            ".select-colors-modal__label span"
          );
          if (label) label.textContent = value;
        }
        //  colorsModal.style.display = 'block';
        //  if (overlay) overlay.style.display = 'block';
        //  document.body.classList.add('modal-open');
      }
      // --- Оптическая сила ---
      if (powersModal) {
        const mainActive = group.querySelector(
          ".product__powers .power-btn.active"
        );
        if (mainActive) {
          const value = mainActive.textContent;
          powersModal
            .querySelectorAll(".power-btn")
            .forEach((btn) => btn.classList.remove("active"));
          powersModal.querySelectorAll(".power-btn").forEach((btn) => {
            if (btn.textContent === value) btn.classList.add("active");
          });
          const label = powersModal.querySelector(
            ".select-powers-modal__label span"
          );
          if (label) label.textContent = value;
        }
        //  powersModal.style.display = 'block';
        //  if (overlay) overlay.style.display = 'block';
        //  document.body.classList.add('modal-open');
      }
    });
  });

  // Выбор цвета в модалке
  document
    .querySelectorAll(".select-colors-modal__colors")
    .forEach(function (colorsBlock) {
      colorsBlock.addEventListener("click", function (e) {
        const btn = e.target.closest(".color-btn");
        if (btn) {
          colorsBlock
            .querySelectorAll(".color-btn")
            .forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          // Обновить подпись выбранного цвета
          const label = colorsBlock
            .closest(".option-modal__body")
            .querySelector(".select-colors-modal__label span");
          if (label) label.textContent = btn.getAttribute("aria-label");
        }
      });
    });

  // Выбор оптической силы в модалке
  document
    .querySelectorAll(".select-powers-modal__powers")
    .forEach(function (powersBlock) {
      powersBlock.addEventListener("click", function (e) {
        if (e.target.classList.contains("power-btn")) {
          powersBlock
            .querySelectorAll(".power-btn")
            .forEach((btn) => btn.classList.remove("active"));
          e.target.classList.add("active");
          // Обновить подпись выбранной силы
          const label = powersBlock
            .closest(".option-modal__body")
            .querySelector(".select-powers-modal__label span");
          if (label) label.textContent = e.target.textContent;
        }
      });
    });

  // кнопка "Выбрать" — переносит выбранное значение в основной блок и закрывает модалку
  // для цвета
  document
    .querySelectorAll(".select-colors-modal .main-btn")
    .forEach(function (btn) {
      btn.addEventListener("click", function () {
        const modal = btn.closest(".select-colors-modal");
        const activeBtn = modal.querySelector(".color-btn.active");
        const value = activeBtn ? activeBtn.getAttribute("aria-label") : "";
        // Обновить основное поле
        const group = modal.closest(".product__option-group");
        const mainValue = group.querySelector(".product__option-value");
        if (mainValue) mainValue.textContent = value;
        // Перенести класс active на соответствующую кнопку в product__colors
        const mainColors = group.querySelectorAll(
          ".product__colors .color-btn"
        );
        mainColors.forEach((btn) => {
          if (btn.getAttribute("aria-label") === value) {
            btn.classList.add("active");
          } else {
            btn.classList.remove("active");
          }
        });
        //  closeCatsModal();
      });
    });
  // для оптической силы
  document
    .querySelectorAll(".select-powers-modal .main-btn")
    .forEach(function (btn) {
      btn.addEventListener("click", function () {
        const modal = btn.closest(".select-powers-modal");
        const activeBtn = modal.querySelector(".power-btn.active");
        const value = activeBtn ? activeBtn.textContent : "";
        // Обновить основное поле
        const group = modal.closest(".product__option-group");
        const mainValue = group.querySelector(".product__option-value");
        if (mainValue) mainValue.textContent = value;
        // Перенести класс active на соответствующую кнопку в product__powers
        const mainPowers = group.querySelectorAll(
          ".product__powers .power-btn"
        );
        mainPowers.forEach((btn) => {
          if (btn.textContent === value) {
            btn.classList.add("active");
          } else {
            btn.classList.remove("active");
          }
        });
        //  closeCatsModal();
      });
    });

  const inputSearch = document.querySelector("#mobile-search-input");
  const focusBlock = document.querySelector(".mobile-search-modal__focus");
  const nofocusBlock = document.querySelectorAll(
    ".mobile-search-modal__nofocus"
  );

  if (inputSearch && focusBlock) {
    inputSearch.addEventListener("input", function () {
      if (inputSearch.value.trim().length >= 3) {
        focusBlock.style.display = "flex";
        nofocusBlock.forEach((block) => {
          block.style.display = "none";
        });
      } else {
        focusBlock.style.display = "none";
        nofocusBlock.forEach((block) => {
          block.style.display = "";
        });
      }
    });
  }

  // Открытие мобильного окна поиска
  function openMobileSearchModal() {
    document.querySelector(".mobile-search-modal").classList.add("active");
    document.body.style.overflow = "hidden";
    // Фокус на инпут
    setTimeout(() => {
      const input = document.querySelector(".mobile-search-modal__form input");
      if (input) input.focus();
    }, 100);
  }

  // Закрытие мобильного окна поиска
  function closeMobileSearchModal() {
    document.querySelector(".mobile-search-modal").classList.remove("active");
    document.body.style.overflow = "";
  }

  // Открытие по клику на форму поиска или фокусе в инпуте

  // Только для мобильных
  function isMobile() {
    return window.innerWidth < 992;
  }

  // Поиск формы
  const searchForm = document.querySelector(".search-form");
  if (searchForm) {
    // Клик по форме
    searchForm.addEventListener("click", function (e) {
      if (isMobile()) {
        e.preventDefault();
        openMobileSearchModal();
      }
    });
  }

  // Кнопка "назад"
  const backBtn = document.querySelector(".mobile-search-modal__back");
  if (backBtn) {
    backBtn.addEventListener("click", function (e) {
      e.preventDefault();
      closeMobileSearchModal();
    });
  }

  // Удаление элемента поиска из истории по нажатию на крестик
  document.addEventListener("click", function (e) {
    if (e.target.closest(".mobile-search-modal__remove")) {
      const li = e.target.closest("li");
      if (li) li.remove();
    }
  });

  //сворачивание сайдбара в ЛК
  let sidebar = document.querySelector(".account-sidebar");
  let collapseBtn = document.querySelector(".account-sidebar__collapse");

  if (sidebar && collapseBtn) {
    collapseBtn.addEventListener("click", function () {
      sidebar.classList.toggle("collapsed");
    });
  }

  //дропдаун в личном кабинете
  const ordersDropdowns = document.querySelectorAll(".orders-status__dropdown");

  ordersDropdowns.forEach((dropdown) => {
    const doneBtn = dropdown.querySelector(".dropdown-done-btn");
    const menu = dropdown.querySelector(".orders-status__dropdown-menu");
    const toggle = dropdown.querySelector(".dropdown-toggle");

    if (!doneBtn || !menu || !toggle) return;

    // Закрытие дропдауна
    function closeDropdown() {
      menu.classList.remove("active");
      toggle.classList.remove("active-btn");
    }

    // Клик по кнопке "Готово"
    doneBtn.addEventListener("click", closeDropdown);

    // Клик вне вложенных элементов — по самому меню
    menu.addEventListener("click", function (e) {
      if (e.target === menu) {
        closeDropdown();
      }
    });
  });

  //"Выбрать все" в корзине
  const checkAll = document.getElementById("check-all");
  const deleteBtn = document.querySelector(".cart__delete-selected");

  if (checkAll) {
    function getProductCheckboxes() {
      return document.querySelectorAll(
        '.cart__product-item .checkbox-input input[type="checkbox"]'
      );
    }

    // Функция для обновления состояния кнопки
    function updateDeleteBtnState() {
      const anyChecked = Array.from(getProductCheckboxes()).some(
        (cb) => cb.checked
      );
      if (anyChecked) {
        deleteBtn.removeAttribute("disabled");
      } else {
        deleteBtn.setAttribute("disabled", "disabled");
      }
    }

    // При изменении "Выбрать все"
    checkAll.addEventListener("change", function () {
      const checked = this.checked;
      getProductCheckboxes().forEach((cb) => {
        cb.checked = checked;
      });
      updateDeleteBtnState();
    });

    // При изменении любого чекбокса товара
    getProductCheckboxes().forEach((cb) => {
      cb.addEventListener("change", function () {
        if (!this.checked) {
          checkAll.checked = false;
        } else {
          const allChecked = Array.from(getProductCheckboxes()).every(
            (cb) => cb.checked
          );
          checkAll.checked = allChecked;
        }
        updateDeleteBtnState();
      });
    });

    // При загрузке страницы сразу обновить состояние кнопки
    updateDeleteBtnState();
  }

  //аккордеон доп услуги в посылке
  document.querySelectorAll(".additional-services").forEach((section) => {
    const title = section.querySelector(".additional-services__title");
    if (title) {
      const content = section.querySelector(".additional-services__content");

      title.addEventListener("click", function () {
        // Переключаем видимость контента
        content.classList.toggle("active");
        this.classList.toggle("open");
      });
    }
  });

  
  // фиксированный блок в посылке
  function handleStickyFooter() {
    const fixedBlock = document.querySelector(".new-parcel__fixed");
    const cartMain = document.querySelector(".cart__main");
    if (!fixedBlock || !cartMain) return;

    const cartMainRect = cartMain.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Если нижняя граница cart__main ниже футера (fixedBlock), то фиксируем
    if (cartMainRect.bottom > windowHeight - 63) {
      fixedBlock.classList.add("fixed");
    } else {
      fixedBlock.classList.remove("fixed");
    }
  }

  window.addEventListener("scroll", handleStickyFooter);
  window.addEventListener("resize", handleStickyFooter);
  handleStickyFooter();

  const shipping2 = document.getElementById("shipping2");
  const shippingDetails = document.querySelector("#shipping-details");

  document.querySelectorAll('input[name="shipping"]').forEach((radio) => {
    radio.addEventListener("change", function () {
      if (shipping2.checked) {
        shippingDetails.style.display = "flex";
      } else {
        shippingDetails.style.display = "none";
      }
    });
  });

//псевдоселект в форме саппорта
  document.querySelectorAll('.support-ticket__select').forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    const menu = dropdown.querySelector('.dropdown-menu');
    const items = menu.querySelectorAll('.dropdown-menu__item');
    const input = dropdown.querySelector('input[type="hidden"]');
    const text = toggle.querySelector('span');
  
    items.forEach(item => {
      item.addEventListener('click', function() {
        // Меняем текст на выбранный
        text.textContent = this.textContent;
  
        // Записываем value в скрытый input
        input.value = this.getAttribute('data-value');
  
        // Класс active только у выбранного пункта
        items.forEach(i => i.classList.remove('current'));
        this.classList.add('current');
  
        // (опционально) Закрываем дропдаун, если требуется
        menu.classList.remove('active');
        toggle.classList.remove('active');
      });
    });
  });

//множественная загрузка картинок
  const fileInput = document.getElementById('file-upload');
  const fileBtn = document.querySelector('.file-upload-btn');
  const fileList = document.querySelector('.file-upload-list');
  let filesArr = [];
  if (fileInput) {
  fileBtn.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', function() {
    const newFiles = Array.from(this.files);
    // Проверка на количество файлов
    if (filesArr.length + newFiles.length > 10) {
      alert('Можно выбрать не более 10 файлов!');
      return;
    }
    newFiles.forEach(file => {
      // Проверка типа и размера
      if (!file.type.startsWith('image/')) {
        alert('Можно загружать только изображения!');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        alert('Размер файла не должен превышать 10 МБ!');
        return;
      }
      filesArr.push(file);
    });
    renderFiles();
    this.value = ''; // сбрасываем input, чтобы можно было выбрать тот же файл снова
  });
  
  function renderFiles() {
    fileList.innerHTML = '';
    filesArr.forEach((file, idx) => {
      const reader = new FileReader();
      reader.onload = function(e) {
        const thumb = document.createElement('div');
        thumb.className = 'file-upload-thumb';
        thumb.innerHTML = `
          <img src="${e.target.result}" alt="">
          <button type="button" class="file-upload-remove" data-idx="${idx}">&times;</button>
        `;
        fileList.appendChild(thumb);
      };
      reader.readAsDataURL(file);
    });
  }
  // Удаление файла
  fileList.addEventListener('click', function(e) {
    if (e.target.classList.contains('file-upload-remove')) {
      const idx = +e.target.getAttribute('data-idx');
      filesArr.splice(idx, 1);
      renderFiles();
    }
  });
  }






    const filterButtons = document.querySelectorAll('.guide__filter');
    const sections = document.querySelectorAll('.guide__section');
  if (filterButtons) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', function () {
        // Убираем active у всех кнопок
        filterButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
  
        const filter = this.getAttribute('data-filter');
  
        sections.forEach(section => {
          if (filter === 'all' || section.getAttribute('data-section') === filter) {
            section.style.display = '';
          } else {
            section.style.display = 'none';
          }
        });
      });
    });


  }



    document.querySelectorAll('.account-table__order').forEach(order => {
      order.addEventListener('click', function (e) {
        const track = order.querySelector('span');
        if (track) {
          // Копируем текст трек-номера
          navigator.clipboard.writeText(track.textContent.trim()).then(() => {
            // Можно добавить визуальный отклик, например, всплывающую подсказку
            this.classList.add('copied');
            setTimeout(() => this.classList.remove('copied'), 1000);
            console.log(1);
          });
        }
      });
    });




});

// Swiper sliders initialization
if (document.querySelector(".mainSwiper")) {
  let swiper = new Swiper(".mainSwiper", {
    allowTouchMove: true,
    simulateTouch: true,
    slidesPerView: 1,
    effect: "fade",
    loop: true,
    navigation: {
      nextEl: ".mainSwiper-next",
      prevEl: ".mainSwiper-prev",
    },
    pagination: {
      el: ".mainSwiper-pagination",
      clickable: true,
    },
    mousewheel: false,
    keyboard: true,
  });
}
if (document.querySelector(".brandSwiper")) {
  let swiper2 = new Swiper(".brandSwiper", {
    slidesPerView: 2.15,
    spaceBetween: 16,
    slidesPerGroup: 2,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    keyboard: true,
    breakpoints: {
      640: {
        slidesPerView: 2.15,
        spaceBetween: 16,
        slidesPerGroup: 1,
      },
      768: {
        slidesPerView: 4.15,
        spaceBetween: 16,
        slidesPerGroup: 2,
      },
      1280: {
        slidesPerView: 6.15,
        spaceBetween: 16,
        slidesPerGroup: 3,
      },
    },
  });
}
if (document.querySelector(".brandSwiper2")) {
  let swiperB = new Swiper(".brandSwiper2", {
    slidesPerView: 2.7,
    spaceBetween: 16,

    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    keyboard: true,
    breakpoints: {
      640: {
        slidesPerView: 2.7,
        spaceBetween: 16,
      },
      768: {
        slidesPerView: 5.9,
        spaceBetween: 16,
      },
      1200: {
        slidesPerView: 8,
        spaceBetween: 16,
      },
    },
  });
}

if (document.querySelector(".stepsSwiper")) {
  let swiper3 = new Swiper(".stepsSwiper", {
    slidesPerView: 1.05,
    spaceBetween: 8,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      640: {
        enabled: true,
        slidesPerView: 2.05,
        spaceBetween: 16,
      },
      768: {
        enabled: true,
        slidesPerView: 2.05,
        spaceBetween: 16,
      },
      769: {
        enabled: false,
      },
    },
  });
}
if (document.querySelector(".productsSwiper")) {
  let swiper4 = new Swiper(".productsSwiper", {
    slidesPerView: 2.15,
    spaceBetween: 8,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    mousewheel: false,
    keyboard: true,
    breakpoints: {
      640: {
        slidesPerView: 2.15,
        spaceBetween: 8,
      },
      768: {
        slidesPerView: 3.15,
        spaceBetween: 16,
      },
      991: {
        slidesPerView: 4.15,
        spaceBetween: 16,
      },
      1100: {
        slidesPerView: 5.15,
        spaceBetween: 16,
      },
      1280: {
        slidesPerView: 6.15,
        spaceBetween: 16,
      },
    },
  });
}
if (document.querySelector(".benefitsSlider")) {
  let swiper5 = new Swiper(".benefitsSlider", {
    slidesPerView: 1,
    spaceBetween: 0,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      640: {
        enabled: true,
        slidesPerView: 1,
        spaceBetween: 0,
      },
      768: {
        enabled: true,
        slidesPerView: 2,
        spaceBetween: 24,
      },
      769: {
        enabled: false,
        slidesPerView: 4,
        spaceBetween: 48,
      },
    },
  });
}
if (document.querySelector(".productGallery2")) {
  let swiperG = new Swiper(".productGallery", {
    direction: "vertical",
    spaceBetween: 4,
    slidesPerView: 8,
    watchSlidesProgress: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    height: 600,
  });
  let swiperG2 = new Swiper(".productGallery2", {
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    thumbs: {
      swiper: swiperG,
    },
  });
}

// PhotoSwipe (для лайтбокса) инициализируется в HTML через ES6 модули
// Функция для автоматического определения размеров изображений
function addPhotoSwipeAttributes() {
  // Выбираем все ссылки внутри productGallery2 и support-chat__message-attachments
  const galleryLinks = document.querySelectorAll(
    ".productGallery2 a[href], .support-chat__message-attachments a[href]"
  );

  galleryLinks.forEach((link) => {
    // Если уже есть размеры — не пересчитываем
    if (link.hasAttribute("data-pswp-width") && link.hasAttribute("data-pswp-height")) return;

    const img = new Image();
    img.onload = function () {
      link.setAttribute("data-pswp-width", this.naturalWidth);
      link.setAttribute("data-pswp-height", this.naturalHeight);
    };
    img.src = link.getAttribute("href");
  });
}

// Запускаем после загрузки DOM
document.addEventListener("DOMContentLoaded", function () {
  addPhotoSwipeAttributes();
});

//фиксированный фильтр в категории
function stickyFilterInit() {
  const filter = document.querySelector(".category__filter");
  const content = document.querySelector(".category__content");
  const header = document.querySelector(".header");

  if (!filter || !content || !header) return;
  if (content.offsetHeight < filter.offsetHeight) {
    content.style.minHeight = `${filter.offsetHeight + 100}px`; // немного с запасом
    console.log("min");
  }
  function updatePosition() {
    const scrollY = window.scrollY;
    const contentTop = content.offsetTop;
    const contentHeight = content.offsetHeight;
    const filterHeight = filter.offsetHeight;
    const headerHeight = header.offsetHeight;

    // если фильтр выше контента — отменяем
    if (filterHeight >= contentHeight) {
      filter.style.position = "";
      filter.style.top = "";
      filter.style.zIndex = "";
      filter.classList.remove("fix");
      return;
    }

    const minTop = contentTop - headerHeight;
    const maxTop = contentTop + contentHeight - filterHeight;

    if (scrollY + headerHeight > minTop && scrollY + headerHeight < maxTop) {
      filter.style.position = "fixed";
      filter.style.top = `${headerHeight + 20}px`;
      filter.style.zIndex = "100";
      filter.classList.add("fix");
    } else if (scrollY + headerHeight >= maxTop) {
      filter.style.position = "absolute";
      filter.style.top = `${contentHeight - filterHeight}px`;
      filter.style.zIndex = "";
      filter.classList.remove("fix");
    } else {
      filter.style.position = "";
      filter.style.top = "";
      filter.style.zIndex = "";
      filter.classList.remove("fix");
    }
  }
  function enable() {
    window.addEventListener("scroll", updatePosition);
    window.addEventListener("resize", updatePosition);
    updatePosition(); // запустить сразу
  }
  function disable() {
    window.removeEventListener("scroll", updatePosition);
    window.removeEventListener("resize", updatePosition);
    filter.style.position = "";
    filter.style.top = "";
    filter.style.zIndex = "";
    filter.classList.remove("fix");
  }

  // Отслеживание ширины экрана
  const mediaQuery = window.matchMedia("(min-width: 1024px)");
  function handleMediaChange(e) {
    if (e.matches) {
      enable();
    } else {
      disable();
    }
  }
  mediaQuery.addEventListener("change", handleMediaChange);
  handleMediaChange(mediaQuery); // запуск при загрузке
}
document.addEventListener("DOMContentLoaded", stickyFilterInit);

//аккордеон в футере
function initFooterAccordion() {
  const titles = document.querySelectorAll(".footer__col-title");
  const mediaQuery = window.matchMedia("(max-width: 991px)");
  function toggleAccordion(e) {
    const title = e.currentTarget;
    title.classList.toggle("active");
    const content = title.nextElementSibling;
    if (content && content.classList.contains("footer-accordion")) {
      content.style.display = title.classList.contains("active")
        ? "flex"
        : "none";
    }
  }
  function enable() {
    titles.forEach((title) => {
      title.addEventListener("click", toggleAccordion);
      // Сбросить состояние (на всякий случай)
      const content = title.nextElementSibling;
      if (content && content.classList.contains("footer-accordion")) {
        content.style.display = title.classList.contains("active")
          ? "flex"
          : "none";
      }
    });
  }
  function disable() {
    titles.forEach((title) => {
      title.removeEventListener("click", toggleAccordion);
      title.classList.remove("active");
      const content = title.nextElementSibling;
      if (content && content.classList.contains("footer-accordion")) {
        content.style.display = "flex"; // возвращаем обычное поведение
      }
    });
  }
  function handleChange(e) {
    if (e.matches) {
      enable();
    } else {
      disable();
    }
  }
  mediaQuery.addEventListener("change", handleChange);
  handleChange(mediaQuery);
}
document.addEventListener("DOMContentLoaded", initFooterAccordion);

// модалка с выбором категорий в шапке (нельзя использовать универсальный скрипт из-за другого оверлея)
function initCategoryModal() {
  const selectCategoryBtn = document.querySelector(".js-select-category");
  const categoryModal = document.querySelector(".select-cats-modal");
  const overlay = document.querySelector(".modal-header-overlay");
  const closeButton = document.querySelector(
    ".select-cats-modal__header-close"
  );
  const categoryTitle = document.querySelector(".select-category__title");
  const categoryItems = document.querySelectorAll(".select-cats-modal__item");
  const categorySvg = selectCategoryBtn?.querySelector("svg use");

  if (!selectCategoryBtn || !categoryModal || !overlay || !categoryTitle)
    return;

  function openModal() {
    categoryModal.classList.add("active");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    categoryModal.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  function changeSvg(isSelected) {
    categorySvg.setAttribute(
      "href",
      isSelected ? "/sprite.svg#close" : "/sprite.svg#shevron-down"
    );
  }

  function resetCategory() {
    selectCategoryBtn.classList.remove("selected");
    categoryTitle.textContent = "Все категории";
    changeSvg(false);
  }

  function selectCategory(item) {
    const text = item.querySelector("span")?.textContent;
    if (text) {
      categoryTitle.textContent = text;
      selectCategoryBtn.classList.add("selected");
      changeSvg(true);
    }
    closeModal();
  }

  // Открытие
  selectCategoryBtn.addEventListener("click", function (e) {
    e.preventDefault();
    openModal();
  });

  // Закрытие по overlay, кнопке, Esc
  overlay.addEventListener("click", closeModal);
  closeButton?.addEventListener("click", closeModal);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && categoryModal.classList.contains("active")) {
      closeModal();
    }
  });

  // Выбор
  categoryItems.forEach((item) => {
    item.addEventListener("click", () => selectCategory(item));
  });

  // Сброс
  categorySvg.parentElement.addEventListener("click", function (e) {
    if (selectCategoryBtn.classList.contains("selected")) {
      e.preventDefault();
      e.stopPropagation();
      resetCategory();
    }
  });
}
document.addEventListener("DOMContentLoaded", initCategoryModal);
