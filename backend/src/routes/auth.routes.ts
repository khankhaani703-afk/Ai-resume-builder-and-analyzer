import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';
import { registerValidation, loginValidation, handleValidationErrors } from '../middleware/validation';

const router = Router();

router.post('/register', registerValidation, handleValidationErrors, register);
router.post('/login', loginValidation, handleValidationErrors, login);

export default router;
