import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} ZAS Tech Internship Program. Built with React & TypeScript.</p>
    </footer>
  );
};

export default Footer;