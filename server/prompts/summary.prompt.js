const buildSummaryPrompt = async (emails) => {
    
    const emailContents = emails.map(email => `From: ${email.sender}\nSubject: ${email.subject}\nBody: ${email.body}`).join('\n\n');

    const prompt = `
            You are an AI email assistant.

            Your task is to summarize today's emails.

            Focus on:
            - Important conversations
            - Deadlines
            - Meetings
            - Action items

            Ignore repetitive signatures and unnecessary greetings.

            Here are the emails:

            ${emailContents}

            Provide a concise summary of the key points.
            `;

        return prompt;
}

module.exports = {
    buildSummaryPrompt,
};