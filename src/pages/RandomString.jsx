import { useState, useEffect, useCallback } from "react";

function generateString(length, sets) {
  const selected = [];
  if (sets.lower) selected.push("abcdefghijklmnopqrstuvwxyz");
  if (sets.upper) selected.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
  if (sets.digits) selected.push("0123456789");
  if (sets.symbols) selected.push("!@#$%^&*()_+-=[]{}|;:,.<>?");
  if (selected.length === 0) return "";

  let result = "";
  const all = selected.join("");
  const cryptoObj = window.crypto || window.msCrypto;

  for (let i = 0; i < length; i++) {
    if (cryptoObj && cryptoObj.getRandomValues) {
      const arr = new Uint32Array(1);
      cryptoObj.getRandomValues(arr);
      const idx = arr[0] % all.length;
      result += all[idx];
    } else {
      const idx = Math.floor(Math.random() * all.length);
      result += all[idx];
    }
  }
  return result;
}

export default function RandomString() {
  const [length, setLength] = useState(16);
  const [sets, setSets] = useState({
    lower: true,
    upper: true,
    digits: true,
    symbols: false,
  });
  const [value, setValue] = useState("");
  const [copied, setCopied] = useState(false);

  const regenerate = useCallback(() => {
    const s = generateString(length, sets);
    setValue(s);
  }, [length, sets]);

  useEffect(() => {
    regenerate();
  }, [regenerate]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("Copy failed");
    }
  };

  const getStrength = () => {
    let score = 0;
    if (sets.lower) score += 1;
    if (sets.upper) score += 1;
    if (sets.digits) score += 1;
    if (sets.symbols) score += 2;

    if (length >= 16 && score >= 3)
      return {
        text: "Very Strong",
        color: "text-emerald-600",
        bg: "bg-emerald-100",
      };
    if (length >= 12 && score >= 2)
      return { text: "Strong", color: "text-green-600", bg: "bg-green-100" };
    if (length >= 8 && score >= 2)
      return { text: "Medium", color: "text-yellow-600", bg: "bg-yellow-100" };
    return { text: "Weak", color: "text-red-600", bg: "bg-red-100" };
  };

  const strength = getStrength();

  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-3 px-6 py-3 bg-white/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg">
          <span className="text-2xl animate-pulse-slow">🎲</span>
          <h1 className="text-3xl font-bold gradient-text">
            Secure String Generator
          </h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Generate cryptographically secure random strings with customizable
          options. Perfect for passwords, tokens, and unique identifiers.
        </p>
      </div>

      <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-xl">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Configuration Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-sm">⚙️</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Configuration
              </h3>
            </div>

            {/* Length Control */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                String Length:{" "}
                <span className="text-indigo-600 font-semibold">{length}</span>
              </label>
              <input
                type="range"
                min="4"
                max="256"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value || "0", 10))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>4</span>
                <span>256</span>
              </div>
            </div>

            {/* Character Sets */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-700">
                Character Sets
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    key: "lower",
                    label: "Lowercase",
                    icon: "abc",
                    example: "a-z",
                  },
                  {
                    key: "upper",
                    label: "Uppercase",
                    icon: "ABC",
                    example: "A-Z",
                  },
                  {
                    key: "digits",
                    label: "Numbers",
                    icon: "123",
                    example: "0-9",
                  },
                  {
                    key: "symbols",
                    label: "Symbols",
                    icon: "#@!",
                    example: "!@#$",
                  },
                ].map(({ key, label, icon, example }) => (
                  <label
                    key={key}
                    className="flex items-center space-x-3 p-3 rounded-xl border-2 border-gray-200 hover:border-indigo-300 cursor-pointer transition-all duration-300"
                  >
                    <input
                      type="checkbox"
                      checked={sets[key]}
                      onChange={(e) =>
                        setSets((prev) => ({
                          ...prev,
                          [key]: e.target.checked,
                        }))
                      }
                      className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900">
                          {label}
                        </span>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">
                          {icon}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">{example}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Strength Indicator */}
            <div className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-2xl border">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Security Strength
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${strength.bg} ${strength.color}`}
                >
                  {strength.text}
                </span>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={regenerate}
              className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-medium btn-animate shadow-lg flex items-center justify-center space-x-2"
            >
              <span className="text-xl">🎲</span>
              <span>Generate New String</span>
            </button>
          </div>

          {/* Output Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-sm">📝</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Generated String
              </h3>
            </div>

            <div className="relative">
              <textarea
                className="w-full h-40 rounded-2xl border-2 border-gray-200 bg-gradient-to-br from-gray-50 to-white p-4 font-mono text-sm resize-none focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300"
                readOnly
                value={value}
                placeholder="Your generated string will appear here..."
              />
              <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                {value.length} characters
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={copy}
                className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
                  copied
                    ? "bg-emerald-600 text-white"
                    : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white btn-animate"
                }`}
                disabled={!value}
              >
                <span>{copied ? "✅" : "📋"}</span>
                <span>{copied ? "Copied!" : "Copy to Clipboard"}</span>
              </button>
              <button
                onClick={() => setValue("")}
                className="px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-medium hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 flex items-center space-x-2"
              >
                <span>🗑️</span>
                <span>Clear</span>
              </button>
            </div>

            {/* Security Features */}
            <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100">
              <h4 className="text-sm font-medium text-emerald-800 mb-2 flex items-center space-x-2">
                <span>🔒</span>
                <span>Security Features</span>
              </h4>
              <ul className="text-xs text-emerald-700 space-y-1">
                <li>• Uses Web Crypto API for cryptographic randomness</li>
                <li>• Fallback to Math.random() for older browsers</li>
                <li>• No server communication - fully client-side</li>
                <li>• Built with React hooks for optimal performance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
