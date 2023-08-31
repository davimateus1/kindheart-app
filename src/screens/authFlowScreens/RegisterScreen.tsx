import { useState } from 'react';
import { Flex, HStack, Heading, Image, ScrollView, Text, useDisclose } from 'native-base';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

import { CameraAndGalery, CustomButton, CustomHeader, CustomInput } from 'src/components';
import { NavigationProp } from '@react-navigation/native';
import { useForm } from 'react-hook-form';

import { Masks } from 'react-native-mask-input';
import { RegisterSchema, registerSchema } from 'src/schemas';
import KindheartLogo from 'assets/kindheart-logo.png';
import { zodResolver } from '@hookform/resolvers/zod';

type RegisterScreenProps = {
  navigation: NavigationProp<Record<string, object | undefined>>;
};

export function RegisterScreen({ navigation }: RegisterScreenProps) {
  const { isOpen, onOpen, onClose } = useDisclose();
  const [show, setShow] = useState({
    password: false,
    confirmPassword: false,
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<RegisterSchema>({
    reValidateMode: 'onChange',
    resolver: zodResolver(registerSchema),
  });

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleShowPassword = (field: 'password' | 'confirmPassword') => {
    setShow(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSelectImage = (base64: string) => {
    setValue('image', base64);
  };

  const handleRegister = handleSubmit(data => {
    navigation.navigate('codeScreen');
    console.log(data);
  });

  return (
    <Flex flex={1} bgColor="white" direction="column" align="center">
      <CustomHeader
        icon={<AntDesign name="arrowleft" size={20} color="white" />}
        buttonProps={{ onPress: handleGoBack }}
      />
      <Image source={KindheartLogo} alt="kindheart-logo" mt={2} />
      <Flex direction="column" w="100%" align="center" mt={2}>
        <Heading color="brand.100" size="2xl" textAlign="center">
          Crie sua conta
        </Heading>
        <Text color="brand.200" maxW="40%" textAlign="center" mt={3}>
          Um gesto de amor que ecoa para sempre!
        </Text>
      </Flex>
      <ScrollView w="100%" maxH="60%" mt={5} overScrollMode="never">
        <HStack space={4} px={5} direction="column" w="100%">
          <Flex direction="row" justify="space-between">
            <CustomInput
              control={control}
              name="firstName"
              label="Nome"
              stackProps={{ w: '47.5%' }}
              inputProps={{ autoCapitalize: 'words', placeholder: 'Digite seu nome' }}
              error={errors.firstName}
            />
            <CustomInput
              control={control}
              name="lastName"
              label="Sobrenome"
              stackProps={{ w: '47.5%' }}
              inputProps={{ autoCapitalize: 'words', placeholder: 'Digite seu sobrenome' }}
              error={errors.lastName}
            />
          </Flex>

          <Flex direction="row" justify="space-between">
            <CustomInput
              control={control}
              name="birthDate"
              label="Data de nascimento"
              stackProps={{ w: '47.5%' }}
              inputProps={{ keyboardType: 'numeric' }}
              mask={Masks.DATE_DDMMYYYY}
              error={errors.birthDate}
            />
            <CustomInput
              control={control}
              name="cpf"
              stackProps={{ w: '47.5%' }}
              label="CPF"
              mask={Masks.BRL_CPF}
              error={errors.cpf}
            />
          </Flex>

          <Flex>
            <CustomInput
              control={control}
              name="email"
              label="E-mail"
              inputProps={{ placeholder: 'Digite seu e-mail', keyboardType: 'email-address' }}
              error={errors.email}
            />
            <CustomInput
              label="Senha"
              name="password"
              control={control}
              inputProps={{
                placeholder: 'Digite sua senha',
                secureTextEntry: !show.password,
                rightElement: (
                  <FontAwesome
                    name={show.password ? 'eye-slash' : 'eye'}
                    size={24}
                    color={errors.password ? 'red' : 'green'}
                    onPress={() => handleShowPassword('password')}
                    style={{ marginRight: 12 }}
                  />
                ),
              }}
              error={errors.password}
            />
          </Flex>
          <Flex align="center">
            <Text color="brand.50" fontSize={15} mb={1} w="100%">
              Escolha sua foto de perfil
            </Text>
            {!!watch('image') && (
              <Flex align="flex-end">
                <FontAwesome
                  name="close"
                  size={24}
                  color="red"
                  onPress={() => setValue('image', '')}
                />
                <Image
                  source={{ uri: watch('image') }}
                  alt="profile-image"
                  mb={2}
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                />
              </Flex>
            )}
            <CustomButton w="100%" onPress={onOpen}>
              <Text color="white">Escolher foto</Text>
            </CustomButton>

            <CameraAndGalery
              handleSelectImage={handleSelectImage}
              isOpen={isOpen}
              onClose={onClose}
            />
          </Flex>

          <Flex direction="row" justify="space-between">
            <CustomInput
              control={control}
              name="personalPhone"
              label="Telefone pessoal"
              stackProps={{ w: '47.5%' }}
              mask={Masks.BRL_PHONE}
              error={errors.personalPhone}
            />
            <CustomInput
              control={control}
              name="emergencyPhone"
              label="Telefone secundário"
              stackProps={{ w: '47.5%' }}
              mask={Masks.BRL_PHONE}
              error={errors.emergencyPhone}
            />
          </Flex>

          <Flex direction="row" justify="space-between">
            <CustomInput
              control={control}
              name="address"
              label="Endereço"
              inputProps={{ placeholder: 'Digite seu endereço' }}
              error={errors.address}
            />
          </Flex>
          <CustomButton
            w="100%"
            mt={1}
            py={4}
            bgColor="brand.50"
            color="brand.100"
            onPress={handleRegister}
          >
            Cadastrar
          </CustomButton>
        </HStack>
      </ScrollView>
    </Flex>
  );
}
