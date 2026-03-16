import Groq from "groq-sdk";
import { z } from "zod";
import { personal } from "@/content/personal";
import { projects } from "@/content/projects";
import { experiences } from "@/content/experience";
import { coreSkills, skillCategories } from "@/content/skills";
import { achievements, leetcodeStats } from "@/content/achievements";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const messageSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant"]),
      content: z.string(),
    })
  ),
});

function buildSystemPrompt() {
  const projectList = projects
    .map(
      (p) =>
        `- ${p.title} (${p.subtitle}): ${p.description} | Stack: ${p.techStack.join(", ")} | GitHub: ${p.githubUrl}${p.liveUrl ? ` | Live: ${p.liveUrl}` : ""}`
    )
    .join("\n");

  const expList = experiences
    .map(
      (e) =>
        `- ${e.role} at ${e.company} (${e.startDate} - ${e.endDate}, ${e.location}): ${e.bullets.join(" | ")}`
    )
    .join("\n");

  const skillList = coreSkills
    .map((s) => `${s.name} (${s.level}%)`)
    .join(", ");

  const achList = achievements
    .map((a) => `- ${a.title} from ${a.org} (${a.date})`)
    .join("\n");

  return `You are an AI assistant representing ${personal.name}, a ${personal.role} based in ${personal.location}.

Your job is to answer questions about Anubhav professionally, helpfully, and concisely.
Always speak in third person about Anubhav (e.g., "Anubhav has..." not "I have...").
Keep responses short — 2 to 4 sentences max unless a detailed answer is truly needed.
Be friendly, confident, and professional. Never make up information.
If asked something outside this portfolio scope, politely say you can only answer questions about Anubhav's professional background.

=== ABOUT ===
${personal.about.join(" ")}

=== AVAILABILITY ===
${
    personal.available
      ? `${personal.name} is currently available for full-time roles and freelance projects.`
      : "Not currently available."
  }

=== CORE SKILLS ===
${skillList}

=== ALL SKILLS ===
${skillCategories
    .map((c) => `${c.label}: ${c.skills.map((s) => s.name).join(", ")}`)
    .join("\n")}

=== PROJECTS ===
${projectList}

=== EXPERIENCE ===
${expList}

=== ACHIEVEMENTS ===
${achList}
LeetCode: ${leetcodeStats.solved} problems solved (Easy: ${leetcodeStats.easy}, Medium: ${leetcodeStats.medium}, Hard: ${leetcodeStats.hard}), Global Rank #${leetcodeStats.rank}, ${leetcodeStats.streak} day streak.

=== CONTACT ===
Location: ${personal.location}
GitHub: ${personal.name.toLowerCase().replace(" ", "")}`;
}

export async function POST(request) {
  try {
    const body = await request.json();

    // Validate input
    const result = messageSchema.safeParse(body);
    if (!result.success) {
      return Response.json(
        { success: false, error: "Invalid request format" },
        { status: 400 }
      );
    }

    const { messages } = result.data;

    if (messages.length === 0) {
      return Response.json(
        { success: false, error: "No messages provided" },
        { status: 400 }
      );
    }

    // Filter out the initial canned assistant greeting
    // Only keep real conversation messages
    const conversationMessages = messages.filter((m, index) => {
      if (index === 0 && m.role === "assistant") return false;
      return true;
    });

    if (conversationMessages.length === 0) {
      return Response.json(
        { success: false, error: "No user messages found" },
        { status: 400 }
      );
    }

    // Groq uses OpenAI-compatible format — system + messages array
    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: buildSystemPrompt(),
        },
        ...conversationMessages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    const text =
      response.choices[0]?.message?.content ||
      "Sorry, I could not generate a response.";

    return Response.json(
      { success: true, message: text },
      { status: 200 }
    );
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json(
      {
        success: false,
        error: error.message || "Failed to get response",
      },
      { status: 500 }
    );
  }
}