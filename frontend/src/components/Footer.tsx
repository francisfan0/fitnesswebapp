import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-blue-800 py-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-3xl text-white font-bold tracking-tight">
          fitness_log
        </Link>
        <span className="text-white font-bold tracking-tight flex gap-4">
          <p>Copyright © 2024 Francis Fan</p>
          <a
            href="https://github.com/francisfan0"
            className="cursor-pointer"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
          <a
            href="https://www.linkedin.com/in/francis-fan-51293a236/"
            className="cursor-pointer"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </span>
      </div>
    </div>
  );
};

export default Footer;
