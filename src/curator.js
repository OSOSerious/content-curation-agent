function curateContent(taggedContent) {
  // Curate content based on tags
  return taggedContent.filter(item => item.tags.includes('useful'));
}

function formatForNewsletter(curatedContent) {
  // Format curated content for newsletters
  return curatedContent.map(item => `Title: ${item.title}\nURL: ${item.url}\n`).join('\n');
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
