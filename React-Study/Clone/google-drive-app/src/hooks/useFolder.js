import { useEffect, useReducer } from "react";
import { useAuth } from "../context/AuthContext";
import { formatDoc, getChildFolder, getFolder } from "../firebase";

const ACTIONS = {
  SELECT_FOLDER: 'select-folder',
  UPDATE_FOLDER: 'update-folder',
  SET_CHILD_FOLDERS: 'set-child-folders'
}

export const ROOT_FOLDER = { name: 'Root', id: null, path: [] }

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
    case ACTIONS.SET_CHILD_FOLDERS:
      console.log(payload.childFolders);
      return {
        ...state,
        childFolders: payload.childFolders
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
  const { currentUser } = useAuth();
  // folderId나 folder 변경시 state를 재선택한다.
  useEffect(() => {
    dispatch({ type: ACTIONS.SELECT_FOLDER, payload: { folderId, folder } })
  }, [folderId, folder])

  // 폴더 클릭시 folderId를 url로 이동하는데 이를 잡는다.
  // useEffect는 최초 랜더링 이후 실행된다.
  useEffect(() => {
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
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: { folder: ROOT_FOLDER }
        })
      });
    
  },[folderId]);

  // 현재 폴더의 자식 폴더
  useEffect(() => {
    getChildFolder(folderId, currentUser)
      .then((snapshot) => {
        dispatch({
          type: ACTIONS.SET_CHILD_FOLDERS,
          payload: { childFolders: snapshot.docs.map(formatDoc) }
        })
      })
      .catch((e) => {
        console.error(e)
      })
  },[folderId, currentUser])
  
  return state;
}