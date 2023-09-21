import { AntDesign } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';
import { Divider, Flex, Heading, ScrollView, Text } from 'native-base';
import { CustomButton, CustomHeader } from 'src/components';
import { Linking } from 'react-native';

type ElderlyStatuteScreenProps = {
  navigation: NavigationProp<Record<string, object | undefined>>;
};

const sections = [
  {
    title: '',
    content:
      'Bem-vindo à página dedicada ao Estatuto do Idoso! Aqui você encontrará informações valiosas sobre os direitos e proteção concedidos aos idosos no Brasil. Nosso objetivo é conscientizar, informar e promover a igualdade, respeito e dignidade para essa importante parcela da população. Continue lendo para descobrir os principais pontos abordados pelo Estatuto do Idoso.',
  },
  {
    title: 'Seção 1: Direitos Fundamentais dos Idosos e Moradia Digna',
    content:
      'O Estatuto do Idoso estabelece uma série de direitos fundamentais para garantir a proteção e o bem-estar dos idosos. Entre esses direitos, destacam-se o direito à vida, à saúde e à moradia digna. Além disso, os idosos têm prioridade absoluta em receber atendimento preferencial em serviços públicos e privados, proteção contra discriminação e violência, e acesso a um ambiente seguro e livre de abusos.',
  },
  {
    title: 'Seção 2: Benefícios, Assistência Social e Saúde Integral',
    content:
      'O Estatuto do Idoso também prevê benefícios e medidas de assistência social. Os idosos têm direito a benefícios previdenciários, como aposentadoria, que garantem uma renda e qualidade de vida adequadas na terceira idade. Além disso, o estatuto assegura atendimento integral à saúde, incluindo prevenção, tratamento e reabilitação de doenças comuns à terceira idade. Também são estabelecidas medidas de proteção para idosos em situação de vulnerabilidade, como o amparo social, acolhimento institucional e programas de inclusão social.',
  },
  {
    title: 'Seção 3: Conscientização, Combate à Violência e Denúncia',
    content:
      'É essencial conscientizar a sociedade sobre a importância de respeitar e proteger os idosos. O Estatuto do Idoso promove campanhas de conscientização para disseminar informações sobre os direitos dos idosos, abuso, negligência e violência. Além disso, estabelece mecanismos para denunciar casos de violência contra os idosos e prevê punições para os agressores. O objetivo é combater a violência e garantir um ambiente seguro e acolhedor para os idosos.',
  },
];

export function ElderlyStatuteScreen({ navigation }: ElderlyStatuteScreenProps) {
  const statuteLink =
    'https://www.gov.br/mdh/pt-br/centrais-de-conteudo/pessoa-idosa/estatuto-da-pessoa-idosa.pdf/view';

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleOpenStatute = () => {
    Linking.openURL(statuteLink);
  };

  const createSection = (title?: string, content?: string) => (
    <Flex direction="column" align="flex-start" px={5} py={2}>
      <Heading color="brand.100" fontWeight="bold" fontSize="xl">
        {title}
      </Heading>
      <Text color="brand.400" fontWeight="200" fontSize="md">
        {content}
      </Text>
    </Flex>
  );

  return (
    <Flex flex={1} bgColor="white" direction="column" align="center">
      <CustomHeader
        icon={<AntDesign name="arrowleft" size={20} color="white" />}
        buttonProps={{ onPress: handleGoBack }}
      >
        <Heading color="brand.100" fontWeight="bold" fontSize="lg" textAlign="center">
          Estatuto do Idoso
        </Heading>
      </CustomHeader>
      <ScrollView w="100%" overScrollMode="never">
        {sections.map((section, index) => (
          <>
            {createSection(section.title, section.content)}
            {index !== sections.length - 1 && <Divider w="100%" my={2} bg="brand.300" />}
          </>
        ))}
        <Flex w="100%" align="center" my={5}>
          <CustomButton onPress={handleOpenStatute}>
            <Text color="white" fontWeight="bold" fontSize="lg">
              Clique para saber mais
            </Text>
          </CustomButton>
        </Flex>
      </ScrollView>
    </Flex>
  );
}
