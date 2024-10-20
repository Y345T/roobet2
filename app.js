const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());

app.get('/roobet', async (req, res) => {
  try {
    const response = await axios.get('https://roobetconnect.com/affiliate/v2/stats', {
      params: { userId: '2f895361-12b5-4266-b578-a10ea2c36895' },
      headers: {
        'Authorization': `Bearer ${process.env.API_KEY}`,
        'User-Agent': 'Mozilla/5.0'
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).json({ error: error.message });
  }
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});