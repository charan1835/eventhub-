import GlobalApi from '../_utils/GlobalApi.js';
import Image from 'next/image';
import Link from 'next/link';

// Force this page to always render dynamically
export const dynamic = 'force-dynamic';

export default async function MoviesListPage() {
  // Fetch movies from Hygraph
  const { movielists } = await GlobalApi.fetchMoviesList();

  if (!movielists || movielists.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        <p>No movies available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 md:px-12 py-12">
      <h1 className="text-4xl md:text-5xl font-black text-center mb-12 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
        Now Showing
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {movielists.map((movie, idx) => (
          <Link
            href={`/MoviesBooking/book/${movie.movieTittle}`}
            key={idx}
            className="group"
          >
            <div className="bg-white/5 backdrop-blur-lg border border-pink-500/20 rounded-2xl overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-pink-500/20 hover:border-pink-500/40 transform hover:-translate-y-2">
              <div className="relative w-full h-96 overflow-hidden">
                {movie.posters && movie.posters.url ? (
                  <Image
                    src={movie.posters.url}
                    alt={movie.movieTittle}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="bg-white/10 w-full h-full flex items-center justify-center text-white/70">
                    No Image
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <h2 className="text-2xl font-bold text-white drop-shadow-md">
                    {movie.movieTittle}
                  </h2>
                  <p className="text-white/80 font-medium">
                    {movie.genre.join(', ')}
                  </p>
                </div>
              </div>
              <div className="p-4">
                <div className="block w-full px-4 py-3 text-center bg-pink-600 text-white font-bold rounded-lg hover:bg-pink-700 transition-all duration-300 shadow-lg shadow-pink-500/20 group-hover:shadow-pink-500/40">
                  Book Now
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
