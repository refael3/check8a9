const axios = require('axios');

export default async function handler(req, res) {
  const redditUrl = `https://www.reddit.com${req.url.replace('/api/proxy', '')}`;

  try {
    // שלח בקשה ל-Reddit
    const response = await axios.get(redditUrl);

    // החזר את הנתונים ללקוח
    res.status(200).json(response.data);
  } catch (error) {
    // אם קרתה שגיאה, החזר את השגיאה ללקוח
    res.status(500).json({ error: 'Error fetching data from Reddit' });
  }
}
