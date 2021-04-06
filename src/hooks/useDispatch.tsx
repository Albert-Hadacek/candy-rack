import { useContext } from 'react'
import { AppDispatchContext } from '../state/AppState'

const useDispatch = () => {
  const dispatch = useContext(AppDispatchContext)
  if (!dispatch) {
    throw new Error(
      'useSetState was called outside of the AppSetStateContext.Provider'
    )
  }
  return dispatch
}

export default useDispatch