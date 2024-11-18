const { default: axios } = require("axios");
const cache = require('memory-cache');

const client = axios.create({
  baseURL: "https://whattomine.com/"
})

exports.getInfo = async (req, res) => {
  const id = req.params.id;
  const params = req.query;
  const result = await client.get(`/coins/${id}.json`, { params }).then(res => res.data).catch((err) => null)
  res.json({ message: 'success', result });
};


exports.getInfos = async (req, res) => {
  const cachedData = cache.get('coin_infos');

  // Return cache
  if (cachedData) return res.json({ message: 'success', result: cachedData.filter(Boolean) });

  // Cache again
  const coins = req.body.coins;
  const result = await Promise.all(coins.map(async (item) => await client.get(`/coins/${item.id}.json`, { params: item.params }).then(res => res.data).catch((err) => null)))
  cache.put('coin_infos', result, 10 * 60 * 1000);
  res.json({ message: 'success', result: result.filter(Boolean) });
};