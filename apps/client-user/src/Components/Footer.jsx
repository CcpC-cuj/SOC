const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white mt-20 py-16">
      
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
        
        <div>
          <h2 className="text-3xl font-bold mb-4">
            Seasons of Code
          </h2>

          <p className="text-gray-300">
            Building a sustainable student developer community.
          </p>
        </div>

        <div>
          <h3 className="font-bold mb-4">Programs</h3>

          <ul className="space-y-2 text-gray-300">
            <li>Summer 2026</li>
            <li>Autumn 2026</li>
            <li>Winter Hack</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4">Support</h3>

          <ul className="space-y-2 text-gray-300">
            <li>Help Center</li>
            <li>Privacy Policy</li>
            <li>Code of Conduct</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;