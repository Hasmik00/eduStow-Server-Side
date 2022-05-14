import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import authRepository from '../repository/user.repository.js';
import { to } from 'await-to-js';

class AuthService {
	static async signUp(name, email, password) {
		const [error, user] = await to(authRepository.getUserByEmail(email));

		if (user || error) {
			throw new Error(`This email ${email} is taken`);
		}
		const [, hashedPassword] = await to(bcrypt.hash(password, 12));

		const [err, newUser] = await to(
			authRepository.createNewUser(name, email, hashedPassword)
		);

		if (err) {
			throw new Error(err);
		}

		return newUser;
	}

	static async signIn(email, password) {
		const [, user] = await to(authRepository.getUserByEmail(email));

		if (!user) {
			throw new Error(`No user with this email ${email} is found!`);
		}
		const [error, doMatch] = await to(bcrypt.compare(password, user.password));

		if (error || !doMatch) {
			throw new Error('authentication failed');
		}

		const token = await jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN, {
			expiresIn: '1h',
		});
		return token;
	}
}
export default AuthService;
