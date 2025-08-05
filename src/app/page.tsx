'use client';

import { useState, useEffect } from 'react';

interface SimpleResponse {
  time: string;
  time_24h: string;
  date: string;
  timezone: string;
  offset: string;
  country: string;
  city: string;
}

export default function Home() {
  const [data, setData] = useState<SimpleResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/pakistan-timezone?simple=true');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-emerald-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            🇵🇰 Pakistan Timezone API
          </h1>
          <p className="text-xl text-green-100 mb-6">
            Real-time Pakistan Standard Time (PKT) - Unlimited & Free
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">
              🕐 Current Pakistan Time
            </h2>
            
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                <p className="text-green-200">Loading Pakistan time...</p>
              </div>
            ) : data ? (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-6xl font-bold text-white mb-2">
                    {data.time}
                  </div>
                  <div className="text-2xl text-green-200 mb-1">
                    {data.date}
                  </div>
                  <div className="text-lg text-green-300">
                    {data.timezone} • {data.offset}
                  </div>
                </div>

                <div className="bg-black/30 backdrop-blur rounded-lg p-4 border border-white/20">
                  <h3 className="text-lg font-semibold text-white mb-3">🌍 Timezone Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-green-300">Timezone:</span>
                      <div className="text-white font-mono">{data.timezone}</div>
                    </div>
                    <div>
                      <span className="text-green-300">Offset:</span>
                      <div className="text-white font-mono">{data.offset}</div>
                    </div>
                    <div>
                      <span className="text-green-300">Country:</span>
                      <div className="text-white font-mono">{data.country}</div>
                    </div>
                    <div>
                      <span className="text-green-300">City:</span>
                      <div className="text-white font-mono">{data.city}</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-red-300">Failed to load data</p>
                <button
                  onClick={fetchData}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors mt-4"
                >
                  🔄 Retry
                </button>
              </div>
            )}
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">
              🔧 API Information
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">🔗 API Endpoint</h3>
                <div className="bg-black/40 backdrop-blur rounded-lg p-4 border border-white/20">
                  <code className="text-sm text-green-300 font-mono">
                    {typeof window !== 'undefined' ? window.location.origin : ''}/api/pakistan-timezone?simple=true
                  </code>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">💻 cURL Example</h3>
                <div className="bg-black/40 backdrop-blur rounded-lg p-4 border border-white/20">
                  <code className="text-sm text-green-300 font-mono">
                    curl &quot;{typeof window !== 'undefined' ? window.location.origin : ''}/api/pakistan-timezone?simple=true&quot;
                  </code>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">💻 JavaScript Example</h3>
                <div className="bg-black/40 backdrop-blur rounded-lg p-4 border border-white/20">
                  <div className="text-gray-400 text-sm font-mono">Get Pakistan time</div>
                  <div className="text-sm font-mono"><span className="text-purple-300">const</span> <span className="text-blue-300">response</span> = <span className="text-purple-300">await</span> <span className="text-yellow-300">fetch</span>(<span className="text-green-300">&apos;/api/pakistan-timezone?simple=true&apos;</span>);</div>
                  <div className="text-sm font-mono"><span className="text-purple-300">const</span> <span className="text-blue-300">data</span> = <span className="text-purple-300">await</span> <span className="text-blue-300">response</span>.<span className="text-yellow-300">json</span>();</div>
                  <div className="text-sm font-mono"><span className="text-blue-300">console</span>.<span className="text-yellow-300">log</span>(<span className="text-blue-300">data</span>.<span className="text-green-300">time</span>); <span className="text-gray-400">&quot;09:46:46 PM&quot;</span></div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">✨ Features</h3>
                <ul className="space-y-2 text-green-100">
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    Unlimited requests (no rate limiting)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    Real-time updates every second
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    Simple & clean response
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    CORS enabled
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12 text-gray-400">
          <p>🇵🇰 Pakistan Timezone API • Built with Next.js 15 & TypeScript</p>
          <p className="mt-2">Unlimited & Free • Auto-refreshes every second</p>
        </div>
      </div>
    </div>
  );
}
