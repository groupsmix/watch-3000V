import { remark } from "remark";
import html from "remark-html";

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(html, { sanitize: false }).process(markdown);
  return result.toString();
}

// Extract JSON-LD schema from markdown content
export function extractSchema(content: string): string | null {
  const jsonMatch = content.match(/```json\s*\n([\s\S]*?)\n```/);
  if (jsonMatch) {
    return jsonMatch[1].trim();
  }
  return null;
}

// Extract comparison table from markdown
export interface TableRow {
  cells: string[];
}

export interface Table {
  headers: string[];
  rows: TableRow[];
}

export function extractTable(content: string): Table | null {
  const lines = content.split("\n");
  let headerLine = -1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith("|") && line.endsWith("|")) {
      const nextLine = lines[i + 1]?.trim();
      if (nextLine && /^\|[\s-|]+\|$/.test(nextLine)) {
        headerLine = i;
        break;
      }
    }
  }

  if (headerLine === -1) return null;

  const headers = lines[headerLine]
    .split("|")
    .filter((c) => c.trim())
    .map((c) => c.trim());

  const rows: TableRow[] = [];
  for (let i = headerLine + 2; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line.startsWith("|")) break;
    const cells = line
      .split("|")
      .filter((c) => c.trim())
      .map((c) => c.trim());
    if (cells.length > 0) {
      rows.push({ cells });
    }
  }

  return { headers, rows };
}

// Extract pros and cons from markdown
export function extractProsAndCons(
  content: string
): { pros: string[]; cons: string[] } | null {
  const prosMatch = content.match(
    /(?:\*\*Pros|###?\s*Pros|What We Love)[:\s]*\n([\s\S]*?)(?=\*\*Cons|###?\s*Cons|What We Don|---|$)/i
  );
  const consMatch = content.match(
    /(?:\*\*Cons|###?\s*Cons|What We Don't Love)[:\s]*\n([\s\S]*?)(?=---|###?\s|$)/i
  );

  if (!prosMatch && !consMatch) return null;

  const extractList = (text: string | undefined): string[] => {
    if (!text) return [];
    return text
      .split("\n")
      .filter((line) => line.trim().startsWith("-") || line.trim().startsWith("*"))
      .map((line) => line.replace(/^[\s*-]+/, "").trim())
      .filter(Boolean);
  };

  return {
    pros: extractList(prosMatch?.[1]),
    cons: extractList(consMatch?.[1]),
  };
}

// Remove frontmatter, comments, and schema from content for display
export function cleanContent(content: string): string {
  return content
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/```json[\s\S]*?```/g, "")
    .replace(/\*\*Internal Links on This Page:\*\*[\s\S]*$/i, "")
    .trim();
}
