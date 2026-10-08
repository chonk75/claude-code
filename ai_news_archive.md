# AI News Archive

## [2026-10-08 10:00] Daily AI Briefing

📅 Daily AI Briefing: October 8, 2026

🔥 Top Breaking Headlines
- Manus raises $500M+ in first round since the collapsed Meta deal, with Tencent and IDG back on the cap table
- Anthropic ships Claude Haiku 5.5 at $0.10/1M input tokens — up to 90% cheaper than Haiku 4.5
- Mistral unveils Large 4 "le Chonk," a 1T-parameter open-weight multimodal MoE, weights due end of October
- Isomorphic Labs in early talks for a $40–50B valuation, up from ~$17.5B five months ago
- DeepSeek's round swells toward $12–15B at a ~$75B valuation as it preps a Shanghai IPO

🚀 Executive Summary

The money story leads today: Manus's parent, Butterfly Effect, confirmed on October 8 that the agent startup raised more than $500M — its first round since Beijing blocked Meta's ~$2B acquisition. Boyu Capital and IDG Capital led; Tencent, HSG and ZhenFund re-upped. Bloomberg had pegged the target at roughly $4B, double the prior mark. It lands the same week DeepSeek's in-progress round reportedly ballooned toward $12–15B at a ~$75B valuation ahead of a planned Shanghai listing, and DeepMind spinout Isomorphic Labs opened talks for a $40–50B valuation — a jump from about $17.5B after its $2.1B May round. Chinese and drug-discovery AI are drawing capital at prices that keep resetting upward.

On models, the price war got louder. Anthropic's Claude Haiku 5.5, out October 7, drops short-prompt input pricing to $0.10 per million tokens (output $0.50) for prompts under 100K, undercutting Haiku 4.5 by up to 90% while posting OSWorld 2.1 of 72.4% (up from 15.7%) and a GDPval Elo of 1620. A day earlier, Mistral put Large 4 "le Chonk" into preview: a 1.05T-parameter, 49B-active multimodal MoE with a 1M-token context, priced at $1.36/$4.18 per million tokens, with open weights promised by end of October.

Policy stayed active in the background: a litigation tracker counts 152 AI cases in US courts as of October 6 (92 intellectual property), with 16 new suits filed in the prior 30 days, while the DOJ keeps pressing its challenge to state AI laws. The throughline — cheaper frontier-class inference, bigger China rounds, and open weights moving to the 1T-parameter tier — points to a market racing on both price and scale.

---

🤖 New AI Models Spotlight

Model: Claude Haiku 5.5
Creator: Anthropic
Released: October 7, 2026
Capabilities: Anthropic's fastest/cheapest small model. Pricing (reported): $0.10/1M input and $0.50/1M output for prompts ≤100K tokens; $0.50/$2.50 above 100K. ~1M-token context; first Haiku with adjustable "effort" (default medium). Benchmarks: OSWorld 2.1 72.4% (Haiku 4.5: 15.7%), Terminal-Bench 4.0 39.2% (4.5: 0.0%), GDPval-AA v2.1 Elo 1620 (4.5: 735; GPT-6 Luna: 1437), Humanity's Last Exam 45.9% no-tools / 57.4% with tools. A new tokenizer uses more tokens per task, trimming some of the headline savings.

Model: Mistral Large 4 ("le Chonk")
Creator: Mistral AI
Released: October 6, 2026 (public preview; open weights due ~end of October)
Capabilities: Natively multimodal (image + text) mixture-of-experts, ~1.05T total / 49B active parameters, 1M-token context. Preview is API-only on Mistral Studio; license for downloadable weights not yet published. Pricing: $1.36/1M input, $4.18/1M output. Targets coding, agentic workflows, visual grounding, cybersecurity, finance, law, and on-prem/private-cloud deployment. Trained on ~3,800 GPUs (Mistral's figure).

Model: EmbeddingGemma 2
Creator: Google
Released: early October 2026 (Apache 2.0)
Capabilities: Google's first natively multimodal open embedding model, built on the Gemma 4 architecture; unifies images, video, audio, text and code in a single embedding space.

Model: Nano Banana 2.1 (API)
Creator: Google
Released: October 6, 2026
Capabilities: Image model with mask-based editing and improved subject consistency; 65,536-token context; available via Google AI Studio / API.

Note: Specs and benchmarks above are largely from third-party trackers and launch coverage, not primary provider docs in every case; verify against Anthropic/Mistral/Google release notes before relying on exact figures.

---

📰 Deep Dive: Verified News

━━━━━━━━━━━━━━━━━━━━
🔹 STORY 1
━━━━━━━━━━━━━━━━━━━━

📌 Headline: Manus raises $500M+ in first round since the collapsed Meta deal

📝 Summary: Manus's parent company, Butterfly Effect, announced October 8 (via WeChat) that the AI-agent startup raised more than $500 million — its first funding since Beijing blocked Meta's roughly $2 billion acquisition, which Meta had already started integrating. Boyu Capital and IDG Capital led the round; existing backers Tencent, HSG and ZhenFund joined. The company did not disclose a post-money valuation, but Bloomberg previously reported a ~$4 billion target, which would double its prior mark. Manus resumed independent operations earlier this month and has since launched Manus 2.0 on a new in-house execution system called Cascade. It is reportedly weighing a restructuring that could support a future Hong Kong listing.

🌐 Primary Source: CNBC (Oct 8, 2026)
✅ Verified Via: The Information, Bloomberg (via Investing.com), TokenPost, BigGo Finance

━━━━━━━━━━━━━━━━━━━━
🔹 STORY 2
━━━━━━━━━━━━━━━━━━━━

📌 Headline: Anthropic ships Claude Haiku 5.5 with up to 90% price cut

📝 Summary: On October 7, Anthropic released Claude Haiku 5.5, its fastest and cheapest small model, aimed at high-volume work like summarization, classification, database queries and live support. For prompts under 100K tokens it costs $0.10 per million input tokens and $0.50 per million output — roughly 90% below Haiku 4.5 on short prompts and ~75% cheaper on average; above 100K tokens pricing jumps to $0.50/$2.50. Reported benchmarks show a steep jump in agentic skill: OSWorld 2.1 at 72.4% (versus 15.7% for Haiku 4.5) and Terminal-Bench 4.0 at 39.2% (versus 0.0%), with a GDPval-AA Elo of 1620. The Decoder framed it as evidence the AI pricing arms race is far from over; a new tokenizer that consumes more tokens per task offsets part of the savings.

🌐 Primary Source: The Decoder (Oct 7, 2026)
✅ Verified Via: VentureBeat, DataCamp, Technology.org, llm-stats, benchlm.ai

━━━━━━━━━━━━━━━━━━━━
🔹 STORY 3
━━━━━━━━━━━━━━━━━━━━

📌 Headline: Mistral debuts Large 4 "le Chonk," a 1-trillion-parameter open-weight preview

📝 Summary: On October 6, Mistral AI launched a preview of Mistral Large 4, nicknamed "le Chonk" — a natively multimodal mixture-of-experts model with about 1.05 trillion total parameters and 49 billion active, plus a 1-million-token context window. At launch it was API-only on Mistral Studio, with open weights promised by the end of October (some coverage cites October 27, which Mistral has not confirmed) and the downloadable-weights license not yet published. Pricing is $1.36 per million input tokens and $4.18 per million output. Mistral positions it for coding, agentic workflows, visual grounding, cybersecurity, finance, law and on-prem deployment, and says it was trained on roughly 3,800 GPUs. Independent benchmarks were not yet available; sources split on whether it also accepts audio input (most say image + text only).

🌐 Primary Source: MarkTechPost (Oct 6, 2026)
✅ Verified Via: VKTR, TestingCatalog, Developers Digest, ExplainX, ai-tldr.dev

━━━━━━━━━━━━━━━━━━━━
🔹 STORY 4
━━━━━━━━━━━━━━━━━━━━

📌 Headline: Isomorphic Labs in talks for a $40–50B valuation

📝 Summary: DeepMind's drug-discovery spinout Isomorphic Labs is in early talks to raise new funding at a valuation of at least $40 billion, potentially reaching $50 billion, per Bloomberg. That would be a sharp step up from the roughly $17.5 billion it was valued at before, and comes just five months after its $2.1 billion Series B (led by Thrive Capital, with Alphabet, GV, MGX, Temasek, CapitalG and the UK Sovereign AI Fund) closed in May. Including a $600 million Series A from March 2025, the company has raised about $2.7 billion in disclosed funding. The talks are early and terms could change; the financing has not closed. The raise would value an AI-first drug-design company — which has yet to bring a drug to market — alongside the largest frontier-model labs.

🌐 Primary Source: Bloomberg (Oct 2026)
✅ Verified Via: Seeking Alpha, GuruFocus, CryptoBriefing, HuggingNews, RuntimeWire

━━━━━━━━━━━━━━━━━━━━
🔹 STORY 5
━━━━━━━━━━━━━━━━━━━━

📌 Headline: DeepSeek's round swells toward $12–15B as it preps a Shanghai IPO

📝 Summary: DeepSeek is weighing a sharp expansion of its latest round, with reporting that it has grown toward $12–15 billion at a valuation near $75 billion (roughly 500 billion yuan), tied to preparations for an initial public offering in Shanghai. That follows a bumpy process: its first external round closed around $7.4 billion (post-money over 350 billion yuan) in mid-2026 with Tencent and CATL among backers, before a second round paused over leaked founder remarks and then resumed. CNBC reported on October 6 that the company was considering doubling its target to as much as 100 billion yuan. Numbers remain unsettled — the $12–15B range is thinly sourced, and reports disagree on whether the ~$75B figure is pre- or post-money — so treat the final size as provisional until a filing confirms it.

🌐 Primary Source: CNBC (Oct 6, 2026)
✅ Verified Via: Bloomberg, Caixin Global, Financial Times (via CryptoBriefing), Dealroom, BigGo Finance

---

🔍 Sources Scanned Today
- cnbc.com
- bloomberg.com
- theinformation.com
- the-decoder.com
- venturebeat.com
- datacamp.com
- technology.org
- marktechpost.com
- vktr.com
- testingcatalog.com
- llm-stats.com
- benchlm.ai
- caixinglobal.com
- seekingalpha.com
- gurufocus.com
- cryptobriefing.com
- dealroom.co
- investing.com (Bloomberg wire)
- crunchbase.com
- huggingface.co

━━━━━━━━━━━━━━━━━━━━

🤖 Briefing generated by Yonatan AI News Bot

⏰ Run time: October 8, 2026 | 10:00 AM

Note: The X (Twitter) CLI step was skipped — no X CLI is configured in this cloud environment (the routine still contains a [X CLI COMMAND] placeholder). Breaking-post coverage was approximated via web search instead. Every story above is confirmed by at least two independent sources.
