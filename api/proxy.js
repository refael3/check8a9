<!DOCTYPE html>
<html dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>Reddit Viewer</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background: #f0f2f5;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        #content {
            width: 100%;
            min-height: 500px;
            border: 1px solid #ddd;
            margin-top: 20px;
            background: white;
        }
        .input-group {
            margin: 20px 0;
        }
        input {
            padding: 8px;
            margin-left: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            width: 300px;
        }
        .button {
            background: #0079d3;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
        }
        .button:hover {
            background: #005fa3;
        }
        .loading {
            text-align: center;
            padding: 20px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>צפיין Reddit</h1>
        <div class="input-group">
            <input type="text" id="subreddit" placeholder="הכנס שם של subreddit (לדוגמה: 'programming')" />
            <button class="button" onclick="loadReddit()">טען</button>
        </div>
        <div id="content" class="loading">התוכן יוצג כאן</div>
    </div>

    <script>
        async function loadReddit() {
            const content = document.getElementById('content');
            const subreddit = document.getElementById('subreddit').value;
            content.innerHTML = 'טוען...';
            
            try {
                // שימוש בשרת הפרוקסי הספציפי שלך
                const proxyUrl = `https://nextjs-boilerplate-tau-bice-37.vercel.app/api/proxy`;
                let redditUrl = 'https://www.reddit.com/';
                
                if (subreddit) {
                    redditUrl += `r/${subreddit}`;
                }
                
                const response = await fetch(proxyUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ url: redditUrl })
                });

                if (!response.ok) {
                    throw new Error('שגיאה בטעינת התוכן');
                }
                
                const data = await response.text();
                
                // הצגת התוכן
                const iframe = document.createElement('iframe');
                iframe.style.width = '100%';
                iframe.style.height = '800px';
                iframe.style.border = 'none';
                
                content.innerHTML = '';
                content.appendChild(iframe);
                
                // הזרקת התוכן ל-iframe
                iframe.contentDocument.open();
                iframe.contentDocument.write(data);
                iframe.contentDocument.close();
                
            } catch (error) {
                content.innerHTML = `שגיאה: ${error.message}`;
                console.error('Error:', error);
            }
        }
    </script>
</body>
</html>
