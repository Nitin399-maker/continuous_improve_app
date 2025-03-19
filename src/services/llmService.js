// src/services/llmService.js

import axios from 'axios';

const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const OPENAI_API_URL = 'https://llmfoundry.straive.com/openai/v1/chat/completions';

export const cleanCodeResponse = (response) => {
  // Remove Markdown code block wrappers and any leading/trailing whitespace
  return response.replace(/```html|```/g, '').trim();
};


export const generateCode = async (description) => {
const prompt = `Generate a complete frontend application that is self-contained HTML document with all styles and scripts included inline. Do not separate the code into multiple files (e.g., no external CSS or JavaScript files). The entire webpage should be within a single HTML file, using <style> for CSS and <script> for JavaScript inside the <head> or <body> as appropriate. Ensure the document is functional, properly structured, and formatted for direct rendering in a browser.
Provide the full code as a single self-contained HTML document.
  }.
  
Description:
${description}
`;

  const response = await axios.post(
    OPENAI_API_URL,
    {
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      max_tokens: 1500,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
    }
  );

  const code = response.data.choices[0].message.content;
  return cleanCodeResponse(code);
};


export const improveCode = async (existingCode, improvement) => {
  const prompt = `Here is the existing frontend code:

${existingCode}

The user has requested the following improvements:

${improvement}

Provide the fully updated frontend application code as a complete, self-contained HTML document. The generated code must include all styles and scripts inline, ensuring the entire implementation is contained within a single HTML file.  
**Do not use placeholders** like \`/* ...existing styles... */\` or \`<!-- existing code -->\`. The generated code must be **complete** with all necessary elements included.  
Do not summarize, reference, or output only the changes—generate the **entire updated version from scratch** based on the requested improvements.  
Ensure the document is **fully functional**, properly structured, and formatted for direct rendering in a browser. All CSS should be placed inside a <style> tag, and all JavaScript should be included within a <script> tag in the same file.  
Return only the updated HTML code—do not include explanations or additional text. The output should be a **fully operational webpage** with all requested updates applied.`;
;


  const response = await axios.post(
    OPENAI_API_URL,
    {
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      max_tokens: 1500,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
    }
  );

  const refinedCode = response.data.choices[0].message.content;
  return cleanCodeResponse(refinedCode);
};


