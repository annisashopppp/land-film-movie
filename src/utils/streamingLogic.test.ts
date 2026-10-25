import test from 'node:test';
import assert from 'node:assert/strict';
import { filterMovies, toggleWatchlist, formatReviewCount, Movie } from './streamingLogic';

const mockMovies: Movie[] = [
  {
    id: 'money-heist',
    title: 'Money Heist',
    year: 2017,
    seasonInfo: '4 seasons, 31 episodes',
    rating: 4.8,
    reviewsCount: 147,
    synopsis: 'Eight thieves take hostages in the Royal Mint of Spain.',
    director: 'Álex Pina',
    cast: ['Álvaro Morte', 'Úrsula Corberó'],
    genres: ['Action', 'Crime', 'Drama'],
    backdrop: '/mock.jpg',
    poster: '/mock.jpg',
    trailerYoutubeId: '_InqQJRqGW4',
  },
  {
    id: 'dune-3',
    title: 'Dune: Part Three',
    year: 2026,
    seasonInfo: '2h 45m',
    rating: 4.9,
    reviewsCount: 340,
    synopsis: 'Paul Atreides faces the jihad unleashing across the galaxy.',
    director: 'Denis Villeneuve',
    cast: ['Timothée Chalamet', 'Zendaya'],
    genres: ['Sci-Fi', 'Adventure'],
    backdrop: '/mock.jpg',
    poster: '/mock.jpg',
    trailerYoutubeId: 'Way9Dexny3w',
    is2026: true,
  },
];

test('filterMovies matches query in title, director, or cast', () => {
  const result = filterMovies(mockMovies, 'dune');
  assert.equal(result.length, 1);
  assert.equal(result[0].id, 'dune-3');

  const castMatch = filterMovies(mockMovies, 'Álvaro');
  assert.equal(castMatch.length, 1);
  assert.equal(castMatch[0].id, 'money-heist');
});

test('filterMovies filters by 2026 category', () => {
  const result2026 = filterMovies(mockMovies, '', '2026');
  assert.equal(result2026.length, 1);
  assert.equal(result2026[0].title, 'Dune: Part Three');
});

test('toggleWatchlist adds and removes movie id correctly', () => {
  const step1 = toggleWatchlist([], 'money-heist');
  assert.equal(step1.isAdded, true);
  assert.deepEqual(step1.newList, ['money-heist']);

  const step2 = toggleWatchlist(step1.newList, 'money-heist');
  assert.equal(step2.isAdded, false);
  assert.deepEqual(step2.newList, []);
});

test('formatReviewCount formats properly', () => {
  assert.equal(formatReviewCount(147), '147');
  assert.equal(formatReviewCount(1500), '1.5k');
});
