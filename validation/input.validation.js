import { body, check } from "express-validator";

export const categoryValidation = () => {
  return (
    body("title").isLength({ min: 5 }), body("description").isLength({ min: 5 })
  );
};

export const subCategoryValidator = () => {
  return (
    check("title").isString().isLength({ min: 3 }),
    body("description").isLength({ min: 5 })
  );
};

export const courseValidator = () => {
  return (
    check("title").isString().isLength({ min: 3 }),
    body("description").isLength({ min: 5 })
  );
};
