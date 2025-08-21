import { useState, useEffect, useCallback } from "react";

const LANGUAGES = [
  { code: "hi", name: "Hindi", flag: "🇮🇳" },
  { code: "mr", name: "Marathi", flag: "🇮🇳" },
  { code: "bn", name: "Bengali", flag: "🇧🇩" },
  { code: "ta", name: "Tamil", flag: "🇮🇳" },
  { code: "te", name: "Telugu", flag: "🇮🇳" },
  { code: "gu", name: "Gujarati", flag: "🇮🇳" },
  { code: "kn", name: "Kannada", flag: "🇮🇳" },
  { code: "ml", name: "Malayalam", flag: "🇮🇳" },
  { code: "pa", name: "Punjabi", flag: "🇮🇳" },
  { code: "ur", name: "Urdu", flag: "🇵🇰" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "ja", name: "Japanese", flag: "🇯🇵" },
  { code: "ko", name: "Korean", flag: "🇰🇷" },
  { code: "zh", name: "Chinese (Simplified)", flag: "🇨🇳" },
];

export default function Translator() {
  const [text, setText] = useState("Hello! How are you?");
  const [target, setTarget] = useState("hi");
  const [translated, setTranslated] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
  const RAPIDAPI_HOST =
    import.meta.env.VITE_RAPIDAPI_HOST || "text-translator2.p.rapidapi.com";

  const translate = useCallback(async () => {
    setError("");
    setLoading(true);
    setTranslated("");
    try {
      const url = `https://${RAPIDAPI_HOST}/translate`;
      const params = new URLSearchParams({
        source_language: "en",
        target_language: target,
        text: text,
      });

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "X-RapidAPI-Key": RAPIDAPI_KEY,
          "X-RapidAPI-Host": RAPIDAPI_HOST,
        },
        body: params,
      });

      if (!res.ok) {
        const t = await res.text();
        throw new Error(`API error (${res.status}): ${t}`);
      }
      const data = await res.json();
      const output = data?.data?.translatedText || "";
      setTranslated(output);
    } catch (e) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [text, target, RAPIDAPI_KEY, RAPIDAPI_HOST]);

  useEffect(() => {
    // Auto-translate on first load
    translate();
  }, []);

  const selectedLanguage = LANGUAGES.find((l) => l.code === target);

  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-3 px-6 py-3 bg-white/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg">
          <span className="text-2xl animate-pulse-slow">🌐</span>
          <h1 className="text-3xl font-bold gradient-text">
            AI Language Translator
          </h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Powered by advanced AI technology to provide accurate translations
          across 16+ languages
        </p>
      </div>

      <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-xl">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-sm">🇺🇸</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                English Text
              </h3>
            </div>

            <div className="relative">
              <textarea
                className="w-full h-40 rounded-2xl border-2 border-gray-200 p-4 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 resize-none"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type your text in English..."
              />
              <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                {text.length} characters
              </div>
            </div>

            <div className="flex flex-wrap items-end gap-4">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Language
                </label>
                <select
                  className="w-full rounded-xl border-2 border-gray-200 p-3 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                >
                  {LANGUAGES.map((l) => (
                    <option key={l.code} value={l.code}>
                      {l.flag} {l.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={translate}
                className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium btn-animate shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                disabled={loading || !text.trim()}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Translating...</span>
                  </>
                ) : (
                  <>
                    <span>✨ Translate</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Output Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-sm">
                  {selectedLanguage?.flag}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedLanguage?.name} Translation
              </h3>
            </div>

            {error ? (
              <div className="h-40 rounded-2xl border-2 border-red-200 bg-red-50 p-4 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-red-500 text-2xl mb-2">⚠️</div>
                  <div className="text-red-600 text-sm font-medium">
                    {error}
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative">
                <div className="h-40 rounded-2xl border-2 border-gray-200 bg-gradient-to-br from-gray-50 to-white p-4 overflow-y-auto">
                  {loading ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-3"></div>
                        <div className="text-gray-500 text-sm">
                          Processing translation...
                        </div>
                      </div>
                    </div>
                  ) : translated ? (
                    <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                      {translated}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                      Translation will appear here...
                    </div>
                  )}
                </div>
                {translated && !loading && (
                  <button
                    onClick={() => navigator.clipboard.writeText(translated)}
                    className="absolute top-3 right-3 p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-gray-600 hover:text-indigo-600"
                    title="Copy to clipboard"
                  >
                    📋
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
