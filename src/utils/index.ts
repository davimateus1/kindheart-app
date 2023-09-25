import HandsIcon from 'assets/images/hands.png';
import BalloonIcon from 'assets/images/chat-balloon.png';
import SirenIcon from 'assets/images/siren.png';
import TowelIcon from 'assets/images/towel.png';
import HygieneImage from 'assets/images/hygiene.png';
import SecurityImage from 'assets/images/security.png';
import CommunicationImage from 'assets/images/communication.png';
import EmergencyImage from 'assets/images/emergency.png';
import { StatusType } from 'src/@types/authTypes';

export const elderlyStatuteSection = [
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

export const elderlyTipsSection = [
  {
    image: TowelIcon,
    title: 'Higiene',
    path: 'Hygiene',
  },
  {
    image: HandsIcon,
    title: 'Segurança',
    path: 'Security',
  },
  {
    image: BalloonIcon,
    title: 'Comunicação e atenção',
    path: 'Communication',
  },
  {
    image: SirenIcon,
    title: 'Emergência',
    path: 'Emergency',
  },
];

export const hygieneTips = {
  headTitle: 'Higiene',
  title:
    'A higiene adequada é essencial para manter o conforto e a saúde dos idosos. Aqui estão algumas dicas detalhadas sobre os cuidados necessários:',
  image: HygieneImage,
  list: [
    'Auxilie na higiene diária, como banho, troca de roupas e escovação dos dentes, adaptando-se às preferências e necessidades do idoso.',
    'Mantenha a pele limpa e seca, prestando atenção especial a áreas de dobras, como axilas e virilhas. Use produtos suaves e hidratantes.',
    'Realize a higiene íntima de forma delicada e respeitosa, utilizando produtos específicos e seguindo as preferências do idoso.',
    'Assegure a higiene das mãos antes e após qualquer procedimento de cuidado, utilizando água e sabão ou desinfetante para as mãos.',
  ],
};

export const securityTips = {
  headTitle: 'Segurança',
  title:
    'A segurança é primordial para a proteção dos idosos. Aqui estão algumas medidas importantes a serem consideradas:',
  image: SecurityImage,
  list: [
    'Garanta um ambiente livre de obstáculos e bem iluminado para evitar quedas e acidentes. Remova tapetes soltos, cabos elétricos e outros objetos que possam representar riscos.',
    'Verifique a segurança dos pisos, tapetes e corrimãos, fazendo ajustes quando necessário. Certifique-se de que os corrimãos estejam firmes e os tapetes bem fixados.',
    'Mantenha os medicamentos organizados e armazenados em locais seguros, seguindo corretamente as prescrições médicas e verificando regularmente as datas de validade.',
    'Forneça orientações sobre o uso de dispositivos de auxílio à mobilidade, como bengalas ou andadores, quando necessário, garantindo que estejam em boas condições.',
  ],
};

export const communicationTips = {
  headTitle: 'Comunicação e atenção',
  title:
    'Uma comunicação efetiva e atenção adequada são fundamentais para o bem-estar emocional dos idosos. Considere as seguintes dicas:',
  image: CommunicationImage,
  list: [
    'Demonstre interesse genuíno pelo idoso, ouvindo com atenção suas histórias, pensamentos e sentimentos. Mostre empatia e valide suas experiências.',
    'Utilize uma linguagem clara e adaptada ao nível de compreensão do idoso, evitando termos complexos e falando pausadamente.',
    'Estabeleça uma conexão afetiva, transmitindo segurança, carinho e respeito. Mostre-se disponível para conversar e ofereça apoio emocional.',
    'Respeite a privacidade do idoso, garantindo momentos de tranquilidade quando necessário. Esteja atento aos sinais de cansaço ou necessidade de descanso.',
    'Esteja presente e demonstre interesse ativo na comunicação não verbal, como contato visual, expressões faciais e linguagem corporal. Isso mostra que você está verdadeiramente engajado na interação.',
  ],
};

export const emergencyTips = {
  headTitle: 'Emergência',
  title:
    'Estar preparado para situações de emergência é fundamental ao cuidar de um idoso. Aqui estão algumas orientações importantes a serem seguidas:',
  image: EmergencyImage,
  list: [
    'Mantenha contatos de emergência visíveis e de fácil acesso, como números de telefone de serviços de saúde, familiares e do médico do idoso.',
    'Conheça os sinais de alerta de emergência, como falta de ar, dor súbita, confusão mental intensa ou perda de consciência. Saiba quando buscar ajuda médica imediatamente.',
    'Tenha um kit de primeiros socorros disponível e saiba como utilizá-lo corretamente. Inclua itens essenciais, como curativos, desinfetantes, termômetro e medicamentos de uso comum.',
    'Mantenha-se atualizado sobre os procedimentos de emergência, como RCP (ressuscitação cardiopulmonar) e manobras de desobstrução das vias aéreas. Saiba como agir em situações de emergência, como engasgo, parada cardíaca ou convulsão. Esteja preparado para agir rapidamente e salvar vidas.',
  ],
};

export function renderStatus(status: StatusType): {
  title: string;
  color: string;
  bgColor: string;
} {
  switch (status) {
    case 'FREE':
      return {
        title: 'Disponível',
        color: 'green.500',
        bgColor: 'green.100',
      };
    case 'ALOCATED':
      return {
        title: 'Alocado',
        color: 'yellow.500',
        bgColor: 'yellow.100',
      };
    case 'FINISHED':
      return {
        title: 'Finalizado',
        color: 'gray.500',
        bgColor: 'gray.100',
      };
    case 'CANCELED':
      return {
        title: 'Cancelado',
        color: 'red.500',
        bgColor: 'red.100',
      };
    case 'STARTED':
      return {
        title: 'Iniciado',
        color: 'blue.500',
        bgColor: 'blue.100',
      };
    default:
      return {
        title: 'Sem informações',
        color: 'gray.500',
        bgColor: 'gray.100',
      };
  }
}
