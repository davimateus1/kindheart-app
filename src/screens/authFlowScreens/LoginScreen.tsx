import { Flex, Heading, Image, Stack, Text } from 'native-base';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';

import { zodResolver } from '@hookform/resolvers/zod';
import { NavigationProp } from '@react-navigation/native';

import { CustomButton, CustomInput } from 'src/components';
import KindheartLogo from 'assets/kindheart-logo.png';
import { LoginSchema, loginSchema } from 'src/schemas';
import { useLoginUser } from 'src/store';

type LoginScreenProps = {
  navigation: NavigationProp<Record<string, object | undefined>>;
};

export function LoginScreen({ navigation }: LoginScreenProps) {
  const [showPassword, setShowPassword] = useState(false);
  const { loginUserMutate, loginUserLoading } = useLoginUser();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginSchema>({
    reValidateMode: 'onChange',
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = handleSubmit(data => {
    loginUserMutate(data);
  });

  const handleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  const handleNavigateToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <Flex flex={1} bgColor="white" direction="column" align="center">
      <Image source={KindheartLogo} alt="kindheart-logo" mt={5} />
      <Flex direction="column" w="100%" align="center">
        <Heading color="brand.100" size="2xl" maxW="50%" textAlign="center">
          Bem vindo!
        </Heading>
        <Text color="brand.200" maxW="60%" textAlign="center" mt={3}>
          Faça login para continuar conectando gerações.
        </Text>
      </Flex>
      <Stack w="100%" mt={8} px={5} space={4}>
        <CustomInput
          label="E-mail"
          name="email"
          control={control}
          inputProps={{
            placeholder: 'Digite seu e-mail',
            keyboardType: 'email-address',
          }}
          error={errors.email}
        />
        <CustomInput
          label="Senha"
          name="password"
          control={control}
          inputProps={{
            placeholder: 'Digite sua senha',
            secureTextEntry: !showPassword,
            rightElement: (
              <FontAwesome
                name={showPassword ? 'eye-slash' : 'eye'}
                size={24}
                color={errors.password ? 'red' : 'green'}
                onPress={handleShowPassword}
                style={{ marginRight: 12 }}
              />
            ),
          }}
          error={errors.password}
        />
        <Flex align="center">
          <CustomButton
            onPress={handleLogin}
            w="100%"
            mt={5}
            py={4}
            bgColor="brand.50"
            color="brand.100"
            isLoading={loginUserLoading}
          >
            Entrar
          </CustomButton>
          <Text color="brand.100" mt={2} fontSize="md">
            Não tem uma conta?{' '}
            <Text
              color="brand.50"
              fontWeight="bold"
              onPress={handleNavigateToRegister}
              textDecorationLine="underline"
            >
              Cadastre-se
            </Text>
          </Text>
        </Flex>
      </Stack>
    </Flex>
  );
}
