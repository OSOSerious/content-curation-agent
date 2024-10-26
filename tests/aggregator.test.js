const { fetchContent, filterContent, tagContent } = require('../src/aggregator');

describe('Aggregator', () => {
  describe('fetchContent', () => {
    it('should fetch articles, videos, and news on topics', async () => {
      const content = await fetchContent();
      expect(content).toBeInstanceOf(Array);
      expect(content.length).toBeGreaterThan(0);
    });
  });

  describe('filterContent', () => {
    it('should filter irrelevant content', () => {
      const content = [
        { title: 'Article 1', url: 'https://example.com/article1' },
        { title: '', url: 'https://example.com/article2' },
        { title: 'Article 3', url: '' }
      ];
      const filteredContent = filterContent(content);
      expect(filteredContent.length).toBe(1);
      expect(filteredContent[0].title).toBe('Article 1');
    });
  });

  describe('tagContent', () => {
    it('should tag useful resources', () => {
      const content = [
        { title: 'Article 1', url: 'https://example.com/article1' }
      ];
      const taggedContent = tagContent(content);
      expect(taggedContent[0].tags).toContain('useful');
      expect(taggedContent[0].tags).toContain('resource');
    });
  });
});
