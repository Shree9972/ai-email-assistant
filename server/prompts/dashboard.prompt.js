const buildDashboardPrompt = (emails) => {

    const emailContents = emails.map(email => `From: ${email.sender}\nSubject: ${email.subject}\nBody: ${email.body}`).join('\n\n');

    const prompt = `
    You are an AI email assistant.

    You have three tasks to perform . I will provide you with a list of emails and you will need to do the following:

    1. Summarize the emails with following guidelines:   
    
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
        
    2.Extract tasks from the emails with following guidelines:
    
        A task is any item that requires the user to take an action, such as:
        - Replying to an email
        - Completing a survey
        - Submitting an assignment or document
        - Registering for an event
        - Attending a meeting
        - Reviewing or approving something
        - Completing any requested follow-up activity

        Do not consider the following as tasks:
        - Newsletter updates
        - Promotional content
        - Job digests unless they contain a specific opportunity requiring user action
        - General announcements that do not require a response or action
        - Informational emails without any required next step
        - Email signatures, disclaimers, and greetings

        For every actionable task, extract:
        - The task description
        - The email subject
        - The sender
        - The deadline (if explicitly mentioned, otherwise use null)
        - The priority level:
        - HIGH: Urgent tasks, strict deadlines, or important commitments
        - MEDIUM: Tasks that require attention but are not urgent
        - LOW: Non-urgent tasks or optional activities

        Important rules:
        - Extract only tasks explicitly mentioned in the emails.
        - Do not assume or create deadlines that are not provided.
        - Do not generate tasks from general information.
        - Group similar tasks from automated emails when appropriate.
        - Return only valid JSON.
        - Do not include markdown formatting.
        - Do not wrap the response in json fences.
        - Do not add explanations before or after the JSON.

        Return the response exactly in this format:

        {
        "tasks": [
            {
            "task": "string",
            "subject": "string",
            "sender": "string",
            "deadline": "YYYY-MM-DD or null",
            "priority": "HIGH | MEDIUM | LOW"
            }
        ]
        }

        If no actionable tasks exist, return:

        {
        "tasks": []
        }

    3.Extract emails that require a reply with following guidelines:
    
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

    Now at last you have to return a JSON object with the following structure:

    {
        "summary": "...",

        "tasks": [
            ...
        ],

        "replyRequired": [
            ...
        ]
    }

    Here are the emails:

    ${emailContents}
    
    `;

    return prompt;
}

module.exports = {
    buildDashboardPrompt,
};