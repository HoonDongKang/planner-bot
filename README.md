# 🤖 Planer Bot

## 🖐️ Introduction

> [조코딩X유데미X원티드가 함께하는 2023 AI 해커톤 🏆](https://udemy.wjtb.co.kr/event/id/179)
>
> Proeject Period : 23.07.31 ~ 23.08.05

Planner Bot : https://www.planbot.click/

Backend Server : https://api.planbot.click/

API Doc (Swagger) : https://api.planbot.click/api

## 📒 About the Project

When you submit the destination and duration of your trip, ChatGPT will provide daily planned recommendations for the destination, which will be provided through Google Maps.

> 1. Receive a customized itinerary by providing your travel destination and duration

![gernerate](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaHUwN2g4aG9yMnpjcHk4MzAwam0zbjAyYjZwMmp2NXMxeGd2cmp4eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/DHbxE5wmMC1YYIaJjH/giphy.gif)

> 2.  Adjusting trip duration by adding requirement

![changeDate](https://media.giphy.com/media/q7aSDguG29MS2oNOF9/giphy.gif)

> 3.  Requesting additional recommendations by adding requirement

![chageReq](https://media.giphy.com/media/tekjutV4s7ykbMm1S3/giphy.gif)

> 4.  This service can be used up to five times.

![12](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGdydGxpeGJsaDlmczBuZ2JtMnB4d3JudTdzejdqc3l3cmgwd25rcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/x3cuuzAzMEYlbkAa7P/giphy.gif)

## ⚙️ Built with

| Tech Stack                                                                                                     |              Description              |
| -------------------------------------------------------------------------------------------------------------- | :-----------------------------------: |
| <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"> |             Main language             |
| <img src="https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white">  |           Node.js framework           |
| <img src="https://img.shields.io/badge/chatGPT-74aa9c?style=for-the-badge&logo=openai&logoColor=white">        |       Using Chat Completion API       |
| <img src="https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white"> | EC2 for server & Route 53 for domains |

## 🔎 Getting Started

### Environment Variables

```
/.env
CHAT_GPT_API_KEY={YOUR_API_KEY}
CHAT_GPT_ORGANIZATION_ID={YOUR_ID}
CHAT_GPT_MODEL={GPT_MODEL}
CHAT_GPT_SYSTEM={YOUR_INSTRUCTION}
CHAT_GPT_USER={YOUR_REQUEST}
```

### Installation

1. Clone the repo

```
git clone https://github.com/HoonDongKang/planner-bot.git
```

2. Install NPM packages

```
npm install
```

3. Creaet `.env` file with the variables
4. Start the project server

```
npm run start
```

## ✋ With

Front-End Developer : [CLOUDoort](https://github.com/CLOUDoort/Plannerbot-Frontend)
