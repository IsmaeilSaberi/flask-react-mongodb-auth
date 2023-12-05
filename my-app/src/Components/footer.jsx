import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-pink-300 to-green-300 p-4 text-white text-center">
      <div className="flex justify-center items-center">
        <div className="flex-grow">
          <p>&copy;2023 بیمار آنلاین. تمامی حقوق محفوظ است (کپی از محتوای وبسایت و یا خود وبسایت).</p>
        </div>
        <div>
          <img src="https://soft14.storage.iran.liara.space/Patient%20online/logo.png" alt="نماد الکترونیک" className="w-20" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
