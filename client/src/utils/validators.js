export const nameValidator = (name) => {
  if (!name) return false;
  const reg = /^[ a-zA-Z0-9_-]{3,50}$/;
  return reg.test(name);
};
export const emailValidator = (email) => {
  const reg = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/;
  return reg.test(email);
};
export const descriptionValidator = (description) => {
  if (!description) return true;
  return description.length <= 500;
};
export const passwordValidator = (password) => {
  if (!password) return false;
  return password.length >= 8 && password.length <= 80;
};
export const confirmPasswordValidator = (password, confirmPassword) => {
  if (!password || !confirmPassword) return false;
  return password === confirmPassword;
};

export function validateSignup({ username, email, password, confirmPassword }) {
  const errors = [];
  if (!nameValidator(username.trim())) {
    errors.push(
      "Invalid Username: Username must be at least 3 characters and at most 50 characters"
    );
  }
  if (!emailValidator(email.trim())) {
    errors.push("Invalid Email");
  }
  if (!passwordValidator(password)) {
    errors.push(
      "Invalid Password: Password must be at least 8 characters and at most 80 characters"
    );
  }
  if (!confirmPasswordValidator(password, confirmPassword)) {
    errors.push(
      "Invalid Password: Value of [Password] field and [Confirm Password] field don't match"
    );
  }
  return errors;
}
