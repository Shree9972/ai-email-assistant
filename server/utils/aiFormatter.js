const { convert } = require("html-to-text");

const cleanEmailBody = (html) => {
    if (!html) return "";

    // Remove HTML comments
    const withoutComments = html.replace(/<!--[\s\S]*?-->/g, "");

    // Convert HTML to text
    return convert(withoutComments, {
        wordwrap: false,
        selectors: [
            { selector: "a", options: { ignoreHref: true } }
        ]
    })
    .replace(/\s+/g, " ")
    .trim();
};


const prepareEmailsForAI = (emails) => {
    return emails.map(email => ({
        sender: email.sender || "Unknown",
        subject: email.subject || "No Subject",
        body: cleanEmailBody(email.body).slice(0, 5000),
        receivedAt: email.receivedAt,
    }));
};

module.exports = {
    prepareEmailsForAI,
};