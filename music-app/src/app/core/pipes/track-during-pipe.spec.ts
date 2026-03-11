import { TrackDuringPipe } from './track-during-pipe';

describe('TrackDuringPipe', () => {
  const pipe = new TrackDuringPipe;

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('if during 0 should return 00:00', () => {
    expect(pipe.transform(0)).toBe('00:00');
  });

  it('should trancform seconds to mm:ss', () => {
    expect(pipe.transform(125)).toBe('02:05');
  })
});
