# Катя — твоё время

Залей **содержимое этой папки** в корень GitHub-репозитория (не саму папку `github-upload` целиком как подпапку).

## GitHub Pages

1. Создай репозиторий (латиница в названии, например `katya-time`).
2. Загрузи все файлы из этой папки в **корень** репозитория.
3. Settings → Pages → Deploy from a branch → `main` → `/ (root)` → Save.
4. Сайт: `https://<username>.github.io/<repo>/`

В корне обязательно должны быть `index.html` и файл `.nojekyll`.

## Проверка

После публикации открой:
- `https://<username>.github.io/<repo>/`
- `https://<username>.github.io/<repo>/moments.html`

Если открывается 404 — файлы лежат не в корне, а во вложенной папке. Перенеси `index.html` на верхний уровень.
