// Debug helpers
window.debugApp = {
  // Reset the entire app state and reload
  reset: function () {
    console.clear();
    console.log('========================');
    console.log('Resetting application state...');
    console.log('========================');
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = window.location.origin;
  },

  // Check the current authentication state
  checkAuth: function () {
    const token = localStorage.getItem('token');
    console.log('Token exists:', !!token);
    console.log('Token value:', token);
    return {
      hasToken: !!token,
      tokenValue: token,
    };
  },

  // Create a mock login
  mockLogin: function () {
    localStorage.setItem('token', 'debug_mock_token_' + new Date().getTime());
    console.log('Mock login created');
    window.location.reload();
  },

  // Log the current redux state
  logState: function () {
    if (window.__REDUX_DEVTOOLS_EXTENSION__) {
      const state = window.__REDUX_DEVTOOLS_EXTENSION__.liftedState.computedStates.slice(-1)[0].state;
      console.log('Current Redux State:', state);
      return state;
    } else {
      console.log('Redux DevTools not available');
      return null;
    }
  },
};
