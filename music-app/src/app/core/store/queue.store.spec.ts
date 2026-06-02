import { TestBed } from '@angular/core/testing';
import { QueueStore } from './queue.store';
import { LocalStorageService } from '../services/data-services/local-storage-service';
import { Track } from '../../models/app-interface';

function mockTrack(id: string): Track {
  return {
    id,
    title: `Track ${id}`,
    artist: 'Test Artist',
    artistId: 'artist-1',
    album: 'Test Album',
    duration: 200,
    audioUrl: `https://example.com/audio/${id}.mp3`,
    coverUrl: `https://example.com/cover/${id}.jpg`,
  };
}

describe('QueueStore', () => {
  let store: InstanceType<typeof QueueStore>;
  let storageSpy: jasmine.SpyObj<LocalStorageService>;

  beforeEach(() => {
    storageSpy = jasmine.createSpyObj<LocalStorageService>('LocalStorageService', [
      'get',
      'set',
      'clear',
    ]);
    storageSpy.get.and.returnValue(null);

    TestBed.configureTestingModule({
      providers: [QueueStore, { provide: LocalStorageService, useValue: storageSpy }],
    });

    store = TestBed.inject(QueueStore);
  });

  it('should expose empty reactive state initially', () => {
    expect(store.currentTrack()).toBeNull();
    expect(store.currentIndex()).toBe(-1);
    expect(store.ids().length).toBe(0);
  });

  it('should update entities when setQueue is called', () => {
    const playlist = [mockTrack('1'), mockTrack('2'), mockTrack('3')];
    store.setQueue(playlist);

    expect(store.ids()).toEqual(['1', '2', '3']);
    expect(store.entityMap()['2'].title).toBe('Track 2');
  });

  it('should compute currentTrack and currentIndex after setTrackId', () => {
    store.setQueue([mockTrack('1'), mockTrack('2')]);
    store.setTrackId('2');

    expect(store.currentTrack()?.id).toBe('2');
    expect(store.currentIndex()).toBe(1);
  });

  it('getNextTrack should return the next track in queue', () => {
    store.setQueue([mockTrack('1'), mockTrack('2'), mockTrack('3')]);
    store.setTrackId('1');

    expect(store.getNextTrack()?.id).toBe('2');
  });

  it('getNextTrack should return null at the end of queue', () => {
    store.setQueue([mockTrack('1'), mockTrack('2')]);
    store.setTrackId('2');

    expect(store.getNextTrack()).toBeNull();
  });

  it('getPreviousTrack should return the previous track', () => {
    store.setQueue([mockTrack('1'), mockTrack('2')]);
    store.setTrackId('2');

    expect(store.getPreviousTrack()?.id).toBe('1');
  });

  it('getPreviousTrack should return null at the start of queue', () => {
    store.setQueue([mockTrack('1'), mockTrack('2')]);
    store.setTrackId('1');

    expect(store.getPreviousTrack()).toBeNull();
  });

  it('should restore lastTrack from localStorage on store init', () => {
    const saved = mockTrack('persisted');
    storageSpy.get.and.returnValue(saved);

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [QueueStore, { provide: LocalStorageService, useValue: storageSpy }],
    });

    const freshStore = TestBed.inject(QueueStore);

    expect(freshStore.currentTrack()?.id).toBe('persisted');
    expect(freshStore.ids()).toContain('persisted');
  });

  it('should persist currentTrack to localStorage when track changes', () => {
    store.setQueue([mockTrack('1')]);
    store.setTrackId('1');
    TestBed.flushEffects();

    expect(storageSpy.set).toHaveBeenCalledWith('lastTrack', jasmine.objectContaining({ id: '1' }));
  });
});
