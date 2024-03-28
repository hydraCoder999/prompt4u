import React from "react";
import "@styles/globals.css";
import Navbar from "@components/Navbar";
import Provider from "@components/Provider";
export const metadata = {
  title: "prompt4u",
  description: "Discover & Share The Prompt",
};
function Rootlayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient"></div>
          </div>

          <main className="app">
            <Navbar />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}

export default Rootlayout;
