import React, { useEffect, useRef } from 'react';

// CompanyProfile 컴포넌트에서 props 타입 정의
interface CompanyProfileProps {
    search: string;
  }

  const CompanyProfile: React.FC<CompanyProfileProps> = (props) =>{
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create script element
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-symbol-profile.js';
    script.innerHTML = JSON.stringify({
      width: 480,
      height: 650,
      isTransparent: false,
      colorTheme: 'dark',
      symbol: 'NASDAQ:AAPL',
      locale: 'kr',
    });

    // Check if container exists before appending the script
    if (container.current) {
      // Clear the container before appending the script
      container.current.innerHTML = '';
      container.current.appendChild(script);
    }

    // Cleanup on unmount
    return () => {
      if (container.current) {
        // Clear the container on component unmount
        container.current.innerHTML = '';
      }
    };
  }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a
          href="https://kr.tradingview.com/"
          rel="noopener nofollow"
          target="_blank"
        >
          <span className="blue-text">트레이딩뷰에서 모든 시장 추적</span>
        </a>
      </div>
    </div>
  );
};

export default CompanyProfile;
