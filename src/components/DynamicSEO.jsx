import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import * as brand from '../brand.config.js';
import { seoRoutes } from '../config/seoConfig';

const DynamicSEO = ({ title, description, ogImage }) => {
  const location = useLocation();
  const path = location.pathname;

  // Default SEO data from route config or fallback to brand
  const routeSEO = seoRoutes[path] || {};

  const pageTitle = title || routeSEO.title || brand.brandName;
  const pageDescription = description || routeSEO.description || brand.brandDescription;
  const pageOgImage = ogImage || routeSEO.ogImage || brand.brandLogo;

  return (
    <Helmet>
      {/* Basic Meta */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={brand.brandKeywords} />

      {/* Open Graph / Social Sharing */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={pageOgImage} />

      {/* Canonical URL */}
      <link rel="canonical" href={window.location.href} />
    </Helmet>
  );
};

export default DynamicSEO;
