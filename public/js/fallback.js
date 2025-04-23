// Hide loading fallback once the app starts rendering
window.addEventListener('DOMContentLoaded', function () {
  const observer = new MutationObserver(function (mutations) {
    if (document.getElementById('root').children.length > 0) {
      document.getElementById('loading-fallback').style.display = 'none';
      observer.disconnect();
    }
  });

  observer.observe(document.getElementById('root'), { childList: true });

  // Fallback for the fallback - hide after 5 seconds regardless
  setTimeout(function () {
    const fallback = document.getElementById('loading-fallback');
    if (fallback) fallback.style.display = 'none';
  }, 5000);
});
