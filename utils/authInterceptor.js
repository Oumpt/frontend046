// 🛡️ Global Auth Interceptor - Auto logout on 401/403
export const setupAuthInterceptor = () => {
  // Override fetch globally
  const originalFetch = window.fetch;
  
  window.fetch = async (...args) => {
    const [url, options = {}] = args;
    
    try {
      const response = await originalFetch(url, options);
      
      // Check for auth errors
      if (response.status === 401 || response.status === 403) {
        // Auto logout
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('username');
        
        // Show alert and redirect
        if (typeof window !== 'undefined') {
          const message = response.status === 401 ? 
            'Session expired. Please login again.' : 
            'Access denied. Please login again.';
            
          // Use SweetAlert if available, otherwise alert
          if (window.Swal) {
            await window.Swal.fire({
              icon: 'warning',
              title: 'Authentication Required',
              text: message,
              confirmButtonColor: '#d33',
            });
          } else {
            alert(message);
          }
          
          // Redirect to login
          window.location.href = '/login';
        }
      }
      
      return response;
    } catch (error) {
      // Handle network errors
      if (error.message.includes('401') || error.message.includes('403')) {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('username');
        window.location.href = '/login';
      }
      throw error;
    }
  };
};

// 🎯 Hook for role change detection
export const handleRoleChangeResponse = (result) => {
  if (result.success && result.message && result.message.includes('login again')) {
    // Force logout on role change
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    
    // Show role change message
    if (typeof window !== 'undefined' && window.Swal) {
      window.Swal.fire({
        icon: 'info',
        title: 'Role Updated',
        text: 'Your role has been changed. Please login again to continue.',
        confirmButtonColor: '#3b82f6',
      }).then(() => {
        window.location.href = '/login';
      });
    } else {
      alert('Your role has been changed. Please login again.');
      window.location.href = '/login';
    }
    
    return true; // Indicate role change handled
  }
  
  return false; // No role change
};
