export const tryCatch = (func) => {
  return async (req, res, next) => {
    try {
      await Promise.resolve(func(req, res, next));
    } catch (err) {
      next(err);
    }
  };
};
