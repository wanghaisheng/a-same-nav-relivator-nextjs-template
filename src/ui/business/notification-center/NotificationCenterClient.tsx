import React from "react";
import type { NotificationCenterClientProps } from "./types";
import { useTranslations } from 'next-intl';

export function NotificationCenterClient({ notifications, error }: NotificationCenterClientProps) {
  const t = useTranslations('NotificationCenter');
  if (error) {
    return <div style={{ color: 'red' }}>{t('loadFailed')}: {error}</div>;
  }
  if (!notifications || notifications.length === 0) {
    return <div>{t('noNotifications')}</div>;
  }
  return (
    <div className="notification-center">
      <h2>{t('notificationCenter')}</h2>
      <ul>
        {notifications.map(notification => (
          <li key={notification.id}>
            <strong>{notification.title ?? t('noTitle')}</strong>
            <div>{notification.content ?? t('noContent')}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
