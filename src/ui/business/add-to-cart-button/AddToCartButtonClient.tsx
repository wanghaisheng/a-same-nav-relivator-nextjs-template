import React from "react";
import type { AddToCartButtonProps } from "./types";
import { useTranslations } from 'next-intl';

export const AddToCartButtonClient: React.FC<AddToCartButtonProps> = ({ onClick, disabled, label }) => {
  const t = useTranslations('AddToCartButton');
  return (
    <button className="add-to-cart-btn" onClick={onClick} disabled={disabled}>
      {label ?? t('addToCart')}
    </button>
  );
};
