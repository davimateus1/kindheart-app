import { CustomScreen } from 'src/components';
import { emergencyTips } from 'src/utils';

export function EmergencyScreen() {
  return <CustomScreen {...emergencyTips} />;
}
