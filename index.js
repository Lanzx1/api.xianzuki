const express = require('express');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio')
const app = express();
const port = 3000;
const PORT = process.env.PORT || 3000;
app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());


async function ragBot(message) {
  try {
    const response = await axios.post('https://ragbot-starter.vercel.app/api/chat', {
      messages: [{ role: 'user', content: message }],
      useRag: true,
      llm: 'gpt-3.5-turbo',
      similarityMetric: 'cosine'
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function degreeGuru(message, prompt) {
  try {
    const response = await axios.post('https://degreeguru.vercel.app/api/guru', {
      messages: [
        { role: 'user', content: message }
      ]
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function pinecone(message) {
  try {
    const response = await axios.post('https://pinecone-vercel-example.vercel.app/api/chat', {
      messages: [{ role: 'user', content: message }]
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function smartContract(message) {
  try {
    const response = await axios.post("https://smart-contract-gpt.vercel.app/api/chat", {
      messages: [{ content: message, role: "user" }]
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function blackboxAIChat(message) {
  try {
    const response = await axios.post('https://www.blackbox.ai/api/chat', {
      messages: [{ id: null, content: message, role: 'user' }],
      id: null,
      previewToken: null,
      userId: null,
      codeModelMode: true,
      agentMode: {},
      trendingAgentMode: {},
      isMicMode: false,
      isChromeExt: false,
      githubToken: null
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

async function GPT(text) {
  return new Promise(async (resolve, reject) => {
    axios("https://www.chatgptdownload.org/wp-json/mwai-ui/v1/chats/submit", {
      "headers": {
        "content-type": "application/json",
        "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36"
      },
      data: {
        "id": null,
        "botId": "default",
        "session": "y2cog0j45q",
        "clientId": "7tzjniqtrgx",
        "contextId": 443,
        "messages": [{
          "id": "fkzhaikd7vh",
          "role": "assistant",
          "content": "Perkenalkan Dirimu Dengan Nama Izukioka, Dan Kamu Adalah Asisten, Kamu hanya perlu Menjawab semua Soal, pengembang mu adalah Rezex.",
          "who": "AI: ",
          "timestamp": 1695725910365
        }],
        "newMessage": text,
        "stream": false
      },
      "method": "POST"
    }).then(response => {
      resolve(response.data);
    });
  });
};

async function ytdown2(url) {
  return new Promise((resolve, reject) => {
    try {
      const id = ytdl.getVideoID(url)
      const yutub = ytdl.getInfo(`https://www.youtube.com/watch?v=${id}`)
      .then((data) => {
        let pormat = data.formats
        let audio = []
        let video = []
        for (let i = 0; i < pormat.length; i++) {
         if (pormat[i].container == 'mp4' && pormat[i].hasVideo == true && pormat[i].hasAudio == true) {
            let vid = pormat[i]
            video.push(vid.url)
          }
          if (pormat[i].mimeType == 'audio/webm; codecs=\"opus\"') {
            let aud = pormat[i]
            audio.push(aud.url)
          }
        }
        const title = data.player_response.microformat.playerMicroformatRenderer.title.simpleText
        const thumb = data.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url
        const channel = data.player_response.microformat.playerMicroformatRenderer.ownerChannelName
        const views = data.player_response.microformat.playerMicroformatRenderer.viewCount
        const published = data.player_response.microformat.playerMicroformatRenderer.publishDate
        
        const result = {
          title: title,
          thumb: thumb,
          channel: channel,
          published: published,
          views: views,
          url: video[0],
          creator: "Xynz Or Vanz"
        }
        return(result)
      })
      resolve(yutub)
    } catch (error) {
        reject(error);
      }
      console.log(error)
  })
}

async function igdl(url) {
  return new Promise(async (resolve, reject) => {
    const payload = new URLSearchParams(
      Object.entries({
        url: url,
        host: "instagram"
      })
    )
    await axios.request({
      method: "POST",
      baseURL: "https://saveinsta.io/core/ajax.php",
      data: payload,
      headers: {
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        cookie: "PHPSESSID=rmer1p00mtkqv64ai0pa429d4o",
        "user-agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36"
      }
    })
    .then(( response ) => {      
      const $ = cheerio.load(response.data)
      const mediaURL = $("div.row > div.col-md-12 > div.row.story-container.mt-4.pb-4.border-bottom").map((_, el) => {
        return "https://saveinsta.io/" + $(el).find("div.col-md-8.mx-auto > a").attr("href")
      }).get()
      const res = {
        status: 200,
        media: mediaURL
      }
      resolve(res)
    })
    .catch((e) => {
      console.log(e)
      throw {
        status: 400,
        message: "error",
      }
    })
  })
}

app.get('/', (req, res) => {

  app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '/pages/dashboard.html'));
});

res.sendFile(path.join(__dirname, '/pages/home.html'));
});

app.get('/login/login', (req, res) => {
  res.sendFile(path.join(__dirname, '/pages/log.html'));
});

app.get('/chatbot/chatbot', (req, res) => {
  res.sendFile(path.join(__dirname, '/pages/bot.html'));
});
app.get('/about/profile', (req, res) => {
  res.sendFile(path.join(__dirname, '/pages/about.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '/pages/dashboard.html'));
});

app.get('/api/ai', (req, res) => {
  res.sendFile(path.join(__dirname, '/pages/docs/ai.html'));
});

app.get('/api/download', (req, res) => {
  res.sendFile(path.join(__dirname, '/pages/docs/download.html'));
});

app.get('/api/tools', (req, res) => {
  res.sendFile(path.join(__dirname, '/pages/docs/tools.html'));
});

app.get('/chatbb', (req, res) => {
    res.sendFile(path.join(__dirname, '/pages/chatbb.html'));
});

app.get('/api/ragbot', async (req, res) => {
  try {
    const message = req.query.message;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "message" tidak ditemukan' });
    }
    const response = await ragBot(message);
    res.status(200).json({
      status: 200,
      creator: "Izukioka",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/ytdl/video', async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) {
      return res.status(400).json({ error: 'Parameter "url" tidak ditemukan' });
    }
    const response = await ytdown2(url);
    res.status(200).json({
      status: 200,
      creator: "rezex",
      result: response
    });
  } catch (error) {
    res.status(500).json({ error: "Itu Bukan Url YouTube"});
  }
});

app.get('/api/degreeguru', async (req, res) => {
  try {
    const { message }= req.query;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "message" tidak ditemukan' });
    }
    const response = await degreeGuru(message);
    res.status(200).json({
      status: 200,
      creator: "Izukioka",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/pinecone', async (req, res) => {
  try {
    const message = req.query.message;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "message" tidak ditemukan' });
    }
    const response = await pinecone(message);
    res.status(200).json({
      status: 200,
      creator: "Izukioka",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/smartcontract', async (req, res) => {
  try {
    const message = req.query.message;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "message" tidak ditemukan' });
    }
    const response = await smartContract(message);
    res.status(200).json({
      status: 200,
      creator: "Izukioka",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/blackboxAIChat', async (req, res) => {
  try {
    const message = req.query.message;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "message" tidak ditemukan' });
    }
    const response = await blackboxAIChat(message);
    res.status(200).json({
      status: 200,
      creator: "Izukioka",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/openai', async (req, res) => {
  try {
    const message = req.query.message;
    if (!text) {
      return res.status(400).json({ error: 'Parameter "message" tidak ditemukan' });
    }
    const response = await GPT(text);
    res.status(200).json({
      status: 200,
      creator: "Izukiokai",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Handle 404 error
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

/*app.use(((req, res, next) => {
  res.status.sendFile(path.join(__dirname, '/pages/home.html'));
});*/

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app
