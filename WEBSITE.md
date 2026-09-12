# Сайт ZVERCAST ЗАКОНКИ

Статический HTML/CSS/JS, без backend, токенов, аналитики и сторонних запросов в браузере.
Целевой адрес: https://zvercast.github.io/ZverCast-Zakonka/
Репозиторий: https://github.com/ZverCast/ZverCast-Zakonka

## Файлы

- `src/` — редактируемая HTML-страница, CSS, JS.
- `docs/` — только публичный результат для GitHub Pages.
- `website-input/` — ТЗ, референс, оригинальные изображения; не публиковать.
- `asset-manifest.json` — соответствие оригиналов, SHA-256 и координаты обрезки.
- `release-data.json` — последний проверенный выпуск приложения и данные Тверского.
- `qa/` — реальные screenshots шести размеров и JSON-отчёт.
- `publish-repo/` — отдельный checkout только репозитория распространения.

## Локальная сборка и просмотр (Windows 11)

Из этой папки:

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install Pillow==12.3.0 playwright==1.62.0
.\.venv\Scripts\python.exe tools\prepare_assets.py
.\.venv\Scripts\python.exe tools\build.py
.\.venv\Scripts\python.exe -m http.server 8080 --bind 127.0.0.1 --directory docs
```

Открыть http://127.0.0.1:8080 . Для QA:

```powershell
.\.venv\Scripts\python.exe -m playwright install chromium
.\.venv\Scripts\python.exe tools\qa.py
```

QA сам выбирает свободный localhost-порт и завершает свой сервер. Для текущих
изображений используются Windows-шрифты Segoe UI только при генерации OG; сайт
использует системный шрифт и не скачивает шрифты извне.

## Как заменить изображения

Добавить новый оригинал в `website-input/originals`, проверить содержимое и при
необходимости изменить координаты в `tools/prepare_assets.py`. Не ретушировать UI.
Пересобрать ассеты и HTML, прогнать QA. При изменении разрешения обновить `width`,
`height` и `srcset` в HTML. Оригиналы сохраняются, производные создаются отдельно.
Опциональный `search-100-1.png` отсутствует и не используется. Остальные оригиналы
получены из архива и приложенных к задаче файлов.

## Обновление версии

Не использовать GitHub `/latest`: отдельный выпуск может содержать законку.
Скрипт выбирает максимальную обычную версию `app-stable-vX.Y.Z`, проверяет app ID,
платформу, Ed25519-подпись metadata и доступность установщика.
В нём есть только открытый ключ; приватный не нужен.

```powershell
..\RussiaOnlineLegalAssistant\.venv\Scripts\python.exe tools\refresh_release.py
.\.venv\Scripts\python.exe tools\build.py
.\.venv\Scripts\python.exe tools\qa.py
```

На другой машине установить `cryptography==50.0.1` в окружение сайта и использовать
его Python. При сетевой ошибке `release-data.json` не перезаписывается. Сначала
публикуйте полный релиз приложения, затем обновляйте данные и HTML сайта.
Версия программы не меняет дату сверки законов: дата взята из manifest Тверского,
`2026-09-05`, 30 документов, редакция `1.0.0` (встроенное обозначение `1`).

## Безопасная публикация

Аудит: в distribution-репозитории был только README, Pages/workflows отсутствовали.
Updater использует GitHub Releases (`release.json`, `release.sig`, `releases.stable.json`),
каталог редакций — отдельный Release (`catalog.json`, `catalog.sig`). Они не в `docs`.
Сайт `RussiaOnline-Laws` и другие репозитории не изменяются.

Добавлять в репозиторий только `docs/` и эту инструкцию под именем `WEBSITE.md`.
Не копировать `.venv`, оригиналы, архив, промт, папку приложения, тесты или ключи.
Не удалять другие пути, не применять `git add .` к общей рабочей папке.
Для первого включения Pages: Settings → Pages → Deploy from a branch → main → /docs.
Отдельный workflow не требуется. Если Pages уже включён иначе, сначала согласовать
изменение источника; не создавать конкурирующий deploy.

После изменения `docs/`: `git add docs WEBSITE.md`, commit и push в отдельном checkout.
Проверить завершение Pages build, URL сайта, прямой установщик и служебные assets
обоих типов релизов. Данные обновлений и их подписи сайт никогда не перезаписывает.

## Проверки

360/390/768/1024/1440/1920 px, меню, вкладки стрелками/Home/End, FAQ, Escape и возврат
фокуса в lightbox, отсутствие горизонтального скролла, загруженные изображения,
обычная HTML-ссылка скачивания при отключённом JS. Для скриншотов указаны реальные
размеры, hero не lazy-load. Без JS все три режима доступны, ссылки изображений открываются напрямую.
Установщик 0.11.2: 61 917 674 байта, анонимный HEAD — 200. Portable не распространяется.
Текущие версия, размер и ссылка берутся из `release-data.json` при сборке HTML.
