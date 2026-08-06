const buildReplyRequiredPrompt = (preparedEmails) => {

    const emailContents = preparedEmails.map(email => `From: ${email.sender}\nSubject: ${email.subject}\nBody: ${email.body}`).join('\n\n');


    const prompt = `
    You are an AI email assistant.

    Your task is to analyze emails and identify which emails require a response from the user.

    A reply is required only when the sender expects the user to send a response, confirmation, decision, clarification, or information.

    Consider an email as requiring a reply when:
    - Someone asks a direct question.
    - Someone requests information from the user.
    - Someone asks for confirmation or approval.
    - Someone requires the user to choose an option or provide feedback.
    - Someone is waiting for a decision or response.
    - A conversation requires the user's participation.

    Do NOT mark an email as requiring a reply when:
    - It is a newsletter.
    - It is promotional or marketing content.
    - It is an automated notification.
    - It is a receipt, invoice, or confirmation with no response needed.
    - It is a job digest without a direct request.
    - It only contains information or updates.
    - It has a "reply" button but does not actually need a response.

    For every email requiring a reply, extract:

    - subject: The email subject.
    - sender: The person or organization who sent the email.
    - reason: A short explanation of why a reply is needed.
    - replyType:
    - QUESTION: Sender asked a question.
    - REQUEST: Sender requested information or action through a reply.
    - CONFIRMATION: Sender needs confirmation.
    - APPROVAL: Sender needs approval or decision.
    - FOLLOW_UP: A previous conversation requires a response.

    - priority:
    - HIGH: Urgent replies, deadlines, important decisions.
    - MEDIUM: Requires attention but not urgent.
    - LOW: General replies without urgency.

    - deadline:
    - Extract only if explicitly mentioned.
    - Use YYYY-MM-DD format.
    - Otherwise return null.

    Important rules:
    - Only extract replies that are genuinely required.
    - Do not invent conversations or requests.
    - Do not assume a reply is needed.
    - Ignore signatures, disclaimers, and automated footer text.
    - Return only valid JSON.
    - Do not include markdown.
    - Do not include explanations.

    Return exactly this format:

    {
    "replyRequired": [
        {
        "subject": "string",
        "sender": "string",
        "reason": "string",
        "replyType": "QUESTION | REQUEST | CONFIRMATION | APPROVAL | FOLLOW_UP",
        "priority": "HIGH | MEDIUM | LOW",
        "deadline": "YYYY-MM-DD or null"
        }
    ]
    }

    If no emails require a reply, return:

    {
    "replyRequired": []
    }

    Here are the emails:

    ${emailContents}
    `;

    return prompt;
};


module.exports = {
    buildReplyRequiredPrompt,
};