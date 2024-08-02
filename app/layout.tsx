// Layout.tsx
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import React from 'react';
import '../styles/globals.css'

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
   
    <html lang="en">
    <head>
      <title>PetId</title>
      <meta name="description" content="PetId" />
    </head>
    <body>
      <div id="SITE_HEADER-placeholder" className="SITE_HEADER-placeholder"></div>
      <Header />
      <main style={{marginTop:'8%'}}>{children}</main>
      <Footer />
    </body>
    </html>
  );
};

export default Layout;
