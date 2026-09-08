export const validateEmail = (value) => {
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
    return "Please enter a valid email address";
  }
  return null;
};

export const validatePassword = (value) => {
  if (value.length < 8) {
    return "Password must be at least 8 characters";
  }
  if (!/[A-Z]/.test(value)) {
    return "Password must contain at least one uppercase letter";
  }
  if (!/[a-z]/.test(value)) {
    return "Password must contain at least one lowercase letter";
  }
  if (!/[0-9]/.test(value)) {
    return "Password must contain at least one number";
  }
  return null;
};
