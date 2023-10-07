import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { NavigationProp } from '@react-navigation/native';
import { Avatar, Flex, Heading, IconButton, Image, Text, TextArea, useDisclose } from 'native-base';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CameraAndGalery, CustomButton, CustomHeader, CustomSelect } from 'src/components';
import { useAuth } from 'src/contexts/auth';
import { FeedPostSchema, feedPostSchema } from 'src/schemas';
import { useCreateFeedPost, useGetTopics } from 'src/store';

type CreateFeedPostScreenProps = {
  navigation: NavigationProp<Record<string, object | undefined>>;
};

export function CreateFeedPostScreen({ navigation }: CreateFeedPostScreenProps) {
  const { user } = useAuth();
  const { data: topics } = useGetTopics();
  const { isOpen, onOpen, onClose } = useDisclose();
  const [lettersCount, setLettersCount] = useState(0);
  const { postMutate, postLoading } = useCreateFeedPost({ navigation });

  const {
    control,
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<FeedPostSchema>({
    reValidateMode: 'onChange',
    resolver: zodResolver(feedPostSchema),
  });

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleTextChange = (text: string) => {
    setValue('description', text);
    setLettersCount(text.length);
  };

  const handleSelectImage = (base64: string) => {
    setValue('image', base64);
  };

  const handleSubmitPost = handleSubmit(data => {
    postMutate({
      image: data.image,
      description: data.description,
      topic_id: data.topic,
      user_id: String(user?.id),
    });
  });

  return (
    <Flex flex={1} bgColor="white" direction="column" align="center">
      <CustomHeader
        icon={<AntDesign name="arrowleft" size={20} color="white" />}
        buttonProps={{ onPress: handleGoBack }}
      >
        <Heading color="brand.100" fontWeight="500" fontSize="lg" textAlign="right" maxW="50%">
          Escreva uma publicação
        </Heading>
      </CustomHeader>
      <Flex px={5} my={5} w="100%">
        <Text color="brand.200" opacity={0.6} fontSize="sm">
          Aqui você pode compartilhar suas necessidades e experiências com todos. Para começar,
          preencha o campo de texto com o conteúdo da sua postagem. Em seguida, selecione o tópico
          relevante no menu suspenso para que sua postagem fique organizada. Se quiser adicionar uma
          imagem à sua publicação, clique no botão de upload e escolha a imagem desejada.
        </Text>
        <Flex direction="row" justify="space-between" my={5} w="100%">
          <Flex direction="row" align="center" w="45%">
            <Avatar source={{ uri: user?.photo }} size="md" mr={2} bg="brand.400">
              {user?.first_name[0]}
            </Avatar>

            <Heading color="brand.100" fontWeight="500" fontSize="sm" maxW="55%">
              {user?.first_name} {user?.last_name}
            </Heading>
          </Flex>
          <CustomSelect
            control={control}
            name="topic"
            options={topics?.map(topic => ({ value: String(topic.id), label: topic.label })) || []}
            stackProps={{ w: '55%' }}
            selectProps={{
              bg: errors.topic ? 'red.100' : 'opacity.green-40',
              placeholder: 'Tópico',
              color: 'brand.100',
              borderColor: errors.topic ? 'red.500' : 'brand.50',
            }}
          />
        </Flex>
        <Flex position="relative">
          <TextArea
            autoCompleteType="off"
            placeholder="Escreva aqui..."
            h={20}
            w="100%"
            bgColor="white"
            borderColor={errors.description ? 'red.500' : 'brand.50'}
            borderWidth={1}
            color="brand.100"
            maxLength={200}
            borderRadius={5}
            _focus={{ borderColor: errors.description ? 'red.500' : 'brand.50' }}
            onChange={e => handleTextChange(e.nativeEvent.text)}
          />
          <Text color={errors.description ? 'red.500' : 'brand.200'} textAlign="right">
            {lettersCount}/200
          </Text>
          <IconButton
            onPress={onOpen}
            bgColor={errors.image ? 'red.500' : 'brand.50'}
            w="15%"
            bg="transparent"
            _pressed={{ bg: 'transparent' }}
            icon={<FontAwesome name="photo" size={24} color={errors.image ? 'red' : '#28CD56'} />}
            position="absolute"
            right={-4}
            bottom={4}
          />

          <CameraAndGalery
            handleSelectImage={handleSelectImage}
            isOpen={isOpen}
            onClose={onClose}
          />
        </Flex>
        {!!watch('image') && (
          <Flex w="23.5%" direction="row">
            <Image
              source={{ uri: watch('image') }}
              alt="profile-image"
              mb={2}
              style={{
                width: 80,
                height: 80,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: 'gray',
              }}
            />
            <FontAwesome
              name="close"
              size={24}
              color="red"
              onPress={() => setValue('image', '')}
              style={{ marginLeft: 2 }}
            />
          </Flex>
        )}
        <CustomButton
          py={4}
          mt={1}
          w="100%"
          color="brand.100"
          bgColor="brand.50"
          onPress={handleSubmitPost}
          isLoading={postLoading}
        >
          Publicar
        </CustomButton>
        <Flex align="center" mt={3}>
          {errors.topic && (
            <Text color="red.500" fontSize="sm" fontWeight="bold">
              * {errors.topic?.message}
            </Text>
          )}
          {errors.image && (
            <Text color="red.500" fontSize="sm" fontWeight="bold">
              * {errors.image?.message}
            </Text>
          )}
          {errors.description && (
            <Text color="red.500" fontSize="sm" fontWeight="bold">
              * {errors.description?.message}
            </Text>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}
