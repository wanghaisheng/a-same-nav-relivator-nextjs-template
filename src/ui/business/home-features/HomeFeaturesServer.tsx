import { featuresService } from '@/services';
import { HomeFeaturesClient } from './HomeFeaturesClient';

export async function HomeFeaturesServer() {
  const features = await featuresService.getAll();
  return <HomeFeaturesClient features={features} />;
}
