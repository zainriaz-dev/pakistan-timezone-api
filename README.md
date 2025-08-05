# 🇵🇰 Pakistan Timezone API

Real-time Pakistan Standard Time (PKT) API with unlimited requests. Built with Next.js 15, TypeScript, and Luxon.

## 🚀 Features

- **🇵🇰 Pakistan Focused** - Dedicated to Pakistan Standard Time (PKT)
- **♾️ Unlimited Requests** - No rate limiting, use as much as you want
- **⏰ Real-time Updates** - Auto-refreshes every 30 seconds
- **📱 Multiple Formats** - Simple and detailed response formats
- **🌐 CORS Enabled** - Works from any domain
- **⚡ Fast Response** - Sub-100ms response times with 1-second caching

## 📋 API Endpoint

| Endpoint | Description | Example |
|----------|-------------|---------|
| `/api/pakistan-timezone` | Pakistan Standard Time with detailed info | `GET /api/pakistan-timezone?format=json` |
| `/api/pakistan-timezone?simple=true` | Simple, clean Pakistan time | `GET /api/pakistan-timezone?simple=true` |

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🌐 Deployment

### Vercel (Recommended - Free Forever)

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Follow the prompts:**
   - Login to Vercel account
   - Link to existing project or create new
   - Deploy automatically

### Alternative Free Platforms

#### Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

#### Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway up
```

#### Render
1. Connect your GitHub repository
2. Create new Web Service
3. Select your repository
4. Deploy automatically

## 🔧 Environment Variables

No environment variables required! The API works out of the box.

## 📊 Response Formats

### Simple Response (Recommended)
```bash
GET /api/pakistan-timezone?simple=true
```

```json
{
  "time": "09:46:46 PM",
  "time_24h": "21:46:46",
  "date": "Tuesday, August 05, 2025",
  "timezone": "PKT",
  "offset": "UTC+5",
  "country": "Pakistan",
  "city": "Lahore"
}
```

### Detailed Response
```bash
GET /api/pakistan-timezone
```

```json
{
  "country_info": {
    "name": "Pakistan",
    "code": "PK",
    "current_region": {"name": "Punjab", "type": "Province"},
    "current_city": "Lahore"
  },
  "timezone_info": {
    "name": "Asia/Karachi",
    "abbreviation": "PKT",
    "offset_hours": 5,
    "description": "Pakistan Standard Time (PKT)",
    "dst_observed": false
  },
  "current_time": {
    "date": "Tuesday, August 05, 2025",
    "time_12h": "09:46:46 PM",
    "time_24h": "21:46:46",
    "timezone": "PKT",
    "day_of_week": "Tuesday",
    "unix_timestamp": 1743966406
  },
  "meta": {
    "generated_at": "2025-08-05T16:46:46.123Z",
    "timezone_source": "Built-in Pakistan Standard Time"
  }
}
```

### Text Response
```bash
GET /api/pakistan-timezone?format=text
```

```
🇵🇰 PAKISTAN STANDARD TIME
========================

📍 Location: Lahore, Punjab, Pakistan
🌍 Region Type: Province
⏰ Timezone: PKT (UTC+5)

📅 CURRENT TIME
=============
📆 Date: Tuesday, August 05, 2025
🕐 Time (12-hour): 09:46:46 PM
🕐 Time (24-hour): 21:46:46

🏛️ ADMINISTRATIVE INFORMATION
==========================
🔹 Regions: Islamabad, Punjab, Sindh, Khyber Pakhtunkhwa, Balochistan, Gilgit-Baltistan, Azad Kashmir
🔸 Major Cities: Karachi, Lahore, Faisalabad, Rawalpindi, Gujranwala, Peshawar, Multan, Hyderabad, Islamabad, Quetta

🚀 Pakistan Time Service v2.0
```

## 🔗 Quick Start Examples

### cURL
```bash
# Get simple Pakistan time
curl "https://your-domain.vercel.app/api/pakistan-timezone?simple=true"

# Get detailed Pakistan time
curl "https://your-domain.vercel.app/api/pakistan-timezone"

# Get text format
curl "https://your-domain.vercel.app/api/pakistan-timezone?format=text"
```

### JavaScript
```javascript
// Get simple Pakistan time
const response = await fetch('https://your-domain.vercel.app/api/pakistan-timezone?simple=true');
const data = await response.json();
console.log(data.time); // "09:46:46 PM"
console.log(data.date); // "Tuesday, August 05, 2025"
console.log(data.timezone); // "PKT"
```

### Python
```python
import requests

# Get simple Pakistan time
response = requests.get('https://your-domain.vercel.app/api/pakistan-timezone?simple=true')
data = response.json()
print(data['time'])  # "09:46:46 PM"
print(data['country'])  # "Pakistan"
```

## 🎯 Use Cases

- **🇵🇰 Pakistani Applications** - Get accurate Pakistan time
- **🌍 International Apps** - Pakistan timezone conversion
- **📱 Mobile Apps** - Real-time Pakistan time display
- **🌐 Websites** - Pakistan time widget
- **📊 Analytics** - Pakistan time-based data
- **🎓 Educational** - Learn about Pakistan timezone

## 📈 Performance

- **Response Time:** < 100ms average
- **Uptime:** 99.9%+ (Vercel infrastructure)
- **Global CDN:** Edge locations worldwide
- **Caching:** 1-second cache for performance
- **Requests:** Unlimited (no rate limiting)

## 🏛️ Pakistan Information

### Administrative Regions
- **Islamabad** - Capital Territory
- **Punjab** - Province
- **Sindh** - Province
- **Khyber Pakhtunkhwa** - Province
- **Balochistan** - Province
- **Gilgit-Baltistan** - Administrative Territory
- **Azad Kashmir** - Administrative Territory

### Major Cities
- Karachi, Lahore, Faisalabad, Rawalpindi, Gujranwala
- Peshawar, Multan, Hyderabad, Islamabad, Quetta

### Timezone Details
- **Standard Time:** PKT (Pakistan Standard Time)
- **UTC Offset:** +5 hours
- **DST:** Not observed
- **IANA Timezone:** Asia/Karachi

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - Feel free to use in any project!

## 🙏 Acknowledgments

- Built with [Next.js 15](https://nextjs.org/)
- Timezone handling with [Luxon](https://moment.github.io/luxon/)
- Hosted on [Vercel](https://vercel.com/)
- 🇵🇰 Dedicated to Pakistan

---

Made with ❤️ for Pakistan and developers worldwide
