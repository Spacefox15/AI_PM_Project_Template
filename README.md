# 🚀 Project Name

> **One-line description of what this does and who it's for.**  
> Example: *An AI-powered tool that helps product teams turn raw user feedback into prioritized feature ideas in under 60 seconds.*

---/new

## 🔍 The Problem

*What pain point does this solve? Write 2–3 sentences as if explaining to a non-technical stakeholder.*

Example: Product managers spend hours manually sorting through support tickets and user interviews to find patterns. This creates a bottleneck before every planning cycle and often means valuable signals get missed entirely.


---

## 💡 The Solution

*What does this project actually do? Keep it simple.*

This tool lets you paste raw feedback, upload a CSV of tickets, or connect a data source — and returns a structured, ranked list of themes with supporting quotes and a suggested priority order.

**Key capabilities:**
- [Feature 1]
- [Feature 2]
- [Feature 3]

---

## 🎯 Who It's For

| User | Use Case |
|------|----------|
| Product Managers | Pre-planning synthesis of user feedback |
| AI PMs | Testing AI-assisted prioritization workflows |
| Researchers | Rapid thematic analysis of qualitative data |

---

## 🖥️ Live Demo

🔗 **[Try it here](https://your-demo-link.com)**  
📹 **[Watch the 2-min walkthrough](https://loom.com/your-video)**

*Screenshots:*

![App screenshot](assets/screenshot-main.png)

---

## ⚙️ How It Works

```
[User Input] → [Preprocessing] → [AI Analysis] → [Structured Output]
     ↓               ↓                ↓                  ↓
  CSV/Text      Clean & format    Claude/Gemini      Ranked themes
                                   via API           + export PDF
```

*See [`docs/architecture.md`](docs/architecture.md) for the full system diagram.*

---

## 🛠️ Tech Stack

| Layer | Technology | Why I chose it |
|-------|-----------|----------------|
| Frontend | HTML / CSS / JavaScript | Fast to ship, no build step |
| AI | Anthropic Claude API / Google Antigravity | Best-in-class reasoning for structured output |
| Data | SQL / Oracle DB | Matches real enterprise environments |
| Visualization | Tableau / D3.js | Clear, stakeholder-ready charts |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+ OR Java 17+
- An Anthropic API key → [Get one here](https://console.anthropic.com)
- [Any other dependencies]

### Installation

```bash
# Clone the repo
git clone https://github.com/YOUR-USERNAME/project-name.git
cd project-name

# Install dependencies
npm install

# Add your API key
cp .env.example .env
# Edit .env and add: ANTHROPIC_API_KEY=your_key_here

# Run it
npm start
```

---

## 📊 Results / Impact

*What happened when you used this? Even test results count.*

- Reduced manual feedback synthesis from ~3 hours → ~5 minutes
- Identified 3 feature themes missed in manual review during testing
- Processed 200-row CSV with 98% relevant output on first prompt attempt

---

## 🗺️ What I'd Do Next (Roadmap)

- [ ] Add Slack integration to auto-pull feedback from a channel
- [ ] Support audio transcripts from user interviews
- [ ] Build a shareable link for stakeholder review
- [ ] A/B test two different prioritization frameworks (RICE vs MoSCoW)

---

## 🧠 Key Decisions & Tradeoffs

*See [`docs/decisions.md`](docs/decisions.md) for the full decision log.*

**Example:** I chose plain JavaScript over React to reduce setup time and keep the project shippable in a weekend. If I were scaling this to a team, I'd migrate to React for component reusability.

---

## 👤 About Me

Built by Paxton M. Calareso — an AI-focused Product Manager passionate about creating the next generation of technology.

🔗 [LinkedIn](https://www.linkedin.com/in/paxton-calareso/) · 🐙 [GitHub](https://github.com/Spacefox15) · 📧 [Email](mailto:pmcalareso@outlook.com)
