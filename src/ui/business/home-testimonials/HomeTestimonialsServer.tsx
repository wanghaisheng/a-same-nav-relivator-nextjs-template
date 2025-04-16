import { testimonialsService } from '@/services';
import { HomeTestimonialsClient } from './HomeTestimonialsClient';

export async function HomeTestimonialsServer() {
  const testimonials = await testimonialsService.getAll();
  return <HomeTestimonialsClient testimonials={testimonials} />;
}
