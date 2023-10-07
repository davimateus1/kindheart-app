import { Flex, Text } from 'native-base';
import { Dispatch, SetStateAction } from 'react';
import { CustomButton } from './CustomButton';

type TabsProps = {
  tabIndex: 0 | 1;
  setTabIndex: Dispatch<SetStateAction<0 | 1>>;
};

export function Tabs({ tabIndex, setTabIndex }: TabsProps) {
  const isActiveTab = (index: number) => index === tabIndex;

  return (
    <Flex direction="row" w="100%" justify="space-around" mt={5}>
      <Flex
        w="50%"
        align="center"
        borderBottomColor="brand.50"
        borderBottomWidth={isActiveTab(0) ? 2 : 0}
      >
        <CustomButton
          bg="transparent"
          w="100%"
          borderRadius={0}
          _pressed={{ bg: 'transparent' }}
          onPress={() => setTabIndex(0)}
        >
          <Text
            fontWeight="bold"
            color="brand.200"
            w="100%"
            textAlign="center"
            opacity={isActiveTab(0) ? 1 : 0.5}
          >
            Ativas
          </Text>
        </CustomButton>
      </Flex>
      <Flex
        w="50%"
        align="center"
        borderBottomColor="brand.50"
        borderBottomWidth={isActiveTab(1) ? 2 : 0}
      >
        <CustomButton
          bg="transparent"
          w="100%"
          borderRadius={0}
          _pressed={{ bg: 'transparent' }}
          onPress={() => setTabIndex(1)}
        >
          <Text
            fontWeight="bold"
            color="brand.200"
            w="100%"
            textAlign="center"
            opacity={isActiveTab(1) ? 1 : 0.5}
          >
            Encerradas
          </Text>
        </CustomButton>
      </Flex>
    </Flex>
  );
}
