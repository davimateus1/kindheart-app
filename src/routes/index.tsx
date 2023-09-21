import { Box } from 'native-base';
import AppRoutes from './AppRoutes';

export function Routes() {
  return (
    <Box flex={1} safeArea bg="white">
      <AppRoutes />
    </Box>
  );
}
