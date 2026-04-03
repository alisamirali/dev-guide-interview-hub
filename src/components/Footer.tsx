import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-4 relative">
      <p className="text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()}{" "}
        <Link
          to="https://t.me/the_developer_guide"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-foreground hover:opacity-70 transition-opacity hover:underline"
        >
          DevGuide
        </Link>{" "}
        - Interview Hub. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
