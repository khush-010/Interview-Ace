import dotenv from 'dotenv';
dotenv.config();


const uploadDatatoAi = async (resumeData, experienceLevel, jobTitle) => {
  const {
    work_experience = [],
    projects = [],
    skills = [],
    education = [],
  } = resumeData || {};

  const formattedResume = [
    ...work_experience.map(exp => `Worked as ${exp.title ?? 'N/A'} at ${exp.company ?? 'N/A'} from ${exp.start_date ?? 'N/A'} to ${exp.end_date ?? 'N/A'}`),
    ...projects.map(proj => `Project: ${proj.title ?? 'N/A'} - ${proj.description ?? 'N/A'} [Tech: ${proj.technologies ?? 'N/A'}]`),
    ...skills.map(skill => `Skill: ${skill ?? 'N/A'}`),
    ...education.map(edu => `Education: ${edu.title ?? 'N/A'} at ${edu.institute ?? 'N/A'} (${edu.start_date ?? 'N/A'} - ${edu.end_date ?? 'N/A'})`),
  ];

  const cleanFormattedResume = formattedResume.filter(item => item && item.trim() !== '' && !item.includes('N/A - N/A'));


  const promptText = `You are an AI mock interviewer designed to simulate real-world technical and behavioral interviews for job applicants.

You will generate a JSON object containing a list of interview questions. The JSON must be valid and parsable. Do NOT include any text outside of the JSON. Each question will have a "type", "question" and "expected_answer_keywords" field.


Job Role: ${jobTitle}
Experience Level: ${experienceLevel}
Resume Highlights:
${cleanFormattedResume.length > 0 ? cleanFormattedResume.map((item) => `- ${item}`).join("\n") : "- No specific resume highlights provided."}

Here is the JSON schema:
{
  "questions": [
    {
      "type": "string",  // e.g., "technical", "scenario", "behavioral", "role_specific", "curveball"
      "question": "string", // The interview question
      "expected_answer_keywords": ["string", "string", ...] // A list of keywords to look for in the answer
    }
  ]
}

Don't ask similar and repetitive questions. Ensure a good mix of question types and topics.
Generate a mock interview with 10 questions in JSON format:
- 3 Technical questions based on relevant tools, languages, or frameworks mentioned.
- 2 Scenario-based questions related to the projects or responsibilities listed.
- 2 Behavioral questions that assess soft skills, communication, and teamwork.
- 2 Role-specific questions aligned with industry expectations for the job title.
- 1 Curveball question to assess critical thinking or creativity.
Return the JSON object only, without any additional text or explanation.
`;

  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: promptText
              }
            ]
          }
        ]
      }),
    });

    const data = await response.json();
    let text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    const jsonMatch = text.match(/```json([\s\S]*?)```/);
    if (jsonMatch) {
      text = jsonMatch[1].trim();
    }
    try {
      return JSON.parse(text);
    } catch (e) {
      console.error("Failed to parse AI response:", e);
      return { error: "Invalid JSON returned by Gemini" };
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return { error: "Request to Gemini failed" };
  }
};

const evaluateAnswerWithGemini = async ({ userAnswer, question }) => {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY; // replace with env var in production
  if (!apiKey) {
    console.error("GEMINI_API_KEY is not set");
    return 0; // Default score if API key is missing
  }
  const prompt = `  
You are a professional interviewer. Evaluate the following candidate answer based on relevance, depth, accuracy, and clarity.

Question: ${question.question}
Expected Keywords: ${question.expected_answer_keywords}
User Answer: ${userAnswer}

Score the answer from 0 to 10 (just output the number).
  `;

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    }),
  });

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '0';
  const numericScore = parseFloat(text.match(/\d+/)?.[0] || '0');
  return numericScore;
};


export { uploadDatatoAi, evaluateAnswerWithGemini };

