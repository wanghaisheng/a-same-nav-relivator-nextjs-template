import { Clock, ShoppingBag, Star, Truck } from 'lucide-react';

import { Feature } from '~/db/schema';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/ui/primitives/card';

interface FeaturesProps {
  features: Feature[];
}

const featureIcons = {
  shipping: <Truck className="h-6 w-6 text-primary" />,
  checkout: <ShoppingBag className="h-6 w-6 text-primary" />,
  support: <Clock className="h-6 w-6 text-primary" />,
  quality: <Star className="h-6 w-6 text-primary" />,
};

export function Features({ features }: FeaturesProps) {
  return (
    <section id="features" className="py-12 md:py-16">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            为什么选择我们
          </h2>
          <div className="mt-2 h-1 w-12 rounded-full bg-primary" />
          <p className="mt-4 max-w-2xl text-center text-muted-foreground md:text-lg">
            我们提供最好的购物体验和优质服务
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card
              key={feature.id}
              className="border-none bg-background shadow-sm"
            >
              <CardHeader className="pb-2">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  {featureIcons[feature.icon as keyof typeof featureIcons]}
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
} 