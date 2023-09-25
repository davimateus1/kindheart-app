import { Ionicons } from '@expo/vector-icons';
import { Flex, Heading, ScrollView, Text } from 'native-base';
import { CustomButton, CustomHeader, Publication } from 'src/components';

export function FeedScreen() {
  return (
    <Flex flex={1} bgColor="white" direction="column" align="center">
      <CustomHeader justify="flex-start">
        <Heading color="brand.100" fontWeight="500" fontSize="lg" textAlign="center">
          Publicações
        </Heading>
      </CustomHeader>
      <ScrollView w="100%" overScrollMode="never" px={5} h="100%">
        <Flex w="100%" align="flex-end" my={5}>
          <CustomButton
            bgColor="opacity.green-40"
            w="auto"
            rounded="full"
            rightIcon={<Ionicons name="arrow-forward" size={20} color="black" />}
          >
            <Text color="black" fontWeight="500">
              Faça uma publicação
            </Text>
          </CustomButton>
        </Flex>
        <Flex h="100%">
          <Publication
            status="FREE"
            createdAt="2021-10-10T00:00:00.000Z"
            name="Davi"
            publicationDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Done nec odio dui. Nulla facilisi. Donec euismod, nisl eget aliquam ultrices, nisl nisl ultrices nisl, nec aliquet nisl nisl nec odio dui. Nulla facilisi."
            topicName="Saúde"
            isFriend
            isLiked
            likesCount={10}
            profileImage="https://avatars.githubusercontent.com/u/66326378?v=4"
            publicationImage="https://avatars.githubusercontent.com/u/66326378?v=4"
          />
        </Flex>
      </ScrollView>
    </Flex>
  );
}
