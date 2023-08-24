import { Flex, Heading, Image, Stack, Text } from "native-base";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";

import KindheartLogo from "../../assets/kindheart-logo.png";
import { CustomButton, CustomInput } from "../components";

import { loginRules } from "../rules";
import { LoginForm } from "../@types/form.types";

export const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginForm>({
    reValidateMode: "onSubmit",
  });

  const handleLogin = handleSubmit((data) => {
    console.log(data);
  });

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
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
            placeholder: "Digite seu e-mail",
            keyboardType: "email-address",
          }}
          error={errors.email}
          showBorderError={!!errors.email}
          rules={loginRules.email}
        />
        <CustomInput
          label="Senha"
          name="password"
          control={control}
          rules={loginRules.password}
          inputProps={{
            placeholder: "Digite sua senha",
            secureTextEntry: !showPassword,
            rightElement: (
              <FontAwesome
                name={showPassword ? "eye-slash" : "eye"}
                size={24}
                color="green"
                onPress={handleShowPassword}
                style={{ marginRight: 12 }}
              />
            ),
          }}
          error={errors.password}
          showBorderError={!!errors.password}
        />
        <Flex align="center">
          <CustomButton
            text="Entrar"
            onPress={handleLogin}
            w="100%"
            mt={5}
            py={4}
            bgColor="brand.50"
            color="brand.100"
          />
          <Text color="brand.100" mt={2}>
            Não tem uma conta?{" "}
            <Text color="brand.50" fontWeight="bold">
              Cadastre-se
            </Text>
          </Text>
        </Flex>
      </Stack>
    </Flex>
  );
};
