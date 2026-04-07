/* ==============================================
   LINKTREE — script.js
   
   This file handles two things:
   1. Theme toggling (light/dark mode)
   2. Entrance animations (links fade in on page load)
   
   Everything runs after the DOM is fully loaded
   to make sure all HTML elements exist first.
============================================== */


/* ==============================================
   WAIT FOR DOM TO LOAD
   This wrapper ensures the script doesn't run
   until all HTML elements are available.
   Same as putting <script> before </body>,
   but this is an extra safety net.
============================================== */
document.addEventListener('DOMContentLoaded', function () {


  /* ==============================================
     THEME TOGGLE (Light / Dark Mode)
     
     How it works:
     - Reads the user's system preference (dark or light)
     - Sets data-theme on <html> to match
     - When the toggle button is clicked, it flips the theme
     - Updates the icon (sun = dark mode, moon = light mode)
     
     To change the default theme:
       Edit the data-theme="dark" on <html> in index.html
  ============================================== */

  // Find the toggle button (has data-theme-toggle attribute in HTML)
  const themeToggle = document.querySelector('[data-theme-toggle]');

  // Find the <html> element where we set data-theme
  const root = document.documentElement;

  // Check what theme is currently set (from the HTML attribute)
  let currentTheme = root.getAttribute('data-theme') || 'dark';

  // Make sure the HTML attribute matches
  root.setAttribute('data-theme', currentTheme);

  // Update the toggle icon to match the current theme
  updateToggleIcon(currentTheme);

  // Listen for clicks on the toggle button
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      // Flip the theme: dark becomes light, light becomes dark
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';

      // Apply the new theme to <html>
      root.setAttribute('data-theme', currentTheme);

      // Update the button's accessibility label
      themeToggle.setAttribute(
        'aria-label',
        'Switch to ' + (currentTheme === 'dark' ? 'light' : 'dark') + ' mode'
      );

      // Swap the icon
      updateToggleIcon(currentTheme);
    });
  }

  /**
   * Updates the toggle button icon.
   * Dark mode shows a SUN icon (click to go light).
   * Light mode shows a MOON icon (click to go dark).
   *
   * @param {string} theme - Either 'dark' or 'light'
   */
  function updateToggleIcon(theme) {
    if (!themeToggle) return;

    if (theme === 'dark') {
      // Show SUN icon (means: "click me to switch to light")
      themeToggle.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="5"/>
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
        </svg>`;
    } else {
      // Show MOON icon (means: "click me to switch to dark")
      themeToggle.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>`;
    }
  }


  /* ==============================================
     ENTRANCE ANIMATIONS
     
     How it works:
     - On page load, each link item fades in and
       slides up from below, one after another.
     - A small delay between each creates a "stagger" effect.
     
     To change the animation speed:
       Edit the animation duration in style.css (@keyframes fadeSlideUp)
     
     To change the stagger timing:
       Edit the "delay" value below (currently 80ms between each)
     
     To disable animations:
       Remove this entire section — the links will just appear.
  ============================================== */

  // Get all the link items on the page
  const linkItems = document.querySelectorAll('.link-item');

  // Add the .animate class to each link with a stagger delay
  linkItems.forEach(function (item, index) {
    // Each link starts its animation 80ms after the previous one
    // Link 1: 100ms, Link 2: 180ms, Link 3: 260ms, etc.
    const delay = 100 + index * 80;

    setTimeout(function () {
      item.classList.add('animate');
    }, delay);
  });


}); // END DOMContentLoaded
