import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t-2 border-black dark:border-white/20 py-6 bg-background dark:bg-black">
      <div className="container mx-auto px-6">
        <p className="text-sm font-medium text-muted-foreground text-center">
          &copy; {new Date().getFullYear()}{" "}
          <Link
            to="https://t.me/the_developer_guide"
            target="_blank"
            rel="noopener noreferrer"
            className="font-black text-foreground hover:opacity-70 transition-opacity"
          >
            DevGuide
          </Link>{" "}
          — Interview Hub. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
