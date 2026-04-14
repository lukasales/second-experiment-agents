function parsePort(value?: string): number {
  if (!value) {
    return 3001;
  }

  const parsed = Number(value);

  if (Number.isNaN(parsed) || parsed <= 0) {
    return 3001;
  }

  return parsed;
}

export const env = {
  port: parsePort(process.env.PORT),
  clientOrigin: process.env.CLIENT_ORIGIN ?? "http://localhost:5173",
};