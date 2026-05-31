import { yupResolver } from '@hookform/resolvers/yup';
import { Center, OrbitControls, Stage, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import * as yup from 'yup';
import { Button } from '../../components/Button';
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

export function Register() {
  const navigate = useNavigate();

  const schema = yup
    .object({
      name: yup.string().required('O nome pe obrigatório!'),
      email: yup
        .string('Digite um email válido')
        .email()
        .required('O e-mail é obrigatório'),
      password: yup
        .string()
        .min(6, 'A senha deve ter pelo menos 6 caractéres')
        .required('Digite uma senha'),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'As senhas devem ser iguais')
        .required('Confirme sua senha'),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  console.log(errors);

  const onSubmit = async (data) => {
    try {
      const { status } = await api.post(
        '/users',
        {
          name: data.name,
          email: data.email,
          password: data.password,
        },
        {
          validateStatus: () => true,
        },
      );

      if (status === 201 || status === 200) {
        setTimeout(() => {
          navigate('/login');
        }, 2000);
        toast.success('Contacriada com Sucesso ✅');
      } else if (status === 409) {
        toast.error('Email lá cadastrado, faça login para continuar');
      } else {
        throw new Error();
      }
    } catch (_error) {
      toast.error('❌ Falha no sistema tente novamente');
    }
  };

  return (
    <Container>
      <LeftContainer style={{ minHeight: '100vh' }}>
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
        <Title>Criar Conta</Title>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <label htmlFor='Name'>Name</label>
            <input type='text' {...register('name')} />
            <p>{errors?.name?.message}</p>
          </InputContainer>

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

          <InputContainer>
            <label htmlFor='confirmPassword'>Confirma Senha</label>
            <input type='password' {...register('confirmPassword')} />
            <p>{errors?.confirmPassword?.message}</p>
          </InputContainer>

          <Button type='submit'>Criar conta</Button>
        </Form>
        <p>
          Já possui conta? <Link to='/login'>Clique aqui.</Link>
        </p>
      </RightContainer>
    </Container>
  );
}
