import { Flex, Heading, Image, Text } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import { CustomButton, CustomHeader, CustomInput } from 'src/components';
import { NavigationProp } from '@react-navigation/native';

import { useForm } from 'react-hook-form';
import { CodeSchema, codeSchema } from 'src/schemas';
import KindheartLogo from 'assets/kindheart-logo.png';
import { zodResolver } from '@hookform/resolvers/zod';

type CodeScreenProps = {
  navigation: NavigationProp<Record<string, object | undefined>>;
};

export function CodeScreen({ navigation }: CodeScreenProps) {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<CodeSchema>({
    reValidateMode: 'onChange',
    resolver: zodResolver(codeSchema),
  });

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleConfirmCode = handleSubmit(data => {
    console.log(data);
    navigation.navigate('success');
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
          Confirme o código recebido
        </Heading>
        <Text color="brand.200" maxW="80%" textAlign="center" mt={3}>
          insira o código de confirmação que você recebeu em seu celular. Certifique-se de digitar
          corretamente para prosseguir.
        </Text>
      </Flex>
      <Flex w="100%" align="center" my={8}>
        <Text color="brand.50">Código de confirmação</Text>
        <CustomInput
          control={control}
          name="code"
          stackProps={{ w: '50%' }}
          inputProps={{
            py: 3,
            fontSize: 24,
            maxLength: 6,
            letterSpacing: 4,
            fontWeight: 'bold',
            textAlign: 'center',
            keyboardType: 'numeric',
          }}
          errorStyle={{ justifyContent: 'center', alignItems: 'center' }}
          error={errors.code}
        />
      </Flex>
      <Flex w="100%" mt={4} px={4} align="center">
        <CustomButton
          w="100%"
          mt={1}
          py={4}
          bgColor="brand.50"
          color="brand.100"
          onPress={handleConfirmCode}
        >
          Confirmar
        </CustomButton>
        <Text color="brand.100" mt={2} fontSize="md">
          Não recebeu o código?{' '}
          <Text color="brand.50" fontWeight="bold" textDecorationLine="underline">
            Reenviar código
          </Text>
        </Text>
      </Flex>
    </Flex>
  );
}
