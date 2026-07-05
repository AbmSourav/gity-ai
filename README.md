# GityAI

GityAI is an agentic AI tool that automates Git workflows — it writes your commit messages and pull request descriptions from your actual code changes, and lets you "refine them in a loop" until they read exactly the way you want.

<br>

*Click on the below thumbnail to watch the Demo video*
[![GityAI Demo](https://abmsourav.com/welcome/wp-content/uploads/2025/03/Screenshot-2025-03-12-at-3.11.39 PM.png)](https://abmsourav.com/welcome/wp-content/uploads/2026/07/GityAI.mp4)

<br>

## Features

- **Bring your own AI model** — GityAI is provider-agnostic. Configure [Google Gemini](https://aistudio.google.com/apikey) or [Anthropic Claude](https://console.anthropic.com/settings/keys) (or both) and switch between them at any time with `gityai model`.
- **Agentic refinement loop** — every generated commit message and PR description is a starting point, not a final answer. Accept it, regenerate a fresh one, or steer it with your own prompt — as many rounds as you like — until it's right.
- **Generated from real context** — commit messages are written from your `git diff`; PR descriptions are written from the commits on your branch. No copy-pasting prompts.
- **Keys stored locally** — your API keys are kept on your own machine, never sent anywhere but the provider you chose.

<br>

## Download

- Download [GityAI 2.0](https://github.com/AbmSourav/gity-ai/releases/tag/2.0) - *Latest*
- Download [GityAI 1.1.2](https://github.com/AbmSourav/gity-ai/releases/tag/1.1.2)
- Download [GityAI 1.1.1](https://github.com/AbmSourav/gity-ai/releases/tag/1.1.1)
- Download [GityAI 1.1.0](https://github.com/AbmSourav/gity-ai/releases/tag/1.1.0)
- Download [GityAI 1.0.0](https://github.com/AbmSourav/gity-ai/releases/tag/1.0.0)

<br>

## Installation

Download the latest release from the [releases page](https://github.com/AbmSourav/gity-ai/releases/tag/2.0) "Assets" section. GityAI supports Linux, MacOS, and Windows. Choose the appropriate binary for your system.
Then unzip the downloaded file and move the `gityai` binary to a location of your choice and copy the path to it.

Add the binary to your PATH or make a alias in `.bashrc` or `.zshrc`:

```bash
alias gityai="path/to/gityai/gityai"
```

Then run `gityai` on a newly open terminal to check if the installation was successful.

<br>

## Setup

GityAI works with either [Google Gemini](https://aistudio.google.com/apikey) or [Anthropic Claude](https://console.anthropic.com/settings/keys). Grab an API key from whichever provider you prefer, then run:

```bash
gityai setup
```

You'll be asked to pick a provider and paste its API key. The key is stored securely on your own machine. Run `setup` again anytime to add a second provider.
The API key is stored in your local machine, and never sent anywhere but the provider you chose.

<br>

## Choose a Model

If you've configured more than one provider, switch the active model at any time:

```bash
gityai model
```

To see which models are available and which one is currently active:

```bash
gityai model -a
```

<br>

## Initialize for a Project
Each of your project should be initialized with GityAI to use the tool.
Run the below command in the project root directory

```bash
gityai init
```

## Usage

```bash
gityai <command> [options]
```

## Generate Commit Message

Generate a Git commit message from the changes in your project (`git diff`) and save it to a markdown file for review:

```bash
gityai cm -s
```

After the message is generated, GityAI enters a **refinement loop** and asks what you'd like to do:

- **Happy with it** — commit with the current message.
- **Generate another one** — regenerate a fresh message from the same diff.
- **My prompt** — give your own instruction (e.g. *"make it shorter"*, *"mention the context"*) and regenerate.

You can keep choosing **Generate another one** or **My prompt** as many times as you like — the loop repeats until you pick **Happy with it**.

Use `gityai cm` (without `-s`) to generate and commit directly without saving to a file.

<br>

## Generate Pull Request Description

Generate a Pull Request description from the commits on your current branch:

```bash
gityai prd -s
```

GityAI first asks for the base branch to compare against, then generates the description. Just like commit messages, it enters a refinement loop and asks what you'd like to do:

- **Happy with it** — save the current description.
- **Generate another one** — regenerate a fresh description from the same commits.
- **My prompt** — give your own instruction (e.g. *"add a testing section"*, *"summarize the breaking changes"*) and regenerate.

Keep choosing **Generate another one** or **My prompt** as many times as you like — the loop repeats until you pick **Happy with it**. The final description is saved to `.gityai/pr.md`.

Use `gityai prd` (without `-s`) to also print the generated description to the terminal.
