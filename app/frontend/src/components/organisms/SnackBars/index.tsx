import React from 'react'
import { useSnackbar } from '@/src/hooks/useSnackbar'
import { Snackbar } from '@/src/components'

export function Snackbars() {
  const { notifications, hideSnackbar } = useSnackbar()

  return (
    <>
      {notifications.map((notification) => (
        <Snackbar
          notification={notification}
          onClose={() => hideSnackbar(notification.id)}
          key={notification.id}
        />
      ))}
    </>
  )
}
