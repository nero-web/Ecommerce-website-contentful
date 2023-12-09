import "./Footer.css";

function Footer() {
  return (
    <>
      <footer>
        <div className="footer-links">
          <a href="https://twitter.com/SaadElmasrour">About</a>
          <a href="https://twitter.com/SaadElmasrour">Store locator</a>
          <a href="https://twitter.com/SaadElmasrour">FAQs</a>
          <a href="https://twitter.com/SaadElmasrour">News</a>
          <a href="https://twitter.com/SaadElmasrour">Careers</a>
          <a href="https://twitter.com/SaadElmasrour">Contact Us</a>
        </div>
        <p className="love">
          Design &nbsp; by{" "}
          <a
            target="_blank"
            rel="noreferrer"
            style={{ color: "white" }}
            href="https://github.com/saadelmasrour"
          >
            &nbsp; El Masrour
          </a>
        </p>
      </footer>
    </>
  );
}

export default Footer;
