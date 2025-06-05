# Устранение проблем с Format on Save

## Что настроено

✅ **Prettier установлен** в корне проекта  
✅ **Конфигурация .prettierrc** создана  
✅ **VS Code настройки** настроены в `.vscode/settings.json`  
✅ **Workspace файл** `psre.code-workspace` создан  
✅ **Prettier ignore** файл настроен

## Если Format on Save не работает

### 1. Проверьте расширения VS Code

Убедитесь, что установлены обязательные расширения:

- ✅ **Prettier - Code formatter** (`esbenp.prettier-vscode`)
- ✅ **Vue Language Features (Volar)** (`Vue.volar`)

### 2. Откройте проект через Workspace

**Важно!** Откройте проект через файл `psre.code-workspace`:

1. File → Open Workspace from File
2. Выберите `psre.code-workspace`
3. Или просто откройте файл и нажмите "Open Workspace"

### 3. Проверьте настройки VS Code

Откройте Command Palette (`Cmd/Ctrl + Shift + P`) и выполните:

```
> Preferences: Open Workspace Settings (JSON)
```

Убедитесь, что есть:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

### 4. Проверьте, что Prettier видит конфигурацию

В терминале:

```bash
cd /Users/work/projects/psre
bunx prettier --find-config-path apps/vue-app/src/components/GraphQLExample.vue
```

Должен вернуть путь к `.prettierrc`

### 5. Принудительное форматирование

В файле нажмите:

- **macOS**: `Shift + Option + F`
- **Windows/Linux**: `Shift + Alt + F`

Или через Command Palette:

```
> Format Document
```

### 6. Сброс настроек расширения

1. Command Palette → `> Developer: Reload Window`
2. Если не помогает:
   ```
   > Prettier: Restart Prettier Server
   ```

### 7. Проверьте статус Prettier

В нижней панели VS Code должен быть индикатор Prettier.
При открытии `.vue` файла там должно быть "Prettier".

### 8. Проверьте вывод ошибок

1. View → Output
2. Выберите "Prettier" в выпадающем списке
3. Посмотрите на ошибки

## Альтернативное решение

Если ничего не работает, можно использовать ручное форматирование:

```bash
# Форматировать конкретный файл
bunx prettier --write src/components/GraphQLExample.vue

# Форматировать всю папку src
bunx prettier --write "src/**/*.{vue,ts,js,json}"

# Добавить в package.json scripts
"format": "prettier --write \"src/**/*.{vue,ts,js,json}\""
```

## Проверка работоспособности

1. Откройте `apps/vue-app/src/components/GraphQLExample.vue`
2. Добавьте лишние пробелы в коде
3. Сохраните файл (`Cmd/Ctrl + S`)
4. Код должен автоматически отформатироваться

## Контакты

Если проблема не решается, проверьте:

- VS Code перезапущен?
- Workspace открыт корректно?
- Расширения установлены и активны?
- Нет конфликтующих настроек в глобальных настройках VS Code?
