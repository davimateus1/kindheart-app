import { NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from "./app.routes";
import { Box } from "native-base";

export const Routes = () => {
  return (
    <Box flex={1} safeArea bg="white">
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </Box>
  );
};
