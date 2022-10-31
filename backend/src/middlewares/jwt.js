const jwt = require('jsonwebtoken');

const verifyJWT = async(req, res, next) => {
	const tokenHeader = req.headers.authorization;
	if (!tokenHeader) return res.status(401).json({ message: 'token vazio' });

	try {
		const decoded = jwt.verify(tokenHeader, 'STRING SECRETA');
		const { id, username } = decoded;
		req.user = { id, username };
		next();
	} catch (err) {
		return res.status(500).json({ message: 'sessao expirada' });
	}
};

module.exports = verifyJWT;