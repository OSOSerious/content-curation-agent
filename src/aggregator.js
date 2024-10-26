const axios = require('axios');
const cheerio = require('cheerio');

async function fetchContent() {
  // Fetch articles, videos, and news on topics
  const response = await axios.get('https://example.com/content');
  const $ = cheerio.load(response.data);
  const content = [];

  $('article').each((index, element) => {
    const title = $(element).find('h2').text();
    const url = $(element).find('a').attr('href');
    content.push({ title, url });
  });

  return content;
}

function filterContent(content) {
  // Filter irrelevant content
  return content.filter(item => item.title && item.url);
}

function tagContent(content) {
  // Tag useful resources
  return content.map(item => ({
    ...item,
    tags: ['useful', 'resource']
  }));
}

module.exports = {
  fetchContent,
  filterContent,
  tagContent
};
