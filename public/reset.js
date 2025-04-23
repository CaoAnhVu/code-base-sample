// Script to reset the application state entirely
console.clear();
console.log('========================');
console.log('Restarting application with a fresh state...');
console.log('========================');

// Clear all storage
localStorage.clear();
sessionStorage.clear();

// Force a cache-busting reload
window.location.href = window.location.origin;
