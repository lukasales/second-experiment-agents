interface EmailMessage {
  to: string;
  subject: string;
  text: string;
}

interface NotificationMailer {
  sendEmail: (message: EmailMessage) => Promise<void>;
}

const createNotificationMailer = (): NotificationMailer => {
  return {
    sendEmail: async (message: EmailMessage): Promise<void> => {
      // Development-safe transport: logs outbound email content instead of requiring SMTP.
      console.log("[notifications] Email dispatch");
      console.log(`To: ${message.to}`);
      console.log(`Subject: ${message.subject}`);
      console.log(message.text);
    },
  };
};

export type { EmailMessage, NotificationMailer };
export { createNotificationMailer };
