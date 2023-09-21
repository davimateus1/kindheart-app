import { Flex } from 'native-base';
import { SettingOption, SettingsHeader, InfoCard } from 'src/components';

export function AllSettingsScreen() {
  return (
    <Flex flex={1} bgColor="white" direction="column" align="center" p={5}>
      <SettingsHeader />
      <Flex w="100%" direction="row" justify="space-between" mt={5}>
        <InfoCard label="Publicações" value={17} />
        <InfoCard label="Conexões" value={54} />
        <InfoCard label="Feedbacks" value={64} />
      </Flex>
      <Flex w="100%" direction="column" justify="space-between" mt={5}>
        <SettingOption
          title="Cuidados com idosos"
          description="Veja dicas indispensáveis com os idosos"
          navigateFor="Tips"
          onEmphasis
        />
        <SettingOption
          title="Mensagens"
          description="Interaja com suas conexões"
          navigateFor="Messages"
          messagesCount={4}
        />
        <SettingOption
          title="Estatuto do idoso"
          description="Conheça os direitos valiosos dos idosos"
          navigateFor="ElderlyStatute"
        />
      </Flex>
    </Flex>
  );
}
