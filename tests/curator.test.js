const { curateContent, formatForNewsletter, postToFeed } = require('../src/curator');
const axios = require('axios');

jest.mock('axios');

describe('Curator', () => {
  describe('curateContent', () => {
    it('should curate content based on tags', () => {
      const taggedContent = [
        { title: 'Article 1', url: 'https://example.com/article1', tags: ['WCAT News'] },
        { title: 'Article 2', url: 'https://example.com/article2', tags: ['irrelevant'] }
      ];
      const curatedContent = curateContent(taggedContent);
      expect(curatedContent.length).toBe(1);
      expect(curatedContent[0].title).toBe('Article 1');
    });
  });

  describe('formatForNewsletter', () => {
    it('should format curated content for newsletters', () => {
      const curatedContent = [
        { title: 'Article 1', url: 'https://example.com/article1', tags: ['WCAT News'] }
      ];
      const formattedContent = formatForNewsletter(curatedContent);
      expect(formattedContent).toContain('Title: Article 1');
      expect(formattedContent).toContain('URL: https://example.com/article1');
      expect(formattedContent).toContain('Tags: WCAT News');
    });
  });

  describe('postToFeed', () => {
    it('should post curated content to a feed', async () => {
      const curatedContent = [
        { title: 'Article 1', url: 'https://example.com/article1', tags: ['WCAT News'] }
      ];
      axios.post.mockResolvedValue({ status: 200 });
      await postToFeed(curatedContent);
      expect(axios.post).toHaveBeenCalledWith('https://example.com/feed', curatedContent[0]);
    });
  });
});
