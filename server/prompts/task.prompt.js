const buildTaskPrompt = (preparedEmails) => {

    const emailContents = preparedEmails.map(email => {
        return `Subject: ${email.subject}\nFrom: ${email.sender}\nBody: ${email.body}.join("\n\n")`;
    });

    

    
    const prompt =   `
        You are an AI email assistant.

        Your task is to analyze emails and extract every actionable task mentioned in them.

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

        Here are the emails:

        ${emailContents}

        `;



    return prompt;
};


module.exports = {
    buildTaskPrompt,
}
