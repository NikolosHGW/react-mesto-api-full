import React from "react";

export default React.memo(() => {
  return (
    <footer className="footer">
      <p className="footer__copy">&copy; {new Date().getFullYear()} Mesto Russia</p>
    </footer>
  );
});
