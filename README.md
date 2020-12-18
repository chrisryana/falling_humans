# 3D  Иллюстрация Falling Humans

## Как посмотреть

Для запуска скачать репозиторий и открыть `index.html` в браузере.

Посмотреть в живую и подергать иллюстрацию туда-сюда можно открыв данный проект в glitch по ссылке <https://glitch.com/~falling-humans>. На glitch я размещаю свои любимые проекты.

## Важно! По умолчанию в Safari отключена реакция на гироскоп
Для корректной работы необходимо зайти в Настройки – Safari и включить "Движение и ориентацию".
![Настройки](https://raw.githubusercontent.com/christofer1501/falling_humans/f5845e3f834766a7f42d94e300ecc5d4c92279c9/settings.gif)

## Структура проекта

- **`index.html`** – разметка страницы, включающая в себя `div` контейнер и `canvas`.
- **`main.css`** – стили для контейнера и `canvas`.
- **`main.js`** – логика для работы с `canvas` и иллюстрацией.
- **`tween.js`** – небольшой кусок кода скопированный из библиотеки `tween.js`. Благодаря ему, когда ты отпускаешь иллюстрацию курсором, она плавно возвращается в исходное положение.
- **`img`** – папка со слоями иллюстрации

## Примеры работы параллакса:
![Дэсктопная версия](https://raw.githubusercontent.com/christofer1501/falling_humans/f5845e3f834766a7f42d94e300ecc5d4c92279c9/desktop.gif)
![Мобильная версия](https://raw.githubusercontent.com/christofer1501/falling_humans/f5845e3f834766a7f42d94e300ecc5d4c92279c9/mobile.gif)

>Этот маленький эксперимент сделан благодаря [курсу иллюстратора Jarom Vogel](https://www.skillshare.com/classes/Art-Code-Create-and-Code-an-Interactive-Parallax-Illustration/1862124549?via=user-profile) и его вдохновляющему твиттеру
