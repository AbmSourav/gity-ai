# GityAI

Agentic AI CLI that writes your Git **commit messages** and **pull request descriptions** from your actual code changes — with an interactive refinement loop, so every result is a starting point you can accept, regenerate, or steer with your own prompt until it's right.

Provider-agnostic: use **Google Gemini** or **Anthropic Claude** (or both), switchable at runtime.

## Install

```bash
npm install -g @abmsourav/gityai
```

Supported platforms: macOS (arm64), Linux (x64 / arm64), Windows (x64).

## Usage

```bash
gityai setup        # pick a provider (Gemini/Claude) and add its API key
gityai model        # switch the active model
gityai init         # initialize GityAI for a project
gityai cm -s        # generate a commit message (refine in a loop)
gityai prd -s       # generate a PR description (refine in a loop)
gityai --help       # all commands
```

Your API keys are stored locally in `~/.gityai/`.

Full documentation: [GityAI Doc](https://github.com/AbmSourav/gity-ai#gityai)
