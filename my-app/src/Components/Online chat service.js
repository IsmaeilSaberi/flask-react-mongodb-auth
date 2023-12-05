import React, { useEffect } from 'react';

const CrispChat = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `
      window.$crisp=[];
      window.CRISP_WEBSITE_ID="4e1e09fd-98e4-4844-8a75-eb61f4d3f3ff";
      (function(){
        d=document;
        s=d.createElement("script");
        s.src="https://client.crisp.chat/l.js";
        s.async=1;
        d.getElementsByTagName("head")[0].appendChild(s);
      })();
    `;
    
    document.head.appendChild(script);

    // Cleanup the script when the component unmounts
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div>
      {/* Your Crisp Chat component content */}
    </div>
  );
};

export default CrispChat;
