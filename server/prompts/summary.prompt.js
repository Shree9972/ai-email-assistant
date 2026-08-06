const buildSummaryPrompt = async (emails) => {
    
    const emailContents = emails.map(email => `From: ${email.sender}\nSubject: ${email.subject}\nBody: ${email.body}`).join('\n\n');

    const prompt = `
        You are an AI email assistant.

        Your task is to summarize today's emails into a clear, concise overview.

        Focus on:
        - Important conversations
        - Deadlines
        - Meetings
        - Action items

        Guidelines:
        - Ignore repetitive signatures, disclaimers, and unnecessary greetings.
        - Ignore promotional job digests unless they contain unique or high-value opportunities.
        - Group similar automated emails (e.g., newsletters, notifications, job alerts) together instead of summarizing each individually.
        - Highlight only information that requires attention or action.
        - Prioritize urgent or time-sensitive items.
        - Keep the summary concise, with a target length of 150 – 200 words.

        Here are the emails:

        ${emailContents}

        Provide a well-structured summary of the key points, organized with short bullet points or sections where appropriate.
        `;


        return prompt;
}

module.exports = {
    buildSummaryPrompt,
};