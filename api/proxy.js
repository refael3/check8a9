export default async function handler(req, res) {
  const { method, url, headers, body } = req;

  // כתובת ה-API היעד (החלף בכתובת האמיתית שאליה אתה מעוניין להעביר את הבקשות)
  const targetUrl = nextjs-boilerplate-tau-bice-37.vercel.app + url.replace('/api/proxy', '');

  // העברת הבקשה ל-API היעד
  const response = await fetch(targetUrl, {
    method,
    headers: {
      ...headers,
      host: new URL(targetUrl).host, // לעיתים נדרש לשנות את הכותרת Host בהתאם לשרת
    },
    body: method !== 'GET' && body ? JSON.stringify(body) : undefined,
  });

  // קבלת התשובה ושליחתה חזרה ללקוח
  const data = await response.json();
  res.status(response.status).json(data);
}
