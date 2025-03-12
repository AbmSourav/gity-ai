# GityAI

GityAI is a agentic AI tool that can automate Git workflows.

<br>

*Click on the below image to watch the Demo video*

[![GityAI Demo](https://abmsourav.com/welcome/wp-content/uploads/2025/03/GityAI-Cover.jpg)](https://abmsourav.com/welcome/wp-content/uploads/2025/03/GityAI.mp4)

<br>

## Installation

Download the latest release from the [releases page](https://github.com/AbmSourav/gity-ai/releases/tag/1.0.0)

Add the binary to your PATH or make a alias in `.bashrc` or `.zshrc`:

```bash
alias gityai="path/to/gityai/gityai"
```

Then run `gityai` on a newly open terminal to check if the installation was successful.

<br>

## Setup

To setup GityAI in your computer, get Gemini API key from [Gemini API](https://aistudio.google.com/apikey).
Then run the below command

```bash
gityai setup
```

The API key will be stored in your computer securely.

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
Generate a Git commit message based on the changes made in the project directory:

```bash
gityai cm -s
```

## Generate Pull Request Description

Generate a Pull Request description based from current branch

```bash
gityai prd -s
```
