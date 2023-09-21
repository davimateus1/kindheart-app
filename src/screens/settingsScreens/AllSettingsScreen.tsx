import { Flex } from 'native-base';
import { SettingsHeader } from 'src/components';

export function AllSettingsScreen() {
  return (
    <Flex flex={1} bgColor="white" direction="column" align="center" p={5}>
      <SettingsHeader />
    </Flex>
  );
}
