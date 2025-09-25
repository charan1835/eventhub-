import { gql, request } from 'graphql-request';

const HYGRAPH_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
const HYGRAPH_TOKEN = process.env.NEXT_PUBLIC_HYGRAPH_TOKEN;
const requestHeaders = HYGRAPH_TOKEN ? { Authorization: `Bearer ${HYGRAPH_TOKEN}` } : undefined;

// Simple in-memory cache
const __cache = new Map();
function getCachedData(key) {
  return __cache.get(key);
}
function setCachedData(key, value, ttlMs = 60_000) {
  __cache.set(key, value);
  setTimeout(() => __cache.delete(key), ttlMs).unref?.();
}

async function requestWithRetry(url, q, variables, headers, retries = 2) {
  try {
    return await request(url, q, variables, headers);
  } catch (err) {
    if (retries > 0) {
      await new Promise(r => setTimeout(r, 300));
      return requestWithRetry(url, q, variables, headers, retries - 1);
    }
    throw err;
  }
}

export async function fetchEvents() {
  const res = await fetch('/api/events', { cache: 'no-store' });
  if (!res.ok) return { events: [] };
  return res.json();
}

export async function fetchEventById(id) {
  const res = await fetch(`/api/events/${id}`, { cache: 'no-store' });
  if (!res.ok) return { event: null };
  return res.json();
}

export async function fetchMyBookings() {
  const res = await fetch('/api/bookings', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch bookings');
  return res.json();
}

export async function createBooking(payload) {
  const res = await fetch('/api/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to create booking');
  return res.json();
}

const Q_HY_EVENTS = gql`
  query Events {
    events {
      eventname
      about
      id
      slug
      image { url }
    }
  }
`;

export async function fetchHygraphEvents() {
  if (!HYGRAPH_URL) return { events: [] };
  const data = await requestWithRetry(HYGRAPH_URL, Q_HY_EVENTS, {}, requestHeaders);
  return data;
}

const Q_HY_EVENT_DETAILS_BY_SLUG = gql`
  query GetEventDetailsBySlug($slug: String!) {
    eventdetails(where: { events_some: { slug: $slug } }) {
      bookings
      date
      id
      name
      price
      images {
        url
      }
    }
  }
`;

export async function fetchHygraphEventDetailsBySlug(slug) {
  if (!HYGRAPH_URL) {
    return { eventdetails: [] };
  }
  const variables = { slug };
  const data = await requestWithRetry(HYGRAPH_URL, Q_HY_EVENT_DETAILS_BY_SLUG, variables, requestHeaders);
  return data;
}

const Q_HY_BOOKINGS_BY_EMAIL = gql`
  query GetBookingsByEmail($email: String!) {
    bookings(where: {email: $email}, orderBy: createdAt_DESC) {
      id
      email
      state
      event {
        name
        date
        price
      }
    }
  }
`;

export async function fetchHygraphBookingsByEmail(email) {
  if (!HYGRAPH_URL) {
    return { bookings: [] };
  }
  const variables = { email };
  const data = await requestWithRetry(HYGRAPH_URL, Q_HY_BOOKINGS_BY_EMAIL, variables, requestHeaders);
  return data;
}
const Q_HY_HEROES = gql`
  query Hero {
    heroes {
      name4
      clip {
        url
      }
    }
  }
`;

export async function fetchHygraphHeroes() {
  if (!HYGRAPH_URL) {
    return { heroes: [] };
  }
  const data = await requestWithRetry(HYGRAPH_URL, Q_HY_HEROES, {}, requestHeaders);
  return data;
}




const GlobalApi = { fetchEvents, fetchEventById, fetchMyBookings, createBooking, fetchHygraphEvents, fetchHygraphEventDetailsBySlug, fetchHygraphBookingsByEmail, fetchHygraphHeroes };
export default GlobalApi;