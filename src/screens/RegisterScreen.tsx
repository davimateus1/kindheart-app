import { Flex, HStack, Heading, Image, ScrollView, Text } from 'native-base';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

import { CustomHeader, CustomInput } from 'src/components';
import { NavigationProp } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { Masks } from 'react-native-mask-input';
import { useState } from 'react';
import KindheartLogo from '../../assets/kindheart-logo.png';

type RegisterScreenProps = {
  navigation: NavigationProp<Record<string, object | undefined>>;
};

export function RegisterScreen({ navigation }: RegisterScreenProps) {
  const [show, setShow] = useState({
    password: false,
    confirmPassword: false,
  });

  const { control } = useForm();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleShowPassword = (field: 'password' | 'confirmPassword') => {
    setShow(prev => ({ ...prev, [field]: !prev[field] }));
  };

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
            />
            <CustomInput
              control={control}
              name="lastName"
              label="Sobrenome"
              stackProps={{ w: '47.5%' }}
              inputProps={{ autoCapitalize: 'words', placeholder: 'Digite seu sobrenome' }}
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
            />
            <CustomInput
              control={control}
              name="cpf"
              stackProps={{ w: '47.5%' }}
              label="CPF"
              mask={Masks.BRL_CPF}
            />
          </Flex>

          <Flex>
            <CustomInput
              control={control}
              name="email"
              label="E-mail"
              inputProps={{ placeholder: 'Digite seu e-mail', keyboardType: 'email-address' }}
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
                    color="green"
                    onPress={() => handleShowPassword('password')}
                    style={{ marginRight: 12 }}
                  />
                ),
              }}
            />
            <CustomInput
              label="Confirmar senha"
              name="confirmPassword"
              control={control}
              inputProps={{
                placeholder: 'Confirme sua senha',
                secureTextEntry: !show.confirmPassword,
                rightElement: (
                  <FontAwesome
                    name={show.confirmPassword ? 'eye-slash' : 'eye'}
                    size={24}
                    color="green"
                    onPress={() => handleShowPassword('confirmPassword')}
                    style={{ marginRight: 12 }}
                  />
                ),
              }}
            />
          </Flex>

          {/* Aqui será o input de inserir foto */}

          <Flex direction="row" justify="space-between">
            <CustomInput
              control={control}
              name="personalPhone"
              label="Telefone pessoal"
              stackProps={{ w: '47.5%' }}
              mask={Masks.BRL_PHONE}
            />
            <CustomInput
              control={control}
              name="emergencyPhone"
              label="Telefone secundário"
              stackProps={{ w: '47.5%' }}
              mask={Masks.BRL_PHONE}
            />
          </Flex>

          <Flex direction="row" justify="space-between">
            <CustomInput
              control={control}
              name="Endereço"
              label="Endereço"
              inputProps={{ placeholder: 'Digite seu endereço' }}
            />
          </Flex>
        </HStack>
      </ScrollView>
    </Flex>
  );
}
