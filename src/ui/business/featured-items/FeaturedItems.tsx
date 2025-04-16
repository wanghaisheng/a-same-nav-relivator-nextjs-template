"use client";

import React from "react";
import type { Item } from "../../../db/schema/types";
import { ProductCard } from "../product-card";

export interface FeaturedItemsProps {
  items: Item[];
}

export function FeaturedItems({ items }: FeaturedItemsProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item) => (
        <ProductCard
          key={item.id}
          product={item}
        />
      ))}
    </div>
  );
}
