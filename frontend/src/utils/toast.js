import toast from 'react-hot-toast';

/**
 * Success toast notification
 * @param {string} message - Success message to display
 */
export const successToast = (message) => {
  toast.success(message, {
    duration: 3000,
    position: 'top-right',
    style: {
      background: 'rgba(16, 185, 129, 0.2)',
      backdropFilter: 'blur(10px)',
      color: '#10B981',
      border: '1px solid rgba(16, 185, 129, 0.3)',
    },
  });
};

/**
 * Error toast notification
 * @param {string} message - Error message to display
 */
export const errorToast = (message) => {
  toast.error(message, {
    duration: 4000,
    position: 'top-right',
    style: {
      background: 'rgba(239, 68, 68, 0.2)',
      backdropFilter: 'blur(10px)',
      color: '#EF4444',
      border: '1px solid rgba(239, 68, 68, 0.3)',
    },
  });
};

/**
 * Info toast notification
 * @param {string} message - Info message to display
 */
export const infoToast = (message) => {
  toast(message, {
    duration: 3000,
    position: 'top-right',
    icon: '🔔',
    style: {
      background: 'rgba(59, 130, 246, 0.2)',
      backdropFilter: 'blur(10px)',
      color: '#3B82F6',
      border: '1px solid rgba(59, 130, 246, 0.3)',
    },
  });
};

/**
 * Loading toast notification with promise
 * @param {Promise} promise - Promise to track
 * @param {Object} messages - Object containing loading, success, and error messages
 */
export const promiseToast = (promise, messages) => {
  return toast.promise(promise, {
    loading: messages.loading || 'Loading...',
    success: messages.success || 'Success!',
    error: messages.error || 'Something went wrong',
  }, {
    position: 'top-right',
    style: {
      background: 'rgba(17, 24, 39, 0.7)',
      backdropFilter: 'blur(10px)',
      color: '#F9FAFB',
      border: '1px solid rgba(75, 85, 99, 0.3)',
    },
  });
};

// Export the toast object for direct use
export { toast };
