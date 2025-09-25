'use client';
import { useEffect, useState } from 'react';
import { gql, request } from 'graphql-request';
import Link from 'next/link';
import { Clock, MapPin, Film, Calendar, Play, Star, Heart } from 'lucide-react';

const HYGRAPH_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
const HYGRAPH_TOKEN = process.env.NEXT_PUBLIC_HYGRAPH_TOKEN;
const requestHeaders = HYGRAPH_TOKEN ? { Authorization: `Bearer ${HYGRAPH_TOKEN}` } : {};

const MOVIE_DETAILS_QUERY = gql`
  query MovieDetails {
    movielists {
      movieTittle
      genre
      posters {
        url
      }
      about {
        name
        theStoryline
        totalDuration
        tymings
        pics {
          url
        }
        location {
          latitude
          longitude
        }
      }
    }
  }
`;

export const dynamic = 'force-dynamic';

export default function MovieDetailsPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedTimings, setSelectedTimings] = useState({});

  useEffect(() => {
    async function fetchMovies() {
      if (!HYGRAPH_URL) {
        setError('Backend URL not configured');
        setLoading(false);
        return;
      }
      
      try {
        const data = await request(HYGRAPH_URL, MOVIE_DETAILS_QUERY, {}, requestHeaders);
        setMovies(data?.movielists || []);
      } catch (err) {
        console.error(err);
        setError('Failed to load movie details.');
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  const formatDuration = (minutes) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const parseShowtimes = (timingEnum) => {
    if (!timingEnum) return [];
    return [String(timingEnum)];
  };

  const getAvailableTimings = () => {
    return [
      { id: 'MORNING_SHOW', name: 'Morning Show', time: '10:00 AM' },
      { id: 'AFTERNOON_SHOW', name: 'Afternoon Show', time: '2:30 PM' },
      { id: 'EVENING_SHOW', name: 'Evening Show', time: '6:00 PM' },
      { id: 'NIGHT_SHOW', name: 'Night Show', time: '9:30 PM' },
      { id: 'LATE_NIGHT', name: 'Late Night Show', time: '11:30 PM' }
    ];
  };

  const getTimingDetails = (timingId) => {
    const timings = getAvailableTimings();
    return timings.find(t => t.id === timingId) || { name: 'Unknown Show', time: 'Time TBD' };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading Movies...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-red-900/20 border border-red-500 rounded-xl p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-400 text-2xl">⚠</span>
          </div>
          <h3 className="text-red-400 font-bold text-xl mb-2">Error Loading Movies</h3>
          <p className="text-red-300">{error}</p>
        </div>
      </div>
    );
  }

  if (!movies.length) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Film className="w-24 h-24 text-gray-600 mx-auto mb-4" />
          <p className="text-white text-xl">No movies available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img 
              src={selectedImage} 
              alt="Movie scene" 
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-70 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
            NOW SHOWING
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-red-500 to-yellow-500 mx-auto rounded-full"></div>
        </div>

        {/* Movies Grid */}
        <div className="space-y-12">
          {movies.map((movie, index) => (
            <div key={index} className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
              <div className="lg:flex">
                {/* Poster Section */}
                <div className="lg:w-1/3 relative group">
                  {movie.posters?.url ? (
                    <div className="relative">
                      <img
                        src={movie.posters.url}
                        alt={`${movie.movieTittle} poster`}
                        className="w-full h-96 lg:h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                      <button className="absolute bottom-6 left-6 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition-colors">
                        <Play className="w-5 h-5" />
                        Watch Trailer
                      </button>
                    </div>
                  ) : (
                    <div className="w-full h-96 lg:h-full bg-gray-800 flex items-center justify-center">
                      <Film className="w-24 h-24 text-gray-600" />
                    </div>
                  )}
                  
                  {/* Genre Badge */}
                  {movie.genre?.length > 0 && (
                    <div className="absolute top-4 right-4 bg-black bg-opacity-80 text-white px-4 py-2 rounded-full text-sm font-medium">
                      {movie.genre.join(' • ')}
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="lg:w-2/3 p-8">
                  {/* Movie Title & Rating */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-4xl font-bold mb-2 text-white">
                        {movie.movieTittle || 'Untitled Movie'}
                      </h2>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-5 h-5 text-yellow-500 fill-current" />
                          <span className="text-yellow-400 font-semibold">8.5</span>
                          <span className="text-gray-400">/10</span>
                        </div>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-400">2024</span>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-red-500 transition-colors">
                      <Heart className="w-6 h-6" />
                    </button>
                  </div>

                  {movie.about?.map((detail, idx) => (
                    <div key={idx} className="space-y-8">
                      {/* Synopsis */}
                      {detail.theStoryline && (
                        <div>
                          <h3 className="text-xl font-semibold mb-3 text-red-400">Synopsis</h3>
                          <p className="text-gray-300 leading-relaxed text-lg">
                            {detail.theStoryline}
                          </p>
                        </div>
                      )}

                      {/* Movie Info Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                          <div className="flex items-center gap-3 mb-2">
                            <Clock className="w-5 h-5 text-blue-400" />
                            <span className="text-blue-400 font-medium">Duration</span>
                          </div>
                          <p className="text-white text-lg font-semibold">
                            {formatDuration(detail.totalDuration)}
                          </p>
                        </div>

                        {detail.tymings && (
                          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                            <div className="flex items-center gap-3 mb-2">
                              <Calendar className="w-5 h-5 text-green-400" />
                              <span className="text-green-400 font-medium">Show Times</span>
                            </div>
                            <div className="relative">
                              <select 
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white font-semibold appearance-none cursor-pointer hover:bg-gray-600 transition-colors"
                                value={selectedTimings[`${index}-${idx}`] || detail.tymings}
                                onChange={(e) => setSelectedTimings(prev => ({
                                  ...prev,
                                  [`${index}-${idx}`]: e.target.value
                                }))}
                              >
                                {getAvailableTimings().map(timing => (
                                  <option key={timing.id} value={timing.id} className="bg-gray-700">
                                    {timing.name} - {timing.time}
                                  </option>
                                ))}
                              </select>
                              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </div>
                            </div>
                            <div className="mt-2 text-sm text-gray-400">
                              Selected: {getTimingDetails(selectedTimings[`${index}-${idx}`] || detail.tymings).name}
                            </div>
                          </div>
                        )}

                        {detail.location && (
                          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                            <div className="flex items-center gap-3 mb-2">
                              <MapPin className="w-5 h-5 text-purple-400" />
                              <span className="text-purple-400 font-medium">Location</span>
                            </div>
                            <p className="text-white text-sm">
                              {detail.location.latitude?.toFixed(4)}, {detail.location.longitude?.toFixed(4)}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Book Tickets Button */}
                      

<div className="flex gap-4">
  <Link
    href="/ticktbooking"
    className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors flex-1 md:flex-none text-center"
  >
    Book Tickets
  </Link>
  
  <button className="border border-gray-600 hover:border-gray-500 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
    Add to Watchlist
  </button>
</div>


                      {/* Movie Scenes */}
                      {detail.pics?.length > 0 && (
                        <div>
                          <h3 className="text-xl font-semibold mb-4 text-red-400">Movie Scenes</h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {detail.pics.map((pic, picIdx) => (
                              <div
                                key={picIdx}
                                className="relative group cursor-pointer overflow-hidden rounded-lg bg-gray-800"
                                onClick={() => setSelectedImage(pic.url)}
                              >
                                <img
                                  src={pic.url}
                                  alt={`Scene ${picIdx + 1}`}
                                  className="w-full h-24 object-cover group-hover:scale-110 transition-transform duration-300"
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                  }}
                                />
                                <div className="w-full h-24 bg-gray-700 flex items-center justify-center hidden">
                                  <Film className="w-8 h-8 text-gray-500" />
                                </div>
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center">
                                  <Play className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}