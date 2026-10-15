#!/usr/bin/env bash
# Скрипт быстрого запуска сайта в браузере по умолчанию на macOS
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
if command -v xdg-open >/dev/null 2>&1; then
  xdg-open "${DIR}/index.html"
elif command -v open >/dev/null 2>&1; then
  open "${DIR}/index.html"
else
  echo "Откройте файл вручную: file://${DIR}/index.html"
fi
echo "Сайт «Красный Звонок: Образование в СССР» открыт!"
