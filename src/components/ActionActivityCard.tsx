import { Flex, Image, Text } from 'native-base';
import { convertISODate } from 'src/utils';
import { useElderlyAction } from 'src/store';
import { useAuth } from 'src/contexts/auth';
import { CustomButton } from './CustomButton';

type ActionActivityCardProps = {
  photo?: string;
  description?: string;
  createdAt?: string;
  userSenderId: string;
  activityId: string;
  chatId: string;
  acticityStatus?: string;
  userSenderName: string;
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
}: ActionActivityCardProps) {
  const { user } = useAuth();
  const { actionMutate, actionLoading } = useElderlyAction();

  const handleReject = (action: 'STARTED' | 'CANCELED' | 'FINISHED') => {
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
      <Flex direction="column" w="100%" px="5">
        <Flex direction="row">
          <Image source={{ uri: photo }} alt="image" size="sm" rounded="md" />
          <Flex justify="center" ml={2} maxW="75%">
            <Text noOfLines={2} color="brand.200">
              <Text fontWeight="bold">{convertISODate(createdAt ?? '')} - </Text>
              <Text>{description}</Text>
            </Text>
            <Text fontSize="xs" color="brand.400" noOfLines={2}>
              @{userSenderName} {renderActivityStatusMessage()} a a a a a a a a ad asd ad as
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
              onPress={() => handleReject('FINISHED')}
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
                onPress={() => handleReject('CANCELED')}
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
                onPress={() => handleReject('STARTED')}
              >
                Aceitar
              </CustomButton>
            </>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}
