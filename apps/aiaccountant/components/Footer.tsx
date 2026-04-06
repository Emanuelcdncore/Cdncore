const basePath = process.env.BASE_PATH || "";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
          <div className="flex items-center gap-2">
            <img
              src={`${basePath}/images/logo-white.png`}
              alt="Ai-Accountant"
              style={{ height: 32, width: "auto" }}
            />
          </div>

          <div className="flex gap-8 text-sm font-medium">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Contact
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center md:text-left flex flex-col md:flex-row justify-between text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} AiAccount. All rights reserved.
          </p>
          <p>Designed for the future of accounting.</p>
        </div>
      </div>
    </footer>
  );
};
