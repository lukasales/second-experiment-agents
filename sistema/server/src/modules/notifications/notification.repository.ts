import { promises as fs } from "node:fs";
import path from "node:path";
import { DailyNotification } from "../../shared/types/domain";

const notificationsDataFilePath = path.resolve(process.cwd(), "data", "notifications.json");

const ensureNotificationsDataFile = async (): Promise<void> => {
  try {
    await fs.access(notificationsDataFilePath);
  } catch {
    await fs.mkdir(path.dirname(notificationsDataFilePath), { recursive: true });
    await fs.writeFile(notificationsDataFilePath, "[]\n", "utf-8");
  }
};

const readNotificationsFromFile = async (): Promise<DailyNotification[]> => {
  await ensureNotificationsDataFile();

  const rawFileContent = await fs.readFile(notificationsDataFilePath, "utf-8");
  const parsedContent = JSON.parse(rawFileContent) as unknown;

  if (!Array.isArray(parsedContent)) {
    throw new Error("Invalid notifications data format.");
  }

  return parsedContent as DailyNotification[];
};

const writeNotificationsToFile = async (
  notifications: DailyNotification[]
): Promise<void> => {
  await fs.writeFile(
    notificationsDataFilePath,
    `${JSON.stringify(notifications, null, 2)}\n`,
    "utf-8"
  );
};

const listNotifications = async (): Promise<DailyNotification[]> => {
  return readNotificationsFromFile();
};

const saveNotifications = async (
  notifications: DailyNotification[]
): Promise<void> => {
  await writeNotificationsToFile(notifications);
};

export { listNotifications, saveNotifications };
