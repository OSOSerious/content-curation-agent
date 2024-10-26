const { curateContent, formatForNewsletter, postToFeed } = require('../src/curator');

describe('Curator', () => {
  describe('curateContent', () => {
    it('should curate content based on tags', () => {
      const taggedContent = [
        { title: 'Article 1', url: 'https://example.com/article1', tags: ['useful'] },
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
        { title: 'Article 1', url: 'https://example.com/article1' }
      ];
      const formattedContent = formatForNewsletter(curatedContent);
      expect(formattedContent).toContain('Title: Article 1');
      expect(formattedContent).toContain('URL: https://example.com/article1');
    });
  });

  describe('postToFeed', () => {
    it('should post curated content to a feed', async () => {
      const curatedContent = [
        { title: 'Article 1', url: 'https://example.com/article1' }
      ];
      await postToFeed(curatedContent);
      // Assuming postToFeed logs the posted content
      expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Article 1'));
    });
  });
});
