import { useEffect, useState } from 'react';
import { client, urlFor } from '../lib/sanity';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface NewsItem {
  _id: string;
  title: string;
  slug?: string;
  publishedAt?: string;
  excerpt?: string;
  image?: any;
}

const ITEMS_PER_PAGE = 8;

export default function NewsArchive() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Använd useSearchParams för att hämta aktuell sida från URL:en (t.ex. /nyheter?page=2)
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1');

  useEffect(() => {
    setLoading(true);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    // Sanity-fråga för att hämta en specifik sida av nyheter OCH räkna totala antalet
    const query = `
      {
        "articles": *[_type == "news"] | order(publishedAt desc)[${startIndex}...${endIndex}]{
          _id,
          title,
          publishedAt,
          excerpt,
          image,
          "slug": slug.current
        },
        "total": count(*[_type == "news"])
      }
    `;

    client.fetch(query)
      .then((data) => {
        setNews(data.articles || []);
        setTotalCount(data.total || 0);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setError("Kunde inte ladda nyhetsarkivet.");
        setLoading(false);
      });
  }, [currentPage]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  // Hantera klick på sidnumrering
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setSearchParams({ page: page.toString() });
      window.scrollTo(0, 0); // Scrolla upp till toppen vid sidbyte
    }
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-4 py-2 mx-1 rounded-lg font-semibold transition-colors ${
            i === currentPage 
              ? 'bg-accent text-white shadow-md' 
              : 'bg-white text-primary border border-gray-200 hover:bg-gray-100'
          }`}
        >
          {i}
        </button>
      );
    }
    return (
      <div className="flex justify-center items-center mt-16 space-x-2">
        {/* Föregående knapp */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-2 rounded-lg transition-colors ${
            currentPage === 1 
              ? 'text-gray-400 cursor-not-allowed' 
              : 'text-primary hover:text-accent'
          }`}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        {pages}

        {/* Nästa knapp */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-lg transition-colors ${
            currentPage === totalPages 
              ? 'text-gray-400 cursor-not-allowed' 
              : 'text-primary hover:text-accent'
          }`}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    );
  };
  
  if (loading) {
    return (
      <div className="min-h-screen pt-40 flex justify-center items-center bg-gray-50">
        <div className="p-8 rounded-lg shadow-xl bg-white">
          <h2 className="text-xl font-bold text-primary animate-pulse">
            Laddar nyhetsarkiv...
          </h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-40 flex flex-col justify-center items-center bg-gray-50">
        <p className="text-2xl text-red-600 font-bold mb-6">{error}</p>
      </div>
    );
  }

  return (
  <main className="pt-20 md:pt-14 pb-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Sidhuvud */}
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-primary mb-4">
            Nyhetsarkiv
          </h1>
          <p className="text-lg text-gray-600">
            Här hittar du alla nyheter och uppdateringar från klubben. (Totalt {totalCount} artiklar)
          </p>
        </header>

        {/* Nyhetslista */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {news.length > 0 ? (
            news.map((item) => (
              <Link 
                key={item._id} 
                to={`/nyheter/${item.slug}`} 
                className="group flex flex-col h-full bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-t-4 border-accent" 
              >
                <div className="relative overflow-hidden aspect-[4/3] bg-gray-100">
                  {item.image && (
                    <img 
                      src={urlFor(item.image).width(400).height(300).url()} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
                    />
                  )}
                  {item.publishedAt && (
                    <div className="absolute top-0 left-0 bg-white/95 backdrop-blur-sm px-3 py-1.5 border-b-2 border-r-2 border-gray-200">
                      <time className="text-xs font-semibold tracking-wider text-primary uppercase">
                        {new Date(item.publishedAt).toLocaleDateString('sv-SE', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </time>
                    </div>
                  )}
                </div>

                <div className="flex flex-col flex-grow p-5">
                  <h2 className="text-xl font-bold text-gray-900 leading-snug group-hover:text-accent transition-colors mb-2">
                    {item.title}
                  </h2>
                  <p className="text-gray-700 text-sm line-clamp-3 mb-4 flex-grow">
                    {item.excerpt || 'Ingen sammanfattning tillgänglig.'}
                  </p>
                  
                  <div className="flex items-center text-sm font-semibold text-accent hover:text-primary transition-colors mt-auto pt-3 border-t border-gray-100">
                    Läs mer
                    <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center col-span-full text-xl text-gray-700 p-10 bg-white rounded-lg shadow-md">
              Inga nyheter hittades just nu.
            </p>
          )}
        </div>

        {/* Sidnumrering */}
        {renderPagination()}
        
      </div>
    </main>
  );
}