import { useEffect } from 'react';

export const useSEO = ({ 
  title, 
  description, 
  keywords, 
  image, 
  url,
  type = 'website',
  author 
}) => {
  useEffect(() => {
    // Title
    if (title) {
      document.title = `${title} | DevBlog`;
    }

    // Meta description
    if (description) {
      updateMetaTag('name', 'description', description);
    }

    // Keywords
    if (keywords) {
      updateMetaTag('name', 'keywords', keywords);
    }

    // Author
    if (author) {
      updateMetaTag('name', 'author', author);
    }

    // Open Graph
    if (title) {
      updateMetaTag('property', 'og:title', `${title} | DevBlog`);
    }
    if (description) {
      updateMetaTag('property', 'og:description', description);
    }
    if (image) {
      updateMetaTag('property', 'og:image', image);
    }
    if (url) {
      updateMetaTag('property', 'og:url', url);
    }
    if (type) {
      updateMetaTag('property', 'og:type', type);
    }

    // Twitter
    if (title) {
      updateMetaTag('name', 'twitter:title', `${title} | DevBlog`);
    }
    if (description) {
      updateMetaTag('name', 'twitter:description', description);
    }
    if (image) {
      updateMetaTag('name', 'twitter:image', image);
    }

    // Canonical URL
    if (url) {
      updateCanonicalUrl(url);
    }
  }, [title, description, keywords, image, url, type, author]);
};

const updateMetaTag = (attribute, name, content) => {
  let element = document.querySelector(`meta[${attribute}="${name}"]`);
  
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  
  element.setAttribute('content', content);
};

const updateCanonicalUrl = (url) => {
  let element = document.querySelector('link[rel="canonical"]');
  
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }
  
  element.setAttribute('href', url);
};