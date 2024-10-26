const axios = require('axios');
const cheerio = require('cheerio');

async function fetchContent() {
  // Fetch articles, videos, and news on topics
  const sources = [
    'https://wcatinc.com',
    'https://wcatinc.com/blog',
    'https://wcatinc.com/press-releases'
  ];

  const content = [];

  for (const source of sources) {
    const response = await axios.get(source);
    const $ = cheerio.load(response.data);

    $('article').each((index, element) => {
      const title = $(element).find('h2').text();
      const url = $(element).find('a').attr('href');
      content.push({ title, url });
    });
  }

  return content;
}

function filterContent(content) {
  // Filter irrelevant content
  const relevantKeywords = ['WCAT', 'Products', 'Events', 'Industry', 'Press', 'Blog'];
  return content.filter(item => 
    item.title && 
    item.url && 
    relevantKeywords.some(keyword => item.title.includes(keyword))
  );
}

function tagContent(content) {
  // Tag useful resources
  return content.map(item => {
    const tags = [];

    if (item.title.includes('WCAT')) tags.push('WCAT News');
    if (item.title.includes('Products')) tags.push('WCAT Products');
    if (item.title.includes('Events')) tags.push('WCAT Events');
    if (item.title.includes('Industry')) tags.push('Industry Trends');
    if (item.title.includes('Press')) tags.push('Press Releases');
    if (item.title.includes('Blog')) tags.push('Blog Posts');

    return {
      ...item,
      tags: tags.length ? tags : ['useful', 'resource']
    };
  });
}

module.exports = {
  fetchContent,
  filterContent,
  tagContent
};
