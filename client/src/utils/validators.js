export const channelNameValidator = (channelName) => {
  if (!channelName) return false;
  const reg = /^[ a-zA-Z0-9_-]{3,50}$/;
  return reg.test(channelName);
};
export const channelDescriptionValidator = (description) => {
  if (!description) return true;
  return description.length <= 500;
};
export const channelPasswordValidator = (password) => {
  if (!password) return false;
  return password.length >= 8 && password.length <= 80;
};
export const channelConfirmPasswordValidator = (password, confirmPassword) => {
  if (!password || !confirmPassword) return false;
  return password === confirmPassword;
};
