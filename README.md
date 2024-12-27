# npmfix

<p align="center">
  <a href="https://github.com/lucasmeira/npmfix/actions/workflows/main.yml">
    <img src="https://github.com/lucasmeira/npmfix/actions/workflows/main.yml/badge.svg" alt="Build Status">
  </a>
  <a href="https://github.com/lucasmeira/npmfix/actions/workflows/publish.yml">
    <img src="https://github.com/lucasmeira/npmfix/actions/workflows/publish.yml/badge.svg" alt="CD Pipeline">
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/npm/l/npmfix" alt="License MIT">
  </a>
</p>

We welcome contributions to npmfix! Whether you want to report a bug, suggest a feature, improve the documentation, or contribute code, your help is highly appreciated.

This project was created to simplify cleaning and reinstalling dependencies for entire projects with minimal commands, eliminating the need to monitor and check progress constantly. It is designed to be useful for experienced professionals (seniors/specialists) seeking efficiency and for juniors aiming to streamline their workflow and clarify concepts.

<!--
<p align="center">
  <img src="docs/execution.png" alt="npmfix execution screenshot">
</p>
-->

## Features

- **Log Management**: All logs are stored in the `/log` directory, with the path printed at the start of `npmfix`.
- **Configurable Log Retention**: Logs have a maximum age of 7 days by default, which can be changed in `src/config.json`.
- **Powerful Commands**: Manage project dependencies, clean up directories, and automate builds with a single tool.

# Installation

```bash
$ npm i -g @lucasmeira/npmfix
# Unix users may need to run the command with sudo. Go carefully
```

> npmfix does not support node<v20.

# Usage

```bash
$ npmfix
# it is installed globally
```

npmfix executes the default sequence of clean, reinstall, and build processes seamlessly. Need help? Use -h or --help to explore available options.

## Getting Started Locally

1. Clone the repository:
    ```bash
    git clone https://github.com/lucasmeira/npmfix.git
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Make the CLI executable:
    ```bash
    chmod +x dist/index.js
    ```
4. Link the CLI tool globally:
    ```bash
    npm link
    ```
5. Run the project locally:
    ```bash
    npmfix
    ```

## How to Contribute

### Reporting Issues

1. Check the [issues page](https://github.com/lucasmeira/npmfix/issues) to see if your issue has already been reported.
2. Create a new issue with a descriptive title and detailed explanation.
3. Include steps to reproduce the issue and relevant logs or screenshots if applicable.

### Suggesting Features

1. Open a feature request issue and describe the feature in detail.
2. Include use cases and benefits for the feature.

### Submitting Code Changes

1. Fork the repository and create a new branch for your changes:
    ```bash
    git checkout -b feature/your-feature-name
    ```
2. Make your changes and commit them with clear, concise commit messages.
3. Push your branch to your fork:
    ```bash
    git push origin feature/your-feature-name
    ```
4. Submit a pull request to the `main` branch of the repository.
5. Ensure your PR includes:
    - A clear description of your changes.
    - Reference to related issues if applicable.

### Code Standards

- Follow the project's coding conventions.
- Write clear and concise code with appropriate comments.
- Include tests for any new functionality.

### Improving Documentation

- Check for typos, unclear explanations, or missing sections.
- Submit pull requests with your improvements.

## Getting Started

1. Clone the repository:
    ```bash
    git clone https://github.com/lucasmeira/npmfix.git
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Run the project locally:
    ```bash
    npm start
    ```

## Commands

| Command            | Description                                                          |
| ------------------ | -------------------------------------------------------------------- |
| `npmfix`           | Executes the default sequence: clean, reinstall, and build processes |
| `npmfix clean`     | Clean project dependencies                                           |
| `npmfix reinstall` | Reinstall project dependencies                                       |
| `npmfix build`     | Build the project                                                    |
| `npmfix [options]` | Show usage information                                               |

### Options

| Option              | Description                          |
| ------------------- | ------------------------------------ |
| `--version`         | Show version number                  |
| `-m, --maxFiles`    | Set maximum file limit (default: 7d) |
| `-e, --run, --exec` | Execute a specified command          |
| `-h, --help`        | Show help information                |

## Changelog

The changelog is generated automatically during the Continuous Deployment (CD) process. You can find the latest updates and release notes in the [Releases](https://github.com/lucasmeira/npmfix/releases) page.
