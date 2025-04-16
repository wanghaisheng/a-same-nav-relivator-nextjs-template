import React from 'react';

export interface AvatarProps {
  src?: string | null;
  alt?: string | null;
  size?: number;
  className?: string;
  title?: string | null;
}

/**
 * 基础 Avatar 组件，支持图片、国际化 alt/title、防御式编程
 */
export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 40,
  className = '',
  title,
}) => {
  const fallbackAlt = alt || 'Avatar';
  const fallbackTitle = title || fallbackAlt;
  return (
    <img
      src={src || '/avatar-default.png'}
      alt={fallbackAlt}
      title={fallbackTitle}
      width={size}
      height={size}
      className={`rounded-full object-cover bg-gray-200 ${className}`.trim()}
      style={{ width: size, height: size }}
      onError={e => {
        const target = e.target as HTMLImageElement;
        if (target.src !== '/avatar-default.png') {
          target.src = '/avatar-default.png';
        }
      }}
    />
  );
};

export default Avatar;
