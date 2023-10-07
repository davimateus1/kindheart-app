import { Flex, Spinner } from 'native-base';
import { SettingOption, SettingsHeader, InfoCard } from 'src/components';
import { useAuth } from 'src/contexts/auth';
import { useGetUserProfile } from 'src/store';

export function AllSettingsScreen() {
  const { user } = useAuth();
  const { data: userProfile, isLoading } = useGetUserProfile({
    userId: user?.id ?? 0,
    userType: user?.role ?? 'VOLUNTARY',
  });

  return (
    <Flex flex={1} bgColor="white" direction="column" align="center" p={5}>
      {isLoading ? (
        <Flex flex={1} justify="center" align="center">
          <Spinner color="brand.50" size={50} />
        </Flex>
      ) : (
        <>
          <SettingsHeader user={userProfile} />
          <Flex w="100%" direction="row" justify="space-between" mt={5}>
            <InfoCard label="Publicações" value={userProfile?.posts_count ?? 0} />
            <InfoCard label="Conexões" value={userProfile?.friends_count ?? 0} />
            <InfoCard label="Feedbacks" value={userProfile?.reviews_count ?? 0} />
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
        </>
      )}
    </Flex>
  );
}
