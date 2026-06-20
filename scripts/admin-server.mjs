import { createServer } from "node:http";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const COURSES_PATH = path.join(__dirname, "..", "data", "courses.json");
const PORT = 4545;

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

async function readCourses() {
  try {
    return JSON.parse(await readFile(COURSES_PATH, "utf-8"));
  } catch {
    return [];
  }
}

function renderPage(courses, message) {
  const rows = courses
    .map(
      (c, i) => `<tr>
        <td>${escapeHtml(c.courseNumber)}</td>
        <td>${escapeHtml(c.name ?? "")}</td>
        <td>${escapeHtml(c.school ?? "")}</td>
        <td><a href="${escapeHtml(c.link)}" target="_blank">${escapeHtml(c.link)}</a></td>
        <td>${escapeHtml(c.description)}</td>
        <td><form method="POST" action="/delete" style="margin:0"><input type="hidden" name="index" value="${i}"><button type="submit">Remove</button></form></td>
      </tr>`
    )
    .join("\n");

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Course Admin (local only)</title>
<style>
  body { font-family: system-ui, sans-serif; max-width: 720px; margin: 40px auto; padding: 0 20px; background: #0a0a0f; color: #e2e8f0; }
  h1 { color: #00f5d4; font-size: 20px; }
  p.hint { color: #64748b; font-size: 13px; }
  form.add { display: flex; flex-direction: column; gap: 10px; margin: 24px 0; padding: 16px; border: 1px solid #1e293b; border-radius: 8px; }
  input, textarea { background: #11141a; border: 1px solid #1e293b; color: #e2e8f0; padding: 8px 10px; border-radius: 6px; font-family: inherit; font-size: 14px; }
  button { background: #00f5d4; color: #0a0a0f; border: none; padding: 8px 14px; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 13px; }
  table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 13px; }
  td { border-bottom: 1px solid #1e293b; padding: 8px; vertical-align: top; }
  a { color: #00f5d4; }
  .msg { color: #00f5d4; font-size: 13px; }
</style>
</head>
<body>
  <h1>Course Admin — local only</h1>
  <p class="hint">This page only runs on your machine via "npm run admin". It is never part of the deployed static site, so visitors can't reach or use it.</p>
  ${message ? `<p class="msg">${escapeHtml(message)}</p>` : ""}
  <form class="add" method="POST" action="/add">
    <label>Course number<input name="courseNumber" placeholder="e.g. EN.601.482" required></label>
    <label>Course name<input name="name" placeholder="e.g. Machine Learning: Deep Learning" required></label>
    <label>School<input name="school" placeholder="e.g. Johns Hopkins University" required></label>
    <label>Link<input name="link" type="url" placeholder="https://..." required></label>
    <label>What I did in the course<textarea name="description" rows="3" placeholder="Built ... / Learned ..." required></textarea></label>
    <button type="submit">Add course</button>
  </form>
  <table>${rows}</table>
</body>
</html>`;
}

const server = createServer(async (req, res) => {
  if (req.method === "GET" && req.url === "/") {
    const courses = await readCourses();
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(renderPage(courses, ""));
    return;
  }

  if (req.method === "POST" && (req.url === "/add" || req.url === "/delete")) {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const body = new URLSearchParams(Buffer.concat(chunks).toString());
    const courses = await readCourses();

    let message = "";
    if (req.url === "/add") {
      courses.push({
        courseNumber: body.get("courseNumber")?.trim() ?? "",
        name: body.get("name")?.trim() ?? "",
        school: body.get("school")?.trim() ?? "",
        link: body.get("link")?.trim() ?? "",
        description: body.get("description")?.trim() ?? "",
      });
      message = "Course added. Restart your dev server (or rebuild) to see it on the site.";
    } else {
      const index = Number(body.get("index"));
      if (!Number.isNaN(index)) courses.splice(index, 1);
      message = "Course removed.";
    }

    await writeFile(COURSES_PATH, JSON.stringify(courses, null, 2) + "\n");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(renderPage(courses, message));
    return;
  }

  res.writeHead(404);
  res.end("Not found");
});

server.listen(PORT, () => {
  console.log(`Course admin running at http://localhost:${PORT} (local only — not part of the deployed site)`);
});
