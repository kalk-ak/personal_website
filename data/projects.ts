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
        heading: "Mostly throwing data away",
        body: "A ticker mention is not coverage. 98 of every 100 articles got discarded.",
      },
      {
        heading: "Publish time, not index time",
        body: "Search engines tell you when they found an article. Intraday needs when it went up.",
      },
      {
        heading: "Barely beat a coin flip",
        body: "FinBERT, CatBoost ensembles, attention time series nets. High variance, barely past random choice.",
      },
      {
        heading: "Making them argue worked",
        body: "Agents in different analyst roles, debating the call, beat every model we fine-tuned.",
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
    slug: "spinquest-daq-server",
    title: "High-Throughput DAQ Server & FPGA Simulator",
    subtitle: "Systems · Particle Physics",
    teaser:
      "The data acquisition server for the SpinQuest experiment at Fermilab, built to catch spill data off multiple FPGA boards at once, plus the fake FPGA it gets tested against.",
    overview: [
      "SpinQuest is a particle physics experiment at Fermilab. Its detectors fire data in bursts called spills, and when a spill happens the readout has one chance to get it off the FPGA boards and onto disk. Miss it and the data is gone.",
      "I built the server that catches it. It takes TCP, UDP, or UNIX socket streams from several boards at once, pulls the 64-bit words out of the window framed by a start and end preamble, and writes each board's spill to its own file.",
      "The catch with writing something like this is that you cannot test it against a live accelerator. So the repo ships a second binary, a fake FPGA that simulates any number of boards clocking at whatever frequency you give it. That is what the server is actually developed against.",
    ],
    highlights: [
      {
        heading: "SO_REUSEPORT, not a dispatcher",
        body: "The kernel hashes each board to a fixed worker, so every file write is lock-free.",
      },
      {
        heading: "Three protocols, one server",
        body: "TCP, UDP, and UNIX domain sockets, switched with a flag.",
      },
      {
        heading: "You cannot test on a live beam",
        body: "So it ships a fake FPGA that clocks out spills at any frequency you ask for.",
      },
      {
        heading: "No leaked descriptors",
        body: "A UniqueFD wrapper closes everything, including on the crash path.",
      },
    ],
    tech: ["C++17", "Multithreading", "TCP/UDP Sockets", "SO_REUSEPORT", "UNIX Sockets", "CMake", "spdlog", "CLI11"],
    github: "https://github.com/kalk-ak/SpinQuest-TDC-FW/tree/master/DAQ-Simulator",
    live: null,
    docs: [
      {
        label: "Simulation Demo on LinkedIn",
        href: "https://www.linkedin.com/feed/update/urn:li:activity:7446627649042608128/",
      },
    ],
    relatedExperienceId: "spinquest-daq",
    featured: true,
    color: "#7c3aed",
    stats: "Three socket protocols, lock-free UDP workers",
  },
  {
    slug: "algorithm-forge",
    title: "The Algorithm Forge",
    subtitle: "NLP · ML from Scratch",
    teaser:
      "Machine learning and NLP implemented from scratch, from decision trees and PageRank to n-gram language models, plus Argubots: LLM agents that debate using real argumentation data.",
    overview: [
      "I do not trust that I understand an algorithm until I have written it without a library doing the interesting part for me. This repository is the result of applying that rule throughout a couple of years.",
    ],
    highlights: [
      {
        heading: "Built from the math",
        body: "Decision trees, PageRank, n-gram language models, written directly instead of imported.",
      },
      {
        heading: "Argubots",
        body: "LLM agents arguing a position from real Kialo data, several strategies at once.",
      },
      {
        heading: "An evaluation harness",
        body: "Scores the debate strategies head to head, so the comparison is not a guess.",
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
        body: "Associativity, block size, and eviction policy are all parameters.",
      },
      {
        heading: "Chess engine, complete rules",
        body: "Full rule enforcement, including the edge cases most engines skip.",
      },
      {
        heading: "C against hand-written assembly",
        body: "The same routine written both ways, then measured.",
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
        body: "No file copying, no config merging.",
      },
      {
        heading: "Consistent across the desktop",
        body: "Window manager, bar, and terminal themed together.",
      },
      {
        heading: "In the community gallery",
        body: "Carried in the Omarchy community theme gallery.",
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
        body: "Calculus, linear algebra, probability, and statistics in one place.",
      },
      {
        heading: "Real lab analysis",
        body: "Physics lab data worked through with the same tools, error analysis included.",
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
