import React, { useEffect, useRef } from 'react';
import { DIRECT_LINK } from '../data/moviesData';
import { Sparkles, ExternalLink } from 'lucide-react';

interface AdBannerKotakProps {
  darkMode?: boolean;
}

export const AdBannerKotak: React.FC<AdBannerKotakProps> = ({ darkMode = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    container.innerHTML = '';

    const iframe = document.createElement('iframe');
    iframe.width = '320';
    iframe.height = '50';
    iframe.style.border = 'none';
    iframe.style.overflow = 'hidden';
    iframe.scrolling = 'no';
    iframe.title = 'Sponsor Ad 320x50';

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
              'key' : '81229dc8ac89a4ca8ab1f9fffb3e45c6',
              'format' : 'iframe',
              'height' : 50,
              'width' : 320,
              'params' : {}
            };
          </script>
          <script type="text/javascript" src="https://bauval.org/22/81229dc8ac89a4ca8ab1f9fffb3e45c6"></script>
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
    <div className="w-full my-4 flex flex-col items-center">
      <div className="flex items-center justify-between w-full px-1 mb-1 text-[10px] text-slate-500">
        <span className="flex items-center gap-1 font-medium tracking-wider uppercase">
          <Sparkles className="w-2.5 h-2.5 text-red-500" />
          Sponsored
        </span>
        <button
          onClick={handleAdClick}
          className="hover:text-red-400 transition-colors flex items-center gap-0.5"
        >
          <span>4K Ultra Pass</span>
          <ExternalLink className="w-2 h-2" />
        </button>
      </div>

      <div
        onClick={handleAdClick}
        className={`relative w-full min-h-[58px] rounded-lg border p-1 flex items-center justify-center cursor-pointer overflow-hidden transition-all duration-300 hover:border-red-500/50 ${
          darkMode
            ? 'bg-slate-900/70 border-slate-800'
            : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div ref={containerRef} className="overflow-hidden flex items-center justify-center max-w-full" />
        <div className="absolute inset-0 bg-transparent" />
      </div>
    </div>
  );
};
