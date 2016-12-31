
export const validate = (user) => {
  return user.userName && user.level;
}

export const DEFAULT_USER_NAME = 'Unnamed';