import { useEffect, useReducer } from "react";
import { formatDoc, getFolder } from "../firebase";

const ACTIONS = {
  SELECT_FOLDER: 'select-folder',
  UPDATE_FOLDER: ' '
}

const ROOT_FOLDER = { name: 'Root', id: null, path: [] }

function reducer (state, { type, payload}) {
  
  switch(type) {
    case ACTIONS.SELECT_FOLDER: 
      return {
        folderId: payload.folderId,
        folder: payload.folder,
        childFolders: [],
        childFiles: []
      }
    case ACTIONS.UPDATE_FOLDER:
      return {
        ...state,
        folder: payload.folder
      }
    default:
      return state
  }

}

export function useFolder(folderId = null, folder = null) {
  
  const [state, dispatch] = useReducer(reducer, {
    folderId, 
    folder,
    childFolders: [],
    childFiles: []
  })

  // folderId나 folder 변경시 state를 재선택한다.
  useEffect(() => {
    dispatch({ type: ACTIONS.SELECT_FOLDER, payload: { folderId, folder } })
  }, [folderId, folder])

  // 폴더 클릭시 folderId를 url로 이동하는데 이를 잡는다.
  useEffect(() => {
    console.log(folderId)
    if(folderId == null) {
      return dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: { folder: ROOT_FOLDER }
      })
    }
    getFolder(folderId)
      .then((doc) => {
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: { folder: formatDoc(doc) }
        })
      })
      .catch(() => {
        console.log('씨바;')
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: { folder: ROOT_FOLDER }
        })
      });
    
  },[folderId])
  
  return state;
}