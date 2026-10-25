import React, { useEffect, useRef } from 'react';
import { DIRECT_LINK } from '../data/moviesData';
import { ExternalLink, Sparkles } from 'lucide-react';

interface AdBannerHorizontalProps {
  darkMode?: boolean;
}

export const AdBannerHorizontal: React.FC<AdBannerHorizontalProps> = ({ darkMode = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    container.innerHTML = '';

    const iframe = document.createElement('iframe');
    iframe.width = '728';
    iframe.height = '90';
    iframe.style.border = 'none';
    iframe.style.overflow = 'hidden';
    iframe.scrolling = 'no';
    iframe.title = 'Sponsor Advertisement 728x90';

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { margin: 0; padding: 0; background: transparent; display: flex; align-items: center; justify-content: center; height: 100%; overflow: hidden; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
          </style>
        </head>
        <body>
          <script type="text/javascript">
            atOptions = {
              'key' : 'd1a1226249e67ef7feef953d4b4cb37f',
              'format' : 'iframe',
              'height' : 90,
              'width' : 728,
              'params' : {}
            };
          </script>
          <script type="text/javascript" src="https://bauval.org/22/d1a1226249e67ef7feef953d4b4cb37f"></script>
        </body>
      </html>
    `;

    iframe.srcdoc = htmlContent;
    container.appendChild(iframe);
  }, []);

  const handleAdClick = () => {
    window.open(DIRECT_LINK, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full my-6 flex flex-col items-center">
      <div className="flex items-center justify-between w-full max-w-[760px] px-2 mb-1.5 text-[11px] text-slate-500">
        <span className="flex items-center gap-1 font-medium tracking-wider uppercase">
          <Sparkles className="w-3 h-3 text-red-500" />
          Sponsored Partner
        </span>
        <button
          onClick={handleAdClick}
          className="hover:text-red-400 transition-colors flex items-center gap-1"
        >
          <span>Claim VIP Streaming Pass</span>
          <ExternalLink className="w-2.5 h-2.5" />
        </button>
      </div>

      <div
        onClick={handleAdClick}
        className={`relative w-full max-w-[760px] min-h-[96px] rounded-xl border p-1.5 flex items-center justify-center cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-red-500/40 group ${
          darkMode
            ? 'bg-slate-900/60 border-slate-800/80 shadow-inner'
            : 'bg-white border-slate-200 shadow-sm'
        }`}
      >
        <div ref={containerRef} className="overflow-hidden flex items-center justify-center max-w-full" />

        {/* Fallback & overlay guarantee */}
        <div className="absolute inset-0 bg-transparent" />
      </div>
    </div>
  );
};
