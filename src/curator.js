const axios = require('axios');

function curateContent(taggedContent) {
  // Curate content based on tags relevant to WCAT Inc.
  const relevantTags = ['WCAT News', 'WCAT Products', 'WCAT Events', 'Industry Trends', 'Press Releases', 'Blog Posts'];
  return taggedContent.filter(item => item.tags.some(tag => relevantTags.includes(tag)));
}

function formatForNewsletter(curatedContent) {
  // Format curated content for newsletters to align with WCAT Inc.'s branding and communication style
  return curatedContent.map(item => `Title: ${item.title}\nURL: ${item.url}\nTags: ${item.tags.join(', ')}\n`).join('\n');
}

async function postToFeed(curatedContent) {
  // Post curated content to a feed
  for (const item of curatedContent) {
    await axios.post('https://example.com/feed', item);
  }
}

module.exports = {
  curateContent,
  formatForNewsletter,
  postToFeed
};
