import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';

import { Actionsheet, HStack, Icon } from 'native-base';
import { useState } from 'react';
import { useCustomToast } from 'src/hooks';

type CameraAndGaleryProps = {
  isOpen: boolean;
  onClose: () => void;
  handleSelectImage: (base64: string) => void;
};

export function CameraAndGalery({ isOpen, onClose, handleSelectImage }: CameraAndGaleryProps) {
  const [pickImageCameraPermission, setPickImageCameraPermission] = useState(false);
  const [pickImageGaleryPermission, setPickImageGaleryPermission] = useState(false);

  const { showErrorToast, showSuccessToast } = useCustomToast();

  const pickImageCamera = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();

    setPickImageCameraPermission(granted);
    if (granted || pickImageCameraPermission) {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
        allowsMultipleSelection: false,
      });

      const file = result.assets?.at(0)?.uri;

      const extension = file?.split('.').at(-1);

      const base64 = `data:image/${extension};base64,${result.assets?.at(0)?.base64}`;

      if (!result.canceled && file && base64) {
        handleSelectImage(base64);
        onClose();

        showSuccessToast({
          title: 'Sucesso ao tirar foto',
          description: 'Sua foto foi tirada com sucesso e já está disponível para ser usada',
        });
      }
    } else {
      showErrorToast({
        title: 'Permissão negada',
        description: 'Você precisa permitir o acesso a câmera para tirar uma foto',
      });

      onClose();
    }
  };

  const pickImageGalery = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    setPickImageGaleryPermission(granted);
    if (granted || pickImageGaleryPermission) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
        allowsMultipleSelection: false,
      });

      const file = result.assets?.at(0)?.uri;

      const extension = file?.split('.').at(-1);

      const base64 = `data:image/${extension};base64,${result.assets?.at(0)?.base64}`;

      if (!result.canceled && file && base64) {
        handleSelectImage(base64);
        onClose();

        showSuccessToast({
          title: 'Sucesso ao selecionar foto',
          description: 'Sua foto foi selecionada com sucesso e já está disponível para ser usada',
        });
      }
    } else {
      showErrorToast({
        title: 'Permissão negada',
        description: 'Você precisa permitir o acesso a galeria para selecionar uma foto',
      });

      onClose();
    }
  };

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose} size="full" hideDragIndicator>
      <Actionsheet.Content bg="brand.50">
        <HStack space={32}>
          <Icon
            as={MaterialIcons}
            size={60}
            name="perm-media"
            onPress={pickImageGalery}
            color="brand.300"
          />
          <Icon
            as={MaterialIcons}
            size={60}
            name="camera-alt"
            onPress={pickImageCamera}
            color="brand.300"
          />
        </HStack>
      </Actionsheet.Content>
    </Actionsheet>
  );
}
