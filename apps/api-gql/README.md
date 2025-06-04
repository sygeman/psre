# PSRE GraphQL API

GraphQL API сервер на NestJS для PSRE монорепозитория.

## 🚀 Быстрый старт

### Разработка

```bash
# Из корня монорепозитория
bun run dev --filter=@psre/api-gql

# Или из папки приложения
cd apps/api-gql
bun run dev
```

### Сборка

```bash
bun run build --filter=@psre/api-gql
```

### Продакшн

```bash
bun run start:prod --filter=@psre/api-gql
```

## 📡 Доступ к API

- **GraphQL Playground**: http://localhost:5000/graphql
- **GraphQL Endpoint**: http://localhost:5000/graphql

## 🛠 Технологии

- [NestJS](https://nestjs.com/) - Node.js фреймворк
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/) - GraphQL сервер
- [GraphQL](https://graphql.org/) - язык запросов для API
- [TypeScript](https://www.typescriptlang.org/) - типизация

## 📝 Доступные команды

```bash
bun run dev          # Запуск в режиме разработки
bun run build        # Сборка приложения
bun run start        # Запуск собранного приложения
bun run start:prod   # Запуск в продакшн режиме
bun run test         # Запуск тестов
bun run test:e2e     # Запуск e2e тестов
bun run lint         # Проверка кода линтером
bun run lint:fix     # Исправление ошибок линтера
bun run format       # Форматирование кода
```

## 🎯 Примеры запросов

### Базовый запрос

```graphql
query {
  getHello
}
```

Ответ:

```json
{
  "data": {
    "getHello": "Hello from GraphQL API!"
  }
}
```

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ bun install
```

## Compile and run the project

```bash
# development
$ bun run start

# watch mode
$ bun run start:dev

# production mode
$ bun run start:prod
```

## Run tests

```bash
# unit tests
$ bun run test

# e2e tests
$ bun run test:e2e

# test coverage
$ bun run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ bun install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
