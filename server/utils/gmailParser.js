
const getHeader = (headers, headerName) => {
    return headers.find(
        header => header.name === headerName
    )?.value || "";
};

const extractBody = (payload) => {

    if (payload.body && payload.body.data) {
        return Buffer.from(payload.body.data, "base64").toString("utf-8");
    }

    // Recursive Case
    if (payload.parts) {

        for (const part of payload.parts) {

            const body = extractBody(part);

            if (body) {
                return body;
            }
        }
    }

    return "";
};

const extractAttachments = (payload , attachments = []) => {

    if(payload.filename && payload.body && payload.body.attachmentId) {

        attachments.push({
            filename: payload.filename,
            mimeType: payload.mimeType,
            attachmentId: payload.body.attachmentId,
        });

    }

    if(payload.parts) 
    {

        for(const part of payload.parts) 
        {

            extractAttachments(part , attachments);
        }
    }

    return attachments;

};

const parseGmailMessage = (message) => {

    const headers = message.payload.headers;

    const subject = getHeader(headers, "Subject");

    const sender = getHeader(headers, "From");

    const recipients = getHeader(headers, "To");

    const body = extractBody(message.payload);

    let attachments = [];

    if (message.payload.parts) {
        attachments = extractAttachments(message.payload);
    }

    return {

        gmailId: message.id,

        threadId: message.threadId,

        subject,

        sender,

        recipients,

        body,

        snippet: message.snippet,

        receivedAt: new Date(Number(message.internalDate)),

        labels: message.labelIds,

        hasAttachments: attachments.length > 0,

        attachments,

    };

};

module.exports = {
    parseGmailMessage,
};