import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addNotification,
  removeNotification,
  addNotificationProps,
} from '@/src/slice/notificationSlice'
import { RootState } from '@/src/store'

export const useSnackbar = () => {
  const dispatch = useDispatch()
  const notifications = useSelector((state: RootState) => state.notifications)

  const showSnackbar = useCallback(
    ({ message, severity }: addNotificationProps) => {
      dispatch(addNotification({ message, severity }))
    },
    [dispatch]
  )

  const hideSnackbar = useCallback(
    (id: number) => {
      dispatch(removeNotification(id))
    },
    [dispatch]
  )

  return {
    notifications,
    showSnackbar,
    hideSnackbar,
  }
}
