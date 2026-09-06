<div align="center">

# Bedgar

**Beginners Discord Auto Role**

A beginner-friendly Discord bot that automatically assigns roles to members using **discord.js**, **Bun**, and **MongoDB**.

**Made with by Francis Enrico Ramos ♥️**

**📅 Published on September 6, 2026**
</div>

---

## About

**Bedgar** is a beginner-friendly Discord bot built with **discord.js** and **Bun**.

The primary purpose of Bedgar is to demonstrate how to create a Discord bot that can **automatically assign roles to users**, while also introducing a simple and organized project structure for beginners.

The bot uses **MongoDB** to persist server-related data, allowing configurations and other stored information to remain available even after the bot restarts.

Bedgar also uses **fast-glob** to automatically search for and discover files within the project, making it easier to organize commands, events, or other bot modules without manually importing every file.

---

## Tech Stack

| Technology     | Purpose                                                          |
| -------------- | ---------------------------------------------------------------- |
| **Bun**        | JavaScript runtime, package manager, and development environment |
| **Node.js**    | JavaScript runtime compatibility                                 |
| **discord.js** | Discord API library                                              |
| **MongoDB**    | Database for persistent bot data                                 |
| **fast-glob**  | File discovery and automatic module loading                      |

---

## Features

* Automatically assigns roles to new members
* Discord bot powered by **discord.js**
* Uses **MongoDB** for persistent data storage
* Automatic file discovery with **fast-glob**
* Runs with **Bun**
* Beginner-friendly project structure
* Modular and easy-to-expand architecture

---

## Getting Started

### Prerequisites

Before running Bedgar, make sure you have:

* [Bun](https://bun.sh/) installed
* A Discord application and bot
* A MongoDB database
* The required Discord bot permissions

---

### 1. Clone the repository

```bash
git clone https://github.com/francis-ramos/bedgar.git
cd bedgar
```

### 2. Install dependencies

Using Bun:

```bash
bun install
```

### 3. Configure environment variables

Goto `global.json` file in the root directory:

```env
{
      "uri": "",
      "token": ""
}
```

Replace the placeholder values with your actual Discord bot token and MongoDB connection string.

> **Important:** Never commit your `.env` file or expose your Discord bot token publicly.

### 4. Start the bot

```bash
bun run dev
```

Or, depending on the scripts configured in the project:

```bash
bun run start
```

---

## How It Works

At a basic level, Bedgar follows this flow:

```text
Discord Server
      │
      ▼
  New Member
      │
      ▼
  discord.js
      │
      ▼
Check Server Configuration
      │
      ├── Configuration Found
      │          │
      │          ▼
      │      Assign Role
      │
      └── No Configuration
                 │
                 ▼
            Do Nothing
```

Server configuration and other persistent information can be stored in **MongoDB**, while `fast-glob` helps the application discover the files used by the bot's modular architecture.

---

## Project Structure

A typical Bedgar project may be organized similarly to:

```text
bedgar/
├── src/
│   ├── commands/
│   ├── events/
│   ├── handlers/
│   └── ...
├── .env
├── package.json
├── bun.lock
└── README.md
```

The exact structure may change as the project develops.

---

## Why Bedgar?

Bedgar was created with **beginners in mind**.

Discord bots can initially feel complicated because they involve several concepts at once: APIs, events, commands, permissions, databases, and asynchronous JavaScript.

This project aims to provide a relatively simple starting point for learning how these pieces fit together.

Through Bedgar, you can explore:

* Discord bot development
* `discord.js`
* Discord events
* Role management
* MongoDB integration
* Database persistence
* Environment variables
* File-based module discovery
* `fast-glob`
* Bun
* Asynchronous JavaScript
* Modular application architecture

---

## Development

You can use Bun's development workflow while working on the project:

```bash
bun run dev
```

When adding new functionality, keeping commands, events, and other modules separated can make the project easier to maintain and understand.

---

## Security

Never expose sensitive credentials such as:

```text
uri
token
```

Make sure `global.json` is included in your `.gitignore`:

```gitignore
global.json
```

If your Discord bot token is accidentally exposed, **regenerate it immediately through the Discord Developer Portal**.

---

## Disclaimer

Bedgar is primarily an **educational project** intended to help beginners learn Discord bot development.

The project may not include all of the security, validation, error handling, and scalability considerations required for a production application.

Use it as a learning foundation and modify it according to your own requirements.

---

## License

This project is available for learning and experimentation.

---

<div align="center">

**Bedgar — Beginners Discord Auto Role**

**Made with ♥️ by Francis Enrico Ramos**

</div>
