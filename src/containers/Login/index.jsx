import { yupResolver } from '@hookform/resolvers/yup';
import { Center, OrbitControls, Stage, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import * as yup from 'yup';
import { Button } from '../../components/Button';
import { useUser } from '../../hooks/UserContext';
import { api } from '../../services/api';
import {
  Container,
  Form,
  InputContainer,
  LeftContainer,
  Link,
  RightContainer,
  Title,
} from './styles';

function DevBurguerModel() {
  const { scene } = useGLTF('/hitem3d.glb');
  return <primitive object={scene} />;
}

export function Login() {
  const navigate = useNavigate();
  const { putUserData } = useUser();

  const schema = yup
    .object({
      email: yup
        .string('Digite um email válido')
        .email()
        .required('O e-mail é obrigatório'),
      password: yup
        .string()
        .min(6, 'A senha deve ter pelo menos 6 caractéres')
        .required('Digite uma senha'),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

 const onSubmit = async (data) => {
  try {
    const response = await toast.promise(
      api.post('/sessions', {
        email: data.email,
        password: data.password,
      }),
      {
        pending: 'Verificando dados ⏳',
        success: 'Seja bem-vindo! 🚪',
        error: 'Email ou senha incorreto 🔒⚠️',
      },
    );

    const userData = response.data;
    putUserData(userData);

    setTimeout(() => {
      if (userData?.admin) {
        navigate('/admin/pedidos');
      } else {
        navigate('/');
      }
    }, 2000);

  } catch (_error) {
    toast.error('❌ Falha no sistema tente novamente');
  }
};

  return (
    <Container>
      <LeftContainer style={{ minHeight: '100vh' }}>
        {/* O Canvas precisa de um container com altura para aparecer */}
        <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
          <Suspense fallback={null}>
            <Stage environment='city' intensity={0.6} adjustCamera={true}>
              <Center>
                <DevBurguerModel />
              </Center>
            </Stage>
          </Suspense>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={true}
            autoRotateSpeed={4}
          />
        </Canvas>
      </LeftContainer>

      <RightContainer>
        <Title>
          Ola seja bem vindo ao <span>Dev Burguer!</span> <br />
          Acesse com seu <span>Login e senha</span>
        </Title>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <label htmlFor='Email'>Email</label>
            <input type='email' {...register('email')} />
            <p>{errors?.email?.message}</p>
          </InputContainer>

          <InputContainer>
            <label htmlFor='Senha'>Senha</label>
            <input type='password' {...register('password')} />
            <p>{errors?.password?.message}</p>
          </InputContainer>

          <Button type='submit'>Entrar</Button>
        </Form>
        <p>
          Não possui conta? <Link to='/cadastro'>Clique aqui.</Link>
        </p>
      </RightContainer>
    </Container>
  );
}
