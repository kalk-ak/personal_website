"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import {
  SiCplusplus,
  SiC,
  SiLua,
  SiGnubash,
  SiGnu,
  SiMicropython,
  SiYaml,
  SiNumpy,
  SiPandas,
  SiPolars,
  SiScipy,
  SiScikitlearn,
  SiPytorch,
  SiTensorflow,
  SiOpenaigym,
  SiMeta,
  SiHuggingface,
  SiFastapi,
  SiPostgresql,
  SiSqlite,
  SiApachespark,
  SiApachehadoop,
  SiApachekafka,
  SiDocker,
  SiKubernetes,
  SiRaspberrypi,
  SiArduino,
  SiArchlinux,
  SiNeovim,
  SiTmux,
  SiClaude,
  SiFigma,
  SiGit,
  SiOpencv,
  SiCmake,
  SiAnaconda,
  SiGtk,
  SiN8N,
  SiHyprland,
  SiScrapy,
  SiNvidia,
} from "react-icons/si";
import {
  Binary,
  LineChart,
  Boxes,
  SquareTerminal,
  Code2,
  Bot,
  Network,
  Columns3,
  TableProperties,
  Languages as LanguagesIcon,
  Layers,
  ScanEye,
  BarChart3,
  Bug,
  Send,
  AppWindow,
  Soup,
  ShieldQuestion,
  Fingerprint,
  MessageSquareText,
} from "lucide-react";
import FadeSection from "@/components/FadeSection";

interface Tool {
  name: string;
  icon: IconType;
  description: string;
  url: string;
}

interface Category {
  title: string;
  color: string;
  reverse?: boolean;
  tools: Tool[];
}

const categories: Category[] = [
  {
    title: "ML, Data & RL",
    color: "#00f5d4",
    reverse: true,
    tools: [
      { name: "NumPy", icon: SiNumpy, description: "The array math everything else in Python ML builds on.", url: "https://numpy.org/" },
      { name: "Pandas", icon: SiPandas, description: "Wrangling and cleaning tabular data.", url: "https://pandas.pydata.org/" },
      { name: "Polars", icon: SiPolars, description: "Faster, leaner Pandas for bigger datasets.", url: "https://pola.rs/" },
      { name: "Matplotlib", icon: LineChart, description: "Plotting data and model results.", url: "https://matplotlib.org/" },
      { name: "SciPy", icon: SiScipy, description: "Optimization, stats, and signal processing on top of NumPy.", url: "https://scipy.org/" },
      { name: "scikit-learn", icon: SiScikitlearn, description: "Classical ML, from regression to clustering.", url: "https://scikit-learn.org/" },
      { name: "PyTorch", icon: SiPytorch, description: "My main deep learning framework.", url: "https://pytorch.org/" },
      { name: "TensorFlow", icon: SiTensorflow, description: "Deep learning, mainly for deployment.", url: "https://www.tensorflow.org/" },
      { name: "TensorFlow Lite", icon: SiTensorflow, description: "Runs models on small, constrained devices.", url: "https://www.tensorflow.org/lite" },
      { name: "Llama.cpp", icon: SiMeta, description: "Runs LLaMA models locally in C++.", url: "https://github.com/ggerganov/llama.cpp" },
      { name: "LM Studio", icon: MessageSquareText, description: "GUI for running local LLMs.", url: "https://lmstudio.ai/" },
      { name: "Hugging Face", icon: SiHuggingface, description: "Pretrained models and datasets for NLP and beyond.", url: "https://huggingface.co/" },
      { name: "Transformers", icon: Layers, description: "Loads and fine-tunes transformer models.", url: "https://huggingface.co/docs/transformers" },
      { name: "OpenCV", icon: SiOpencv, description: "Image processing, feature detection, camera calibration.", url: "https://opencv.org/" },
      { name: "NLTK", icon: LanguagesIcon, description: "Tokenizing and tagging text. One of my first NLP tools.", url: "https://www.nltk.org/" },
      { name: "SHAP", icon: BarChart3, description: "Attributes a prediction's credit across input features.", url: "https://shap.readthedocs.io/" },
      { name: "InterpretML", icon: ScanEye, description: "Explains why a model predicted what it did.", url: "https://interpret.ml/" },
      { name: "Apache Arrow", icon: Columns3, description: "Columnar in-memory format, shares data without copying.", url: "https://arrow.apache.org/" },
      { name: "PyArrow", icon: TableProperties, description: "Arrow's Python bindings, fast handoff to Pandas and Polars.", url: "https://arrow.apache.org/docs/python/" },
      { name: "Gymnasium", icon: SiOpenaigym, description: "Standard environments for training RL agents.", url: "https://gymnasium.farama.org/" },
      { name: "Stable-Baselines3", icon: Boxes, description: "Ready-to-use RL algorithms in PyTorch.", url: "https://stable-baselines3.readthedocs.io/" },
      { name: "Conda", icon: SiAnaconda, description: "Keeps ML environments isolated and reproducible.", url: "https://docs.conda.io/" },
      { name: "CUDA", icon: SiNvidia, description: "Runs deep learning and parallel workloads on the GPU.", url: "https://developer.nvidia.com/cuda-zone" },
    ],
  },
  {
    title: "Web Scraping & Data Engineering",
    color: "#fb7185",
    reverse: true,
    tools: [
      { name: "Requests", icon: Send, description: "Go-to HTTP library for quick calls and scrapes.", url: "https://requests.readthedocs.io/" },
      { name: "BeautifulSoup", icon: Soup, description: "Parses structured data out of messy HTML and XML.", url: "https://www.crummy.com/software/BeautifulSoup/" },
      { name: "Scrapy", icon: SiScrapy, description: "Full scraping framework for crawling sites at scale.", url: "https://scrapy.org/" },
      { name: "Playwright", icon: AppWindow, description: "Browser automation for sites that need real JS execution.", url: "https://playwright.dev/" },
      { name: "2Captcha", icon: ShieldQuestion, description: "Solves captchas when a scraper hits a wall.", url: "https://2captcha.com/" },
      { name: "GoLogin", icon: Fingerprint, description: "Fingerprint-isolated browser profiles for scraping.", url: "https://gologin.com/" },
    ],
  },
  {
    title: "Backend & Infra",
    color: "#7c3aed",
    reverse: true,
    tools: [
      { name: "FastAPI", icon: SiFastapi, description: "Go-to framework for fast, typed APIs.", url: "https://fastapi.tiangolo.com/" },
      { name: "PostgreSQL", icon: SiPostgresql, description: "My default relational database.", url: "https://www.postgresql.org/" },
      { name: "SQLite", icon: SiSqlite, description: "Lightweight embedded database for smaller projects.", url: "https://www.sqlite.org/" },
      { name: "Apache Spark", icon: SiApachespark, description: "Distributed processing for workloads too big for one machine.", url: "https://spark.apache.org/" },
      { name: "Hadoop", icon: SiApachehadoop, description: "Distributed storage and processing for huge datasets.", url: "https://hadoop.apache.org/" },
      { name: "Kafka", icon: SiApachekafka, description: "Event streaming between systems in real time.", url: "https://kafka.apache.org/" },
      { name: "ZeroMQ", icon: Network, description: "Lightweight messaging between processes.", url: "https://zeromq.org/" },
      { name: "Docker", icon: SiDocker, description: "Containers that run the same everywhere.", url: "https://www.docker.com/" },
      { name: "Kubernetes", icon: SiKubernetes, description: "Orchestrates containers at scale.", url: "https://kubernetes.io/" },
      { name: "n8n", icon: SiN8N, description: "Wires services together without hand-written glue code.", url: "https://n8n.io/" },
    ],
  },
  {
    title: "Hardware & Edge",
    color: "#f97316",
    reverse: true,
    tools: [
      { name: "Raspberry Pi", icon: SiRaspberrypi, description: "Small computer for robotics and embedded projects.", url: "https://www.raspberrypi.com/" },
      { name: "Raspberry Pi OS", icon: SiRaspberrypi, description: "Flashed onto Pi boards to run them headless.", url: "https://www.raspberrypi.com/software/" },
      { name: "Arduino", icon: SiArduino, description: "Microcontroller boards for sensors and actuators.", url: "https://www.arduino.cc/" },
      { name: "Arduino IDE", icon: SiArduino, description: "Flashes code onto Arduino boards.", url: "https://www.arduino.cc/en/software" },
      { name: "Arch Linux", icon: SiArchlinux, description: "My daily Linux distro. I like knowing what's on my system.", url: "https://archlinux.org/" },
    ],
  },
  {
    title: "Languages & Low-Level",
    color: "#38bdf8",
    reverse: true,
    tools: [
      { name: "C++", icon: SiCplusplus, description: "One of my first languages. Performance critical code and robotics, close to the hardware.", url: "https://isocpp.org/" },
      { name: "C", icon: SiC, description: "What's underneath everything else.", url: "https://en.wikipedia.org/wiki/C_(programming_language)" },
      { name: "Bash", icon: SiGnubash, description: "Shell scripting for automation and glue code.", url: "https://www.gnu.org/software/bash/" },
      { name: "Lua", icon: SiLua, description: "Lightweight scripting for config and embedding.", url: "https://www.lua.org/" },
      { name: "MicroPython", icon: SiMicropython, description: "Lean Python for running scripts on microcontrollers.", url: "https://micropython.org/" },
      { name: "YAML", icon: SiYaml, description: "Config format behind my build, CI, and infra setups.", url: "https://yaml.org/" },
      { name: "x86 Assembly", icon: Binary, description: "Low level programming to see what the CPU is doing.", url: "https://en.wikipedia.org/wiki/X86_assembly_language" },
      { name: "GCC", icon: SiGnu, description: "The compiler toolchain behind my C and C++ work.", url: "https://gcc.gnu.org/" },
      { name: "Valgrind", icon: Bug, description: "Catches memory leaks before they bite me.", url: "https://valgrind.org/" },
      { name: "CMake", icon: SiCmake, description: "Build system generator for C and C++ projects.", url: "https://cmake.org/" },
      { name: "GTK", icon: SiGtk, description: "GUI toolkit for desktop interfaces in C++.", url: "https://www.gtk.org/" },
    ],
  },
  {
    title: "Dev Environment",
    color: "#a3e635",
    reverse: true,
    tools: [
      { name: "Hyprland", icon: SiHyprland, description: "The window manager my whole desktop is built around.", url: "https://hyprland.org/" },
      { name: "Neovim", icon: SiNeovim, description: "My editor, configured to move as fast as I think.", url: "https://neovim.io/" },
      { name: "Tmux", icon: SiTmux, description: "Keeps terminal sessions organized across projects.", url: "https://github.com/tmux/tmux" },
      { name: "Ghostty", icon: SquareTerminal, description: "GPU accelerated terminal I run everything in.", url: "https://ghostty.org/" },
      { name: "VS Code", icon: Code2, description: "Mainly for running Jupyter notebooks.", url: "https://code.visualstudio.com/" },
      { name: "Git", icon: SiGit, description: "Version control.", url: "https://git-scm.com/" },
      { name: "Claude CLI", icon: SiClaude, description: "AI pair programmer for daily coding.", url: "https://www.anthropic.com/claude-code" },
      { name: "OpenCode", icon: Bot, description: "Open source AI coding agent, alongside Claude CLI.", url: "https://opencode.ai/" },
      { name: "Figma", icon: SiFigma, description: "Sketching UI ideas before writing any code.", url: "https://www.figma.com/" },
    ],
  },
];

// How fast a row scrolls, in pixels per second. Duration is derived from
// this so every row feels like the same speed regardless of how many
// tools (or how many copies) it has.
const PIXELS_PER_SECOND = 55;
const MIN_DURATION_S = 14;

function ToolChip({ tool, color }: { tool: Tool; color: string }) {
  const Icon = tool.icon;
  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      title={tool.description}
      className="tool-chip glass-card group relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl shrink-0 outline-none"
    >
      <span
        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: `${color}15`, border: `1px solid ${color}30` }}
      >
        <Icon size={16} style={{ color }} />
      </span>
      <span className="text-sm font-medium text-[#e2e8f0] whitespace-nowrap">{tool.name}</span>

      <div
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-56 rounded-lg border px-3 py-2 text-xs leading-relaxed opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity z-20 bg-[rgba(10,10,15,0.97)] backdrop-blur-xl"
        style={{ borderColor: `${color}40`, color: "#94a3b8" }}
      >
        {tool.description}
      </div>
    </a>
  );
}

interface Layout {
  mode: "static" | "marquee";
  repeat: number;
  period: number;
  duration: number;
}

const INITIAL_LAYOUT: Layout = { mode: "static", repeat: 2, period: 0, duration: 20 };

function MarqueeRow({ category }: { category: Category }) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Two hidden, unpadded measuring rows: one copy and two copies of the
  // same content. The exact seamless loop distance is the difference
  // between their widths, which correctly accounts for the gap between
  // repeated copies without guessing at it. Using scrollWidth differences
  // like this (rather than assuming "one copy's width" is the loop
  // distance) is what makes the animation land exactly back on a copy
  // boundary instead of visibly snapping each lap.
  const oneSetRef = useRef<HTMLDivElement>(null);
  const twoSetRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState<Layout>(INITIAL_LAYOUT);

  useEffect(() => {
    const measure = () => {
      const containerWidth = containerRef.current?.offsetWidth ?? 0;
      const oneSetWidth = oneSetRef.current?.scrollWidth ?? 0;
      const twoSetWidth = twoSetRef.current?.scrollWidth ?? 0;
      if (!containerWidth || !oneSetWidth || !twoSetWidth) return;

      // Everything fits on screen at once: don't animate, nothing to cycle.
      if (oneSetWidth <= containerWidth) {
        setLayout((prev) => (prev.mode === "static" ? prev : INITIAL_LAYOUT));
        return;
      }

      const period = twoSetWidth - oneSetWidth;
      if (period <= 0) return;

      // Repeat the set enough times that the visible window is always
      // covered by real content as it slides, so the loop never reveals
      // a gap at the trailing edge.
      const repeat = Math.max(2, Math.ceil(containerWidth / period) + 1);
      const duration = Math.max(MIN_DURATION_S, period / PIXELS_PER_SECOND);
      setLayout((prev) =>
        prev.mode === "marquee" && prev.repeat === repeat && prev.period === period
          ? prev
          : { mode: "marquee", repeat, period, duration }
      );
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const visibleTools =
    layout.mode === "static"
      ? category.tools
      : Array.from({ length: layout.repeat }, () => category.tools).flat();

  return (
    <div ref={containerRef} className="relative">
      <div className="flex items-center gap-2.5 mb-4 px-6">
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: category.color }} />
        <h3
          className="text-xs font-mono uppercase tracking-widest"
          style={{ color: category.color }}
        >
          {category.title}
        </h3>
      </div>

      {/* Hidden measuring rows (no padding, so they match the loop content exactly) */}
      <div
        ref={oneSetRef}
        aria-hidden="true"
        className="absolute -z-10 flex items-stretch gap-4"
        style={{ visibility: "hidden", top: 0, left: 0 }}
      >
        {category.tools.map((tool, i) => (
          <ToolChip key={`one-${tool.name}-${i}`} tool={tool} color={category.color} />
        ))}
      </div>
      <div
        ref={twoSetRef}
        aria-hidden="true"
        className="absolute -z-10 flex items-stretch gap-4"
        style={{ visibility: "hidden", top: 0, left: 0 }}
      >
        {[0, 1].flatMap((copy) =>
          category.tools.map((tool, i) => (
            <ToolChip key={`two-${copy}-${tool.name}-${i}`} tool={tool} color={category.color} />
          ))
        )}
      </div>

      <div className="marquee-mask overflow-hidden px-6">
        <div
          className={`flex items-stretch gap-4 ${
            layout.mode === "static"
              ? "flex-wrap justify-center"
              : `marquee-track ${category.reverse ? "marquee-reverse" : ""}`
          }`}
          style={
            layout.mode === "marquee"
              ? ({
                  animationDuration: `${layout.duration}s`,
                  "--marquee-end": `-${layout.period}px`,
                } as CSSProperties)
              : undefined
          }
        >
          {visibleTools.map((tool, i) => (
            <ToolChip key={`${tool.name}-${i}`} tool={tool} color={category.color} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Tools() {
  return (
    <FadeSection id="tools" className="py-20 md:py-28 bg-[#0d0d1a] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[rgba(0,245,212,0.04)] blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10 mb-12">
        <p className="font-mono text-sm text-[#00f5d4] tracking-widest mb-3">03 // TOOLS</p>
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          What I{" "}
          <span className="text-gradient-cyan">Build With</span>
        </h2>
        <p className="mt-4 text-[#64748b] text-base max-w-xl">
          Hover for what it is, click through to its site or repo.
        </p>
      </div>

      <div className="space-y-10">
        {categories.map((category) => (
          <MarqueeRow key={category.title} category={category} />
        ))}
      </div>
    </FadeSection>
  );
}
