Awesome—here’s a clean, step-by-step playbook someone can follow to reproduce everything you demoed. I wrote it like a README you can drop into your repo (e.g., `TUTORIAL.md`). It references files you said you’re open-sourcing; just tweak any paths to match your repo.

---

# How to Recreate Carl’s Claude Code Demo (Step-by-Step)

## 0) Prerequisites

* macOS or Windows with a Terminal.
* Claude account (Pro is enough; Max optional).
* Optional tools used in the demo:

  * **Cursor** (or your IDE of choice) for a built-in terminal + Markdown preview.
  * **Node.js** (for tiny prototype + scripts).
  * **API keys (optional):** OpenAI, Google Gemini, xAI (Grok) if you run the multi-model prompt tests.
  * **Whisper Flow** (optional) for voice dictation to speed up prompts.

> Repo scaffold (adjust to your structure):

```
/context/business_info.md
/styles/writing/internal.md
/styles/writing/technical.md
/styles/writing/user_friendly.md
/examples/prds/example_prd.md
/data/interviews/*.md                   # e.g., jessica.md, marcus.md, ...
/docs/meetings/*.md                     # raw meeting notes
/commands/meeting-notes.command.md
/agents/designer.agent.md
/agents/engineer.agent.md
/agents/executive.agent.md
/agents/library/…                       # optional templates you include
/mcp/reddit.json                        # optional Reddit MCP config
/scripts/youtube_transcript/…           # optional helper, or just let Claude write it
/specs/workflow-builder.md
/prds/                                  # outputs
/reviews/                               # outputs
/research/                              # outputs
```

---

## 1) Install & Launch Claude Code

1. Copy the **native installer command** from Anthropic’s official Quick Start and run it in Terminal.
2. Launch Claude Code by typing:

```
claude
```

Handy built-ins you’ll use a lot:

* `clear` — resets the current conversation context.
* `init` — scans the folder and creates/updates a project memory file named `CLAUDE`.
* **Plan mode toggle** — press **Shift+Tab** to switch between “plan only” and “auto-apply”.
* Project memory rule: type a line starting with `#`, e.g.
  `# Never commit to GitHub without asking me first.`

---

## 2) Open Claude in the Project Folder

1. In Finder/Explorer, right-click your **demo folder** → “Open in Terminal”.
2. Run:

```
claude
```

---

## 3) Explore & Question Local Files (Interviews)

In Claude:

* “How many customer interviews are in `/data/interviews`?”
* “Summarize the top takeaways from **Jessica**.”
* “Compare **Jessica** vs **Marcus** with a focus on healthcare vs retail needs.”

Tip: run `clear` between unrelated tasks.

---

## 4) Web Search (inside Claude Code)

In a fresh session (`clear`):

* “Search the web for the latest iPhone announced **this month**. Give me key specs and sources.”

(You can substitute any topic here—this step demonstrates Claude Code’s built-in search.)

---

## 5) Image Analysis

Drag an image (e.g. `assets/linkedin-graphic.png`) into the Claude terminal window and ask:

* “Analyze this image and give PM-relevant feedback I can apply before posting.”

---

## 6) Run Code: Pull a YouTube Transcript to Markdown

**Goal:** Given a GitHub repo for a “YouTube transcript API,” have Claude install/use it and save a transcript as Markdown.

In Claude:

> “Use the YouTube transcript API at `<repo URL or local script>` to fetch the transcript for `<YouTube URL>`, then write it to `./transcripts/video.md`. Create whatever script is needed and run it.”

What happens:

* Claude creates a to-do plan (install deps → write script → fetch → save MD) and executes it.
* Approve any file writes when prompted.

Open the result later in your IDE to preview.

---

## 7) Use Claude Inside an IDE (Cursor)

1. Open the project in **Cursor**.
2. Open terminal inside Cursor (**Ctrl+`** on Windows/Linux; **Ctrl+`** on macOS) → run:

```
claude
```

3. Open `transcripts/video.md` and **Preview** (Cursor: **Shift+Cmd+V** on macOS).

---

## 8) Create Project Memory with `init`

In Claude (inside your project folder):

```
init
```

This scans your tree and writes/updates a `CLAUDE` file with structure, setup notes, and rules.

**Add guardrails** (they persist across sessions):

```
# Never commit to GitHub without asking me first.
# When doing web research, return results as bullets with source links.
# Use the "internal" writing style for internal docs unless I specify otherwise.
```

You can also place **subfolder-specific** `CLAUDE` files (e.g., `/prds/CLAUDE`) to enforce different rules in different areas.

---

## 9) Generate a PRD Using Context + Styles + Examples

Make sure these exist:

* `/context/business_info.md`
* `/styles/writing/technical.md`
* `/examples/prds/example_prd.md`

In Claude (fresh session):

> “Research OpenAI’s **Realtime** API (speech-to-speech), read `/context/business_info.md`, model the structure after `/examples/prds/example_prd.md`, use tone from `/styles/writing/technical.md`, and write a PRD for adding a Realtime-powered feature to our product. Save to `/prds/realtime_prd.md`.”

Approve file writes. Open/preview the PRD in your IDE.

---

## 10) Batch Meeting Summaries + Action Items (No Command)

In Claude:

> “Open `/docs/meetings`. For every Markdown file, append a **Meeting Summary** and **Action Items** section at the **bottom**. Try to infer owner + due date if obvious.”

Open any updated file to see appended sections.

---

## 11) Re-run with a **Saved Command** (Your “Stored Prompt”)

You’re shipping a reusable command file (example):
`/commands/meeting-notes.command.md`

What it contains (high level):

* Expected inputs (file or folder).
* Exact structure to write (Summary, Action Items, Metrics Mentioned, Risks, Next Steps).
* Where to place output (top or bottom).

**Invoke it** by name in Claude:

> “Run **meeting-notes** on `/docs/meetings` and put the sections at the **top** this time.”

*(Claude Code detects commands in `/commands` and will offer to execute them; if it asks where, give it the folder path.)*

---

## 12) Draft a Slack Follow-up in Your Voice

In Claude:

> “Using `/styles/writing/internal.md` for tone and the action items from `docs/meetings/2025-01-27-sync.md`, draft a Slack DM to **Sarah** asking for a status update (due yesterday). Keep it friendly but direct.”

Copy/paste the result into Slack.

---

## 13) **Plan Mode** for a Multi-Model Prompt Test Harness

**Why:** Plan first for complex tasks, then execute.

1. Toggle **Plan Mode** (Shift+Tab) so Claude can’t edit files yet.
2. In Claude:

> “I’m building a YouTube transcript summarizer.
> Create **three** distinct prompts (short insights / medium educational / long critical analysis).
> Then write code to run those prompts against the models I have keys for (OpenAI / Gemini / Grok).
> Use `./transcripts/video.md` as the test input.
> Save **one Markdown per prompt** to `/research/evals/`, and inside each file include sections for each model’s output.”

3. Review the proposed plan. If needed, add:

> “Ensure outputs are Markdown (`.md`), one file **per prompt**, each with **three model sections**. Then execute.”

4. Toggle back to **Auto-Apply** (Shift+Tab) and let it run.

**Before running**, set local env (example):

```
# .env
OPENAI_API_KEY=...
GEMINI_API_KEY=...
XAI_API_KEY=...
```

Open the generated files under `/research/evals/` and compare outputs.

---

## 14) Parallelize Work with Temporary Sub-Agents

In Claude:

> “For every file in `/data/interviews`, spin up a **UXR** agent in parallel and extract 3–5 **Key Insights**. Prepend them to the **top** of each file (‘## Key Insights’).”

Open the interview files to see the prepended sections.

---

## 15) Use Your **Custom Review Agents** (Designer / Engineer / Exec)

You ship three agent definitions:

* `/agents/designer.agent.md` (e.g., color: pink, focuses on UX/readability)
* `/agents/engineer.agent.md` (feasibility, risks, integration)
* `/agents/executive.agent.md` (strategy, metrics, ROI)

In Claude:

> “Review `/prds/realtime_prd.md` from the **designer**, **engineer**, and **executive** perspectives using the agents in `/agents`. Combine all feedback into `/reviews/realtime_prd_multi_review.md`.”

*(Claude spins each as an isolated sub-agent, then aggregates.)*

**Importing new agent templates:**
You can include a tiny note in your repo (e.g., `agents/README.md`) telling users they can copy files from `/agents/library/*` into `/agents` to add more roles (e.g., Legal Advisor).

---

## 16) Add MCP Tools (Example: Reddit)

1. Provide a working MCP config at `/mcp/reddit.json` (with instructions in `mcp/README.md` to add credentials).
2. In Claude (after setup):

> “Using the **Reddit MCP**, fetch top posts from **r/productmanagement** discussing ‘automation’ in the last month. Extract recurring pain points. Save to `/research/reddit-automation-pain-points.md`.”

*(You can include a similar Google Drive MCP if you want to demonstrate importing Drive docs directly.)*

---

## 17) Quick Front-End Prototype from a Spec

Make sure `specs/workflow-builder.md` explains the minimal feature:

* Canvas with a dotted grid
* Button: **Add Node**
* Ability to connect nodes visually

In Claude (fresh session, auto-apply on):

> “Implement the prototype described in `specs/workflow-builder.md` as a local web app (any simple stack). Add start scripts. Then run it.”

Open the local URL it prints (often [http://localhost:3000](http://localhost:3000)), click **Add Node**, add a second node, try making a connection.

> Tip: If it starts “manifesting” for too long, switch to **Plan Mode**, have it outline the file structure & steps, approve, then execute.

---

## 18) Best Practices & Controls

* **Use `clear`** between unrelated tasks to keep context fresh.
* **Plan Mode** first for anything non-trivial; correct the plan before execution.
* Keep **`# project memory rules`** in `CLAUDE` (e.g., “Ask before committing”, “Use internal tone by default”).
* Avoid YOLO/auto-approve for unfamiliar repos or prod code.
* Work in a **safe test folder**; use `git` to checkpoint changes.
* When you need heavier coding horsepower, keep Claude Code for orchestration + writing, but do the “big compile-and-run” work in an IDE with your preferred top model.

---

## 19) Prompt Snippets You Can Copy/Paste

* **Count & compare interviews**

  * “How many interview files are under `/data/interviews`?”
  * “Summarize the top takeaways from **Jessica**.”
  * “Compare **Jessica** vs **Marcus** focusing on healthcare vs retail.”

* **PRD super-prompt**

  * “Research OpenAI **Realtime** API, read `/context/business_info.md`, use `/examples/prds/example_prd.md` as a pattern, apply `/styles/writing/technical.md`, and write `/prds/realtime_prd.md`.”

* **Meetings → structured summaries**

  * “For each file in `/docs/meetings`, add **Meeting Summary** and **Action Items** at the bottom (owner + due date if obvious).”
  * “Run **meeting-notes** on `/docs/meetings` and place sections at the **top**.”

* **Slack nudge**

  * “Using `/styles/writing/internal.md` and `docs/meetings/2025-01-27-sync.md` action items, draft a Slack DM to **Sarah** (past due yesterday).”

* **Parallel agents**

  * “Spawn a **UXR** agent per file in `/data/interviews` (in parallel). Prepend ‘## Key Insights’ (3–5 bullets) at the top of each file.”

* **Multi-model eval harness (Plan Mode first)**

  * “Create three distinct transcript-summary prompts (short/medium/long). Write code to run them against **OpenAI/Gemini/Grok** using my env keys. Use `./transcripts/video.md` as input. Save one `.md` per prompt under `/research/evals/`, each with sections for the three model outputs.”

* **Multi-perspective reviews**

  * “Using agents in `/agents`, review `/prds/realtime_prd.md` from designer/engineer/executive perspectives and merge into `/reviews/realtime_prd_multi_review.md`.”

* **Reddit MCP**

  * “Using the **Reddit MCP**, fetch top r/productmanagement posts on ‘automation’ from the last month and extract recurring pain points into `/research/reddit-automation-pain-points.md`.”

* **Prototype**

  * “Implement the prototype in `specs/workflow-builder.md`, add start scripts, run locally, and tell me the URL.”

---

If you want, I can drop this straight into a `TUTORIAL.md` and add a minimal `agents/`, `commands/`, and `specs/` scaffold to match the steps.
