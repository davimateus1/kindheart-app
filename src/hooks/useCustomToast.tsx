import React from 'react';
import { useToast, Box, Text, HStack, Icon } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

type Status = 'success' | 'error' | 'warning';

type ToastProps = {
  status: Status;
  title: string;
  description: string;
};

export const useCustomToast = () => {
  const toast = useToast();

  const getBackgroundColor = (status: Status) => {
    switch (status) {
      case 'success':
        return 'green.500';
      case 'warning':
        return 'yellow.500';
      case 'error':
        return 'red.500';
      default:
        return 'green.500';
    }
  };

  const getIcon = (status: Status) => {
    switch (status) {
      case 'success':
        return 'checkmark-circle';
      case 'warning':
        return 'warning';
      case 'error':
        return 'close-circle';
      default:
        return 'checkmark-circle';
    }
  };

  const showToast = (status: Status, title: string, description: string) => {
    toast.show({
      render: () => (
        <Box px="3" py="2" rounded="md" bg={getBackgroundColor(status)} width="100%">
          <HStack space={2} alignItems="center" w="90%">
            <Icon as={<Ionicons name={getIcon(status)} />} size="sm" color="white" />
            <Box>
              <Text color="white" fontWeight="bold">
                {title}
              </Text>
              <Text color="white" fontSize="sm">
                {description}
              </Text>
            </Box>
          </HStack>
        </Box>
      ),
    });
  };

  const showSuccessToast = ({ title, description }: Omit<ToastProps, 'status'>) => {
    showToast('success', title, description);
  };

  const showErrorToast = ({ title, description }: Omit<ToastProps, 'status'>) => {
    showToast('error', title, description);
  };

  const showWarningToast = ({ title, description }: Omit<ToastProps, 'status'>) => {
    showToast('warning', title, description);
  };

  return { showSuccessToast, showErrorToast, showWarningToast };
};
