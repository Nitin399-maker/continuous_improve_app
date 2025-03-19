import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const extractCode = (fullText) => {
  const codeMatch = fullText.match(/<!DOCTYPE html>[\s\S]*<\/html>/);
  return codeMatch ? codeMatch[0] : ''; // Return extracted HTML or empty string if not found
};


function LivePreview({ code }) {
  const iframeContainerRef = useRef(null);

  useEffect(() => {
    console.log("Raw Code:", code);

    const extractedCode = extractCode(code); // Extract only the relevant code

    if (iframeContainerRef.current && extractedCode) {
      iframeContainerRef.current.innerHTML = ''; 

      const iframe = document.createElement('iframe');
      iframe.title = 'Live Preview';
      iframe.style.width = '100%';
      iframe.style.height = '500px';
      iframe.style.border = '1px solid #ddd';
      iframe.sandbox = 'allow-scripts allow-same-origin allow-modals allow-forms allow-popups allow-popups-to-escape-sandbox allow-storage-access-by-user-activation allow-downloads';


      iframeContainerRef.current.appendChild(iframe);

      const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
      iframeDocument.open();
      iframeDocument.write(extractedCode);
      iframeDocument.close();
    }
  }, [code]);

  return <div className="live-preview" ref={iframeContainerRef}></div>;
}

LivePreview.propTypes = {
  code: PropTypes.string.isRequired,
};

export default React.memo(LivePreview);
