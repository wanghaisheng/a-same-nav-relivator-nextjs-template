import { AddToCartButtonClient } from '@/ui/business/add-to-cart-button/AddToCartButtonClient';
import { Button } from '@/ui/components/core/button';
import { useTranslations } from 'next-intl';

interface ProductActionsProps {
  productId: string;
  t?: ReturnType<typeof useTranslations> | any;
}

export function ProductActions({ productId, t }: ProductActionsProps) {
  const tClient = t || useTranslations('ProductDetailPage');
  // 模拟添加到购物车逻辑
  const handleAddToCart = () => {
    // TODO: 实现添加到购物车逻辑
    alert(tClient('actions.addedToCart'));
  };
  return (
    <div className="flex gap-4 items-center">
      <AddToCartButtonClient onClick={handleAddToCart} label={tClient('actions.addToCart')} />
      <Button variant="outline">{tClient('actions.buyNow')}</Button>
    </div>
  );
}
