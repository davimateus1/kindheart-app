import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { Flex, ScrollView, Text } from 'native-base';
import { ChatBubble, CustomButton, CustomHeader, CustomInput } from 'src/components';

import { useForm } from 'react-hook-form';
import { useGetUserChat } from 'src/store';
import { ActionActivityCard } from 'src/components/ActionActivityCard';

type ChatScreenProps = {
  navigation: NavigationProp<Record<string, object | undefined>>;
  route: RouteProp<Record<string, { chatId: string; userSenderId: string; activityId: string }>>;
};

export function ChatScreen({ navigation, route }: ChatScreenProps) {
  const { chatId, userSenderId, activityId } = route.params;

  const { data: chat } = useGetUserChat({ chatId, activityId, userSenderId });

  const isElderly = chat?.activity?.user_elderly_id === Number(userSenderId);

  const {
    control,
    formState: { errors },
  } = useForm();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleGoElderlyStatute = () => {
    navigation.navigate('ElderlyStatute');
  };

  return (
    <Flex flex={1} bgColor="white" direction="column" align="center">
      <CustomHeader
        icon={<AntDesign name="arrowleft" size={20} color="white" />}
        buttonProps={{ onPress: handleGoBack }}
        justify="space-between"
      >
        <Flex w="100%" justify="space-between" direction="row">
          <Flex direction="row" align="center" w="75%">
            <Flex
              bg="green.500"
              borderRadius={50}
              w={3}
              h={3}
              justify="center"
              align="center"
              mx={2}
            />
            <Text color="brand.200" fontWeight="bold">
              {chat?.user_receiver.first_name} {chat?.user_receiver.last_name}
            </Text>
          </Flex>
          <Flex w="25%" justify="flex-start" direction="row" align="center">
            <CustomButton
              w={10}
              h={10}
              bg="opacity.green-40"
              rounded="full"
              p="0"
              display="flex"
              justifyContent="center"
              alignItems="center"
              _pressed={{ bg: 'opacity.green-40' }}
              onPress={handleGoElderlyStatute}
            >
              <Ionicons name="alert-circle-outline" size={30} color="#28CD56" />
            </CustomButton>
          </Flex>
        </Flex>
      </CustomHeader>

      <Flex flex={1} direction="column" align="center" w="100%">
        {isElderly && (
          <Flex h="17%" w="100%">
            <ActionActivityCard
              description={chat?.activity?.description}
              photo={chat?.activity?.image}
              createdAt={chat?.activity?.created_at}
            />
          </Flex>
        )}
        <Flex h={isElderly ? '70%' : '87%'} bg="opacity.green-40" w="100%" px={5}>
          <ScrollView w="100%" overScrollMode="never" mb={2}>
            <ChatBubble
              isMyMessage={false}
              message="Olá, tudo bem? Estou interessado em comprar o seu produto. Podemos negociar?"
              userAvatar="https://avatars.githubusercontent.com/u/66326378?v=4"
              key={1}
            />
          </ScrollView>
        </Flex>
        <Flex
          h="13%"
          w="100%"
          direction="row"
          justify="space-between"
          align="center"
          p={3}
          borderTopWidth={1}
          borderTopColor="brand.400"
        >
          <CustomInput
            control={control}
            name="message"
            stackProps={{ w: '85%' }}
            inputProps={{
              placeholder: 'Digite sua mensagem...',
              bg: 'opacity.green-40',
              color: 'brand.200',
              _focus: { borderColor: 'brand.50', bg: 'opacity.green-40' },
            }}
            error={errors.message}
          />
          <Flex w="15%" align="flex-end">
            <CustomButton
              w={12}
              h={12}
              bg="brand.50"
              rounded="full"
              p="0"
              display="flex"
              justifyContent="center"
              alignItems="center"
              _pressed={{ bg: 'opacity.green-40' }}
            >
              <Feather name="send" size={25} color="white" />
            </CustomButton>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
