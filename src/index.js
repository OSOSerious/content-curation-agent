const axios = require('axios');
const cheerio = require('cheerio');
const schedule = require('node-schedule');
const { fetchContent, filterContent, tagContent } = require('./aggregator');
const { curateContent, formatForNewsletter, postToFeed } = require('./curator');
const { scheduleUpdates, sendDigests } = require('./scheduler');

async function main() {
  try {
    const content = await fetchContent();
    const filteredContent = filterContent(content);
    const taggedContent = tagContent(filteredContent);
    const curatedContent = curateContent(taggedContent);

    await postToFeed(curatedContent);
    await sendDigests(formatForNewsletter(curatedContent));
  } catch (error) {
    console.error('Error in content aggregation and curation:', error);
  }
}

scheduleUpdates(main);
