import { Flex, Image, ScrollView, Text } from 'native-base';
import { convertISODate } from 'src/utils';
import { useElderlyAction } from 'src/store';
import { useAuth } from 'src/contexts/auth';
import { CustomButton } from './CustomButton';

type ActionActivityCardProps = {
  photo?: string;
  description?: string;
  createdAt?: string;
  userSenderId: number;
  activityId: number;
  chatId: number;
  acticityStatus?: string;
  userSenderName: string;
  messageMutate: (data: { chat_id: string; author_id: string; text: string }) => void;
};

export function ActionActivityCard({
  photo,
  description,
  createdAt,
  userSenderId,
  userSenderName,
  activityId,
  chatId,
  acticityStatus,
  messageMutate,
}: ActionActivityCardProps) {
  const { user } = useAuth();
  const { actionMutate, actionLoading } = useElderlyAction();

  const renderChatMessage = (action: 'STARTED' | 'CANCELED' | 'FINISHED') => {
    if (action === 'STARTED') {
      return 'iniciada, boa sorte na atividade!';
    }

    if (action === 'CANCELED') {
      return 'rejeitada, mas não desista, tente novamente!';
    }

    return 'finalizada, parabéns por transformar o mundo em um lugar melhor!';
  };

  const handleAction = (action: 'STARTED' | 'CANCELED' | 'FINISHED') => {
    messageMutate({
      chat_id: String(chatId),
      author_id: String(user?.id),
      text: `Essa atividade foi ${renderChatMessage(action)}`,
    });

    actionMutate({
      action,
      activity_id: String(activityId),
      chat_id: String(chatId),
      elderly_id: String(user?.id),
      voluntary_id: String(userSenderId),
    });
  };

  const renderActivityStatusMessage = () => {
    if (acticityStatus === 'STARTED') {
      return 'está realizando a atividade';
    }

    if (acticityStatus === 'CANCELED') {
      return 'rejeitou a atividade';
    }

    return 'tem interesse na atividade';
  };

  return (
    <Flex w="100%" h="100%" borderBottomColor="brand.400" borderBottomWidth={1} justify="center">
      <ScrollView w="100%" h="100%" overScrollMode="never">
        <Flex direction="column" w="100%" px="5">
          <Flex direction="row">
            <Image source={{ uri: photo }} alt="image" size="sm" rounded="md" />
            <Flex justify="center" ml={2} maxW="75%">
              <Text noOfLines={2} color="brand.200">
                <Text fontWeight="bold">{convertISODate(createdAt ?? '')} - </Text>
                <Text>{description}</Text>
              </Text>
              <Text fontSize="xs" color="brand.400" noOfLines={2}>
                @{userSenderName} {renderActivityStatusMessage()}
              </Text>
            </Flex>
          </Flex>
          <Flex direction="row" w="100%" justify="flex-end">
            {acticityStatus === 'STARTED' ? (
              <CustomButton
                w="70%"
                h={8}
                p={0}
                mr={5}
                bg="green.500"
                borderWidth={1}
                borderColor="brand.400"
                _pressed={{ bg: 'red.500' }}
                isLoading={actionLoading}
                onPress={() => handleAction('FINISHED')}
              >
                Finalizar atividade
              </CustomButton>
            ) : (
              <>
                <CustomButton
                  w="35%"
                  h={8}
                  p={0}
                  mr={5}
                  bg="red.500"
                  borderWidth={1}
                  borderColor="brand.400"
                  _pressed={{ bg: 'red.500' }}
                  isLoading={actionLoading}
                  onPress={() => handleAction('CANCELED')}
                >
                  Rejeitar
                </CustomButton>
                <CustomButton
                  w="35%"
                  h={8}
                  p={0}
                  bg="green.500"
                  borderWidth={1}
                  borderColor="brand.400"
                  _pressed={{ bg: 'green.500' }}
                  isLoading={actionLoading}
                  onPress={() => handleAction('STARTED')}
                >
                  Aceitar
                </CustomButton>
              </>
            )}
          </Flex>
        </Flex>
      </ScrollView>
    </Flex>
  );
}
