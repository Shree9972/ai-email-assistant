const prepareEmailsForAI = (emails) => {

    return emails.map(email => ({
        sender: email.from,
        subject: email.subject,
        body: email.body,
        receivedAt: email.receivedAt,
    }));
}

module.exports = {
    prepareEmailsForAI,
};