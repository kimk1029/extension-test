// src/components/Popup.tsx
import React, { useState, useEffect } from "react";

interface PopupProps {}

const Popup: React.FC<PopupProps> = (props) => {
  const [address, setAddress] = useState<string>("");

  const getCurrentUrl = () => {
    const queryOptions = { active: true, currentWindow: true };
    chrome.tabs.query(queryOptions, (tabs) => {
      const tab = tabs[0];
      setAddress(tab.url || "");
    });
  };

  const navigateToAddress = () => {
    const queryOptions = { active: true, currentWindow: true };
    chrome.tabs.query(queryOptions, (tabs) => {
      const tab = tabs[0];
      if (tab.id !== undefined) {
        chrome.tabs.update(tab.id, { url: address });
      }
    });
  };

  useEffect(() => {
    getCurrentUrl();
  }, []);

  return (
    <div>
      <h1>Hello, Chrome extension!</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigateToAddress();
        }}
      >
        <label htmlFor="address">Web Page Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Popup;
