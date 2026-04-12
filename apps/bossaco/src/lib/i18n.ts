import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`@bossa/i18n/messages/${locale}.json`)).default,
}));
