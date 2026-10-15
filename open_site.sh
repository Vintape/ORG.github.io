#!/usr/bin/env bash
# Скрипт быстрого запуска сайта в браузере по умолчанию на macOS
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
open "${DIR}/index.html"
echo "Сайт «Красный Звонок: Образование в СССР» открыт в вашем браузере!"
