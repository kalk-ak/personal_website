/**
 * Single source of truth for projects. Used by the condensed homepage section,
 * the /projects index, and each /projects/[slug] detail page.
 *
 * Order matters: the homepage shows the first `HOMEPAGE_COUNT` entries, so keep
 * the strongest work at the top.
 */

export interface ProjectDocLink {
  label: string;
  href: string;
}

export interface ProjectHighlight {
  heading: string;
  body: string;
}

export interface Project {
  /** URL segment for /projects/[slug]. Never change one that's been shared. */
  slug: string;
  title: string;
  subtitle: string;
  /** One or two sentences. Used on cards and as the page meta description. */
  teaser: string;
  /** Detail page body copy, one string per paragraph. */
  overview: string[];
  highlights: ProjectHighlight[];
  tech: string[];
  github: string | null;
  live: string | null;
  /** Shown in place of a repo link when the source isn't public. */
  private?: string;
  docs?: ProjectDocLink[];
  /** `id` of the matching entry in Experience.tsx, if this grew out of a role. */
  relatedExperienceId?: string;
  featured: boolean;
  color: string;
  stats: string;
}

export const HOMEPAGE_COUNT = 3;

export const projects: Project[] = [
  {
    slug: "financial-news-market-prediction",
    title: "Financial News Market Prediction Pipeline",
    subtitle: "Data Engineering · Quant ML",
    teaser:
      "100 million financial news articles scraped across 20 servers and filtered down to 2 million, then run through everything from a fine-tuned FinBERT to attention-based time series networks to try to call where a stock was going.",
    overview: [
      "This started as a question: if you could read every financial news article published about a company over the past few weeks, could you predict where its stock was going the next day? My team and I spent a long time on that, and it pulled us much deeper into data engineering, modeling, and reasoning text model orchestration than any of us expected going in.",
      "The first real problem was collection. We built a scraping pipeline across 20 remote JHU servers that gathered roughly 100 million financial articles, pulling article URLs from Google News and BigQuery's Global News Knowledge Graph and stripping the ads and boilerplate out of the raw HTML.",
      "Almost none of that volume is useful, because an article that mentions a ticker is not necessarily an article about the company. We embedded each document with Doc2Vec and scored it against a text description of the company it was supposed to be about, which cut 100 million articles down to the 2 million that were actually relevant.",
      "We then fine-tuned the later layers of a 250 million parameter FinBERT and several other language models, replacing their final layers with our own N-way classification so they predicted straight from the article text. In parallel we engineered features out of the news and fed those to models that want structured input instead, ensembling CatBoost and recurrent LSTMs, so the text models had something to be measured against on even footing.",
      "Then we moved toward higher frequency prediction, which put all the pressure back on the scraper. Intraday signal needs articles bounded by exact timestamps, so we built a much more capable invisible scraper that could retrieve information on the backs of powerful search engines for a specific window without getting blocked or flagged, and return what was published between two times rather than whatever happened to be indexed later.",
      "We benchmarked the forecasting side, from decision trees up to attention-based time series networks, across returns for 10 tech stocks. Afterward I pointed the same scraper at crude oil coverage during the US-Iran conflict, on the theory that a sharper and more news-driven market might outperform intuition.",
      "The results we got for those models were high variance and barely beat the S&P 500 or random choice. What worked better was agentic orchestration, where different agents take the role of different stock market analyzers and debate how the classification is going to turn out. That is currently being explored as a startup.",
    ],
    highlights: [
      {
        heading: "20 servers, 100M articles",
        body: "URLs came from Google News and BigQuery's Global News Knowledge Graph. The scraper ran across 20 remote JHU servers and got usable text off about 85% of the pages it tried.",
      },
      {
        heading: "Filtered down to 2M",
        body: "Each article got a Doc2Vec embedding, scored against a written description of the company it was supposed to be about. Roughly 98 out of every 100 articles did not make it through.",
      },
      {
        heading: "FinBERT, fine-tuned",
        body: "250 million parameters, later layers unfrozen, final layers swapped for an N-way classification head. Several other language models got the same treatment.",
      },
      {
        heading: "Features and tree models",
        body: "Features engineered out of the news for the models that need structured input, then CatBoost ensembled with recurrent LSTMs. This is what the text models got measured against.",
      },
      {
        heading: "Timestamp-bounded scraping",
        body: "Intraday prediction needs articles bounded by exact times. The second scraper pulled a specific window off the search engines without getting blocked or flagged, so we got what was published between two times instead of whatever was indexed later.",
      },
      {
        heading: "Benchmarks",
        body: "Decision trees up through attention-based time series networks, on returns for 10 tech stocks, against random choice and buy-and-hold S&P 500.",
      },
      {
        heading: "The agents did better",
        body: "The single models were high variance and barely beat either baseline. Several agents each taking a different stock market analyzer role and debating the classification worked better. That is the part being explored as a startup.",
      },
    ],
    tech: ["Python", "FinBERT", "Doc2Vec", "CatBoost", "BiLSTM", "Transformers", "Playwright", "GoLogin", "BigQuery"],
    github: null,
    private: "Source private, exploring this as a startup",
    live: null,
    docs: [
      {
        label: "Stock Prediction Report",
        href: "https://github.com/kalk-ak/personal_website/blob/master/DataMining_Report.pdf",
      },
      {
        label: "Oil Price Analysis",
        href: "https://github.com/kalk-ak/personal_website/blob/master/Oil_analysis.pdf",
      },
    ],
    relatedExperienceId: "data-engineer-ml-engineer",
    featured: true,
    color: "#00f5d4",
    stats: "100M articles scraped across 20 servers, filtered to 2M relevant",
  },
  {
    slug: "omarchy-display-control-center",
    title: "Omarchy Display Control Center",
    subtitle: "Linux Tooling · C++ / GTK4",
    teaser:
      "A native C++ and GTK4 utility for managing brightness, night light, and screen rotation on Hyprland based Linux desktops, with a matching CLI.",
    overview: [
      "Hyprland gives you `hyprctl` and `hyprsunset` for display control, which is powerful and completely unergonomic for the things you actually do every day. Changing brightness or flipping on a warmer color temperature meant remembering flags.",
      "So I wrapped them. This is a native GTK4 application in C++ that exposes brightness, night light temperature, and screen rotation as real controls, with a CLI for the same operations when you would rather stay in the terminal or bind something to a key.",
      "It installs through CMake and it is the project of mine other people actually use, which changed how I write software. Issues from strangers running hardware I do not own are a different kind of pressure than a class project.",
    ],
    highlights: [
      {
        heading: "Native, not a script wrapper",
        body: "A real GTK4 application in C++ rather than a shell script behind a dialog box, so it starts instantly and feels like part of the desktop.",
      },
      {
        heading: "GUI and CLI parity",
        body: "Every control is available from both the window and the command line, which means it works whether you are clicking or writing a Hyprland keybinding.",
      },
      {
        heading: "Packaged properly",
        body: "CMake installable with a documented build, so people on other distributions can get it running without reverse engineering the project layout.",
      },
      {
        heading: "Used by other people",
        body: "Picked up by the Omarchy and Hyprland community, which means real bug reports from real hardware configurations.",
      },
    ],
    tech: ["C++", "GTK4", "Hyprland", "CMake"],
    github: "https://github.com/kalk-ak/omarchy-display-control-center",
    live: null,
    featured: true,
    color: "#7c3aed",
    stats: "Native GTK4 app, CMake installable",
  },
  {
    slug: "algorithm-forge",
    title: "The Algorithm Forge",
    subtitle: "NLP · ML from Scratch",
    teaser:
      "Machine learning and NLP implemented from scratch, from decision trees and PageRank to n-gram language models, plus Argubots: LLM agents that debate using real argumentation data.",
    overview: [
      "I do not trust that I understand an algorithm until I have written it without a library doing the interesting part for me. This repository is the result of applying that rule for a couple of years: decision trees, PageRank, n-gram language models, and a pile of other classic methods built up from the math.",
      "The largest piece in it is Argubots, a set of LLM-based dialogue agents that argue a position using real argumentation structures from Kialo. Different agents use different strategies, and the interesting engineering is not the agents themselves but the evaluation framework around them, which is what lets you say one strategy is actually better than another rather than just reading transcripts and forming a vibe.",
      "Treat it as a reading room rather than a product. Each subproject is self-contained and meant to be legible.",
    ],
    highlights: [
      {
        heading: "Built from the math",
        body: "Classic ML and NLP methods implemented directly instead of called from a library, so the tradeoffs in each one are visible in the code.",
      },
      {
        heading: "Argubots",
        body: "LLM dialogue agents that debate using real Kialo argumentation data, with several distinct strategies to compare against each other.",
      },
      {
        heading: "An evaluation harness",
        body: "A full framework for scoring debate strategies head to head, which is the part that turns a demo into something you can draw a conclusion from.",
      },
    ],
    tech: ["Python", "NLP", "LLM Agents"],
    github: "https://github.com/kalk-ak/ml-playground",
    live: null,
    featured: false,
    color: "#f97316",
    stats: "Classic ML, NLP, and LLM agents in one repo",
  },
  {
    slug: "systems-playground",
    title: "Systems Playground",
    subtitle: "Systems Programming · C/C++",
    teaser:
      "Systems projects built from the ground up: a configurable cache simulator, a full CLI chess engine, a PPM image tool, and a head to head comparison of C against hand-written x86 assembly.",
    overview: [
      "A collection of the low-level work I keep coming back to, where the whole point is that nothing is abstracted away for you.",
      "The cache simulator is configurable across associativity, block size, and eviction policy, so you can watch hit rates move as you change the geometry instead of reading about it. The chess engine enforces the complete rule set, including the awkward ones people skip like en passant and castling rights, because partial rule enforcement is where chess engines quietly become wrong.",
      "The piece I learned the most from is the C versus x86 assembly comparison. Hand-writing assembly for the same routine and then measuring it against what the compiler produced is the fastest way to stop guessing about performance and start believing the compiler.",
    ],
    highlights: [
      {
        heading: "Configurable cache simulator",
        body: "Associativity, block size, and eviction policy are all parameters, so the simulator is useful for building intuition rather than just producing one number.",
      },
      {
        heading: "A chess engine that knows the whole rulebook",
        body: "Complete rule enforcement in a CLI engine, including the edge cases that are easy to leave out and hard to debug later.",
      },
      {
        heading: "C against hand-written assembly",
        body: "The same routine written both ways and measured, which turns compiler optimization from something you assume into something you have checked.",
      },
    ],
    tech: ["C++", "C", "x86 Assembly", "CMake"],
    github: "https://github.com/kalk-ak/Systems-Playground",
    live: null,
    featured: false,
    color: "#38bdf8",
    stats: "5 standalone systems projects",
  },
  {
    slug: "green-garden-hyprland-theme",
    title: "Green Garden Hyprland Theme",
    subtitle: "Linux Desktop · Design",
    teaser:
      "A nature inspired desktop theme for Hyprland and Omarchy, installable with a single command and carried in the Omarchy community theme gallery.",
    overview: [
      "A complete desktop theme for Hyprland and Omarchy built around greens and natural tones, covering the window manager, the bar, the terminal, and the rest of the surfaces that have to agree with each other for a theme to actually feel finished.",
      "It installs with one command and it was picked up by the Omarchy community theme gallery, which is how most of the people running it found it. It is my most-starred repository, which says something slightly funny about the relationship between engineering effort and reach.",
    ],
    highlights: [
      {
        heading: "One command to install",
        body: "No manual file copying or config merging. The install path is a single command, which is the difference between a theme people try and a theme people read about.",
      },
      {
        heading: "Consistent across the whole desktop",
        body: "Window manager, bar, and terminal all themed together, so there are no surfaces left looking like the default.",
      },
      {
        heading: "In the community gallery",
        body: "Carried in the Omarchy community theme gallery, which is where its users actually come from.",
      },
    ],
    tech: ["Hyprland", "Shell", "Omarchy"],
    github: "https://github.com/kalk-ak/omarchy-green-garden-theme",
    live: null,
    featured: false,
    color: "#a3e635",
    stats: "24 GitHub stars",
  },
  {
    slug: "computational-math-and-science",
    title: "Computational Math & Science",
    subtitle: "Applied Mathematics · Computation",
    teaser:
      "A working notebook library applying calculus, linear algebra, probability, and statistics to computational problems, plus the physics lab analyses behind them.",
    overview: [
      "The quantitative foundation underneath everything else on this site, kept in the open rather than left in a folder.",
      "These are working notebooks applying calculus, linear algebra, probability, and statistics to computational problems, alongside the analysis work from physics labs. Nothing here is a product. It is the layer you need in place before the machine learning and robotics work can be anything other than calling other people's functions.",
    ],
    highlights: [
      {
        heading: "Breadth on purpose",
        body: "Calculus, linear algebra, probability, and statistics in one place, because in practice problems do not arrive sorted by which branch of math solves them.",
      },
      {
        heading: "Real lab analysis",
        body: "Physics lab data worked through with the same tools, including the error analysis, which is where statistics stops being abstract.",
      },
    ],
    tech: ["Python", "Jupyter", "NumPy", "Matplotlib"],
    github: "https://github.com/kalk-ak/Computational-Math-and-Science",
    live: null,
    featured: false,
    color: "#fb7185",
    stats: "Spans calculus, linear algebra, probability, and physics",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Previous/next for the detail page footer, wrapping around the list. */
export function getProjectNeighbors(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: undefined, next: undefined };
  return {
    prev: projects[(i - 1 + projects.length) % projects.length],
    next: projects[(i + 1) % projects.length],
  };
}
