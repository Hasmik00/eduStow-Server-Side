import { check, body } from 'express-validator';

export const signUpValidator = () => {
	return check('email').isEmail(), body('password').isLength({ min: 5 });
};

export const logInValidator = () => {
	return body('email').isEmail(), body('password').isLength({ min: 5 });
};
