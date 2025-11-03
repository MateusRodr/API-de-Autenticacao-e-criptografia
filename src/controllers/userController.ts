import { container } from 'tsyringe';
import { RequestHandler } from 'express';
import { UserService } from '../services/user.service';
import { hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';


const userService = container.resolve(UserService);

export const createUser: RequestHandler = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await userService.findByEmail(email);
    if (userExists) {
      return res.status(400).json({ error: 'Usuário já cadastrado com este email.' });
    }

    const hash_password = await hash(password, 8);

    const newUser = await userService.create({ name, email, password: hash_password });

    const token = sign({ id: newUser.id }, "secret", { expiresIn: '1d' });

    return res.status(201).json({
      user: {
        id: newUser.id,
        name: newUser.getName(),
        email: newUser.getEmail(),
      },
      token,
    });
  } catch (error: any) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: 'Erro ao criar usuário', details: error.message });
  }
};

export const getAll: RequestHandler = async (req, res) => {
  try {
    const users = await userService.findAll();
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
};
