export const setupFooter = () => {
  const footerRoot = document.getElementById('footer-root');
  if (!footerRoot) return;

  footerRoot.innerHTML = `
    <footer>
      <div class="container">
        <p>&copy; ${new Date().getFullYear()} Boardly. "Every story deserves a board."</p>
      </div>
    </footer>
  `;
};
