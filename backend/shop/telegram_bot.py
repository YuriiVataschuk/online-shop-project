from telegram import Bot
import asyncio

async def send_telegram_message(chat_id, text, token):
    bot = Bot(token=token)
    await bot.send_message(chat_id=chat_id, text=text)

