import { TelegramAdmin } from "@/components/telegram-admin";
import { botStatus } from "@/lib/telegram";

export default async function AdminTelegramPage() {
  return <TelegramAdmin initial={await botStatus()} />;
}
