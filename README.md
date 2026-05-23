# Hunting SRG(37)

**The search for a 6803rd strongly regular graph on (37, 18, 8, 9).**

An interactive book documenting twelve attacks on a genuinely open
question in algebraic combinatorics: is the published catalogue of
**6802** strongly regular graphs with parameters (37, 18, 8, 9) complete,
or is there a 6803rd?

A graph certainly *exists* — the Paley graph *P*(37) is one. The open
problem is the **count**: McKay and Spence (2001) left over a million
spectrum-compatible neighbour graphs unsearched. This book is an honest,
reproducible hunt log — every attack returned **zero new graphs**, and
the value is the precise map of *where the wall is and why every
classical method bounces off it*.

## Read it

Open **`index.html`** in any modern browser. No server, no build step —
every file is a plain static asset. Chapters carry interactive widgets:

- a **feasibility calculator** pre-loaded with (37, 18, 8, 9);
- a clickable **Paley(37) viewer** (confirm degree 18, λ = 8, μ = 9);
- an **SRG verifier** you can paste a candidate adjacency into;
- a **live 2-swap local-search** demo that shows the violation floor;
- a filterable **attack scoreboard** of all twelve vectors.

Math renders with KaTeX; graphs render with D3 (both from CDN — see
*Offline* below).

## Print to PDF

Each chapter prints cleanly on its own (`Ctrl`+`P` → *Save as PDF*).
For a single bound document:

```
python scripts/build_print.py     # writes print_full.html
```

then open `print_full.html` and print to PDF (A4, margins ~2.5 cm,
background graphics off). The print stylesheet hides interactive controls,
adds page breaks, and footnotes external links.

## Contents

| Part | Chapters |
|------|----------|
| **I — The Target** | 1. The Target · 2. Spectrum & Feasibility · 3. The 6802-Graph Catalog |
| **II — The Hunt** | 4. SAT & Constraint · 5. Switching · 6. Local & Continuous Search · 7. LLM-Driven · 8. Custom Backtracking |
| **III — Findings & Frontier** | 9. Empirical Findings · 10. Breaking the Wall · 11. Tools & Reproducibility |
| **Appendices** | A. Notation & Glossary · B. Bibliography |

## Layout

```
hunting-srg37/
├── index.html            landing page + table of contents
├── print.html            title / abstract / contents (print front matter)
├── assets/               book.css, print.css, book.js (shared)
├── part1_target/         chapters 1–3
├── part2_hunt/           chapters 4–8
├── part3_frontier/       chapters 9–11
├── appendix/             notation, bibliography
└── scripts/build_print.py  one-shot print_full.html stitcher
```

## Companion code

The search engine, Docker images, and the 6802-graph catalog live in the
companion repository **[orbit-gen](https://github.com/tonykoval/orbit-gen)**.
Chapter 11 documents every image (`tonykoval/srg37-hunt`,
`tonykoval/de-caen-filter:nauty-ccl`), subcommand, and data file.

## Found a 6803rd graph?

Verify it (`is_srg`, Chapter 1) and run `iso-compare` (Chapter 11). If it
prints `*** NOVEL ***`, you have advanced a classification that has stood
incomplete since 2001. That is the whole point of writing it down.

## Offline / vendoring

KaTeX and D3 load from jsDelivr. For fully offline use, drop the
distributions into `assets/katex/` and `assets/d3/` and repoint the
`<script>` / `<link>` tags.

## Licence

Content **CC-BY-4.0**; code **MIT**. See `LICENSE`.

— Tony Koval · `aktealc@gmail.com`
