import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth.js';

const authMiddleware = (request, response, next) => {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({ error: 'Token nor provided' }); // Mantido o seu texto original
  }

  const token = authToken.split(' ')[1];

  try {
    // Sem callback: se o token for inválido, ele joga o erro direto para o catch
    const decoded = jwt.verify(token, authConfig.secret);

    request.userId = decoded.id;
    request.userName = decoded.name;
    request.userIsAdmin = decoded.admin;

    return next(); // Só chama o próximo passo se o token for válido!

  } catch (_error) {
    return response.status(401).json({ error: 'Token is invalid' });
  }
};

export default authMiddleware;