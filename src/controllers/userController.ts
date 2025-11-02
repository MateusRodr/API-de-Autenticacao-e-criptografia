import { RequestHandler } from 'express';
import User from '../models/User';
import { hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';

export const createUser: RequestHandler = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ error: 'Usuário já cadastrado com este email.' });
    }

    const hash_password = await hash(password, 8);

    const newUser = await User.create({ name, email, password: hash_password });

    const token = sign({ id: newUser.id }, "secret", { expiresIn: '1d' });


    return res.status(201).json({user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    },
  token,
});
  } catch (error: any) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: 'Erro ao criar usuário', details: error.message });
  }
};


export const getALl: RequestHandler = async (req, res) => {
  try{
    const users = await User.findAll();
    res.json({users})
  } catch(error){
    res.status(500).json({error: 'Erro ao buscar usuários'})
  }
};