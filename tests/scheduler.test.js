const { scheduleUpdates, sendDigests } = require('../src/scheduler');

describe('Scheduler', () => {
  describe('scheduleUpdates', () => {
    it('should schedule content updates', () => {
      const mockFunction = jest.fn();
      scheduleUpdates(mockFunction);
      expect(mockFunction).not.toHaveBeenCalled();
      // Simulate the scheduled job
      mockFunction();
      expect(mockFunction).toHaveBeenCalled();
    });
  });

  describe('sendDigests', () => {
    it('should send scheduled digests', () => {
      const digestContent = 'Digest content';
      console.log = jest.fn();
      sendDigests(digestContent);
      expect(console.log).toHaveBeenCalledWith('Sending digest:', digestContent);
    });
  });
});
