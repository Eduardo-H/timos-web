import Head from 'next/head';
import Image from 'next/image';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Divider, Flex, Heading, Link, Stack, Text } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/toast';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BsDot } from 'react-icons/bs';
import { FiLock, FiMail } from 'react-icons/fi';

import { useAuth } from 'hooks/useAuth';
import { Input } from 'components/Input';
import { Button } from 'components/Button';

import guySvg from '../assets/guy.svg';
import laptopSvg from '../assets/laptop.svg';
import logo from '../assets/logo.svg';

type SignInFormData = {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória')
});

export default function Home() {
  const { signIn } = useAuth()
  const toast = useToast();

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema)
  });

  const handleSignIn: SubmitHandler<SignInFormData> = async (data) => {
    try {
      await signIn({ email: data.email, password: data.password });

      toast({
        title: 'Sucesso',
        description: 'Autenticação realizada com sucesso',
        status: 'success',
        isClosable: true,
      });
    } catch (err: any) {
      if (err.response.status === 400) {
        return toast({
          title: 'Erro',
          description: 'E-mail e/ou senha incorretos',
          status: 'error',
          isClosable: true,
        });
      }
      
      toast({
        title: 'Erro',
        description: 'Falha ao tentar realizar a autenticação',
        status: 'error',
        isClosable: true,
      });
    }
  }

  return (
    <>
      <Head>
        <title>Timos | Login</title>
      </Head>

      <Flex
        w="100vw"
        h="100vh"
        align="center"
        justify={{ base: 'center', md: 'space-around' }}
      >
        <Flex
          align="center"
          justify="center"
          direction="column"
          display={{ base: 'none', lg: 'flex' }}
        >
          <Heading align="center" fontSize="3rem" mb="2">
            Bem-vindo(a) ao Timos!
          </Heading>
          <Text align="center" fontSize="1.2rem" fontWeight="medium">
            Não esqueça nunca mais de seus empréstimos.
          </Text>

          <Flex align="flex-start" mt="5">
            <Image src={guySvg} height={500} width={300} quality={100} className="floating" />
            <Image src={laptopSvg} height={200} width={200} quality={100} className="floating-reverse" />
          </Flex>
        </Flex>

        <Flex px={{ base: '5', md: '0' }}>
          <Flex
            as="form"
            w={{ base: '100%', md: 450 }}
            py="7"
            px={{ base: '6', md: '10' }}
            bg="blue.700"
            borderRadius="5"
            direction="column"
            onSubmit={handleSubmit(handleSignIn)}
          >
            <Stack spacing="4">
              <Image src={logo} width={80} height={80} />

              <Text 
                align="center"
                fontSize="1.5rem"
                fontWeight="medium"
              >
                Login
              </Text>

              <Input 
                placeholder="E-mail" 
                type="email"
                w="100%"
                icon={FiMail}
                error={formState.errors.email}
                {...register('email')}
              />

              <Input 
                placeholder="Senha"
                type="password" 
                w="100%"
                icon={FiLock}
                error={formState.errors.password}
                {...register('password')}
              />
            </Stack>

            <Stack spacing="4" align="center" mt="8">
              <Button 
                type="submit"
                title="Entrar" 
                size="lg" 
                width={{ base: '100%', md: '50%' }}
              />

              <Link color="gray.300">
                Esqueci minha senha
              </Link>

              <Flex width="100%" justify="space-between" align="center">
                <Divider borderColor="gray.300" width="45%" />
                <BsDot color="#CCCCCC" width="1.5" height="1.5" />
                <Divider borderColor="gray.300" width="45%" />
              </Flex>

              <Text color="gray.300" align="center">
                Não possui uma conta?  
                <Link color="blue.100" ml="1">
                  Crie uma agora
                </Link>
              </Text>
            </Stack>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}