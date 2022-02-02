import { useEffect, useReducer } from "react";
import { useAuth } from "../context/AuthContext";
import { formatDoc, getChildFolder, getFiles, getFolder } from "../firebase";

const ACTIONS = {
  SELECT_FOLDER: 'select-folder',
  UPDATE_FOLDER: 'update-folder',
  SET_CHILD_FOLDERS: 'set-child-folders',
  SET_CHILD_FILES: 'set-child-files'
}

export const ROOT_FOLDER = { name: 'Root', id: null, path: [] }

function reducer (state, { type, payload}) {
  
  switch(type) {
    case ACTIONS.SELECT_FOLDER: 
      return {
        folderId: payload.folderId,
        folder: payload.folder,
        childFolders: state.childFolders ?? [],
        childFiles: state.childFiles ?? []
      }
    case ACTIONS.UPDATE_FOLDER:
      return {
        ...state,
        folder: payload.folder
      }
    case ACTIONS.SET_CHILD_FOLDERS:
      return {
        ...state,
        childFolders: payload.childFolders
      }        
    case ACTIONS.SET_CHILD_FILES:
      return {
        ...state,
        childFiles: payload.childFiles
      }
    default:
      return state
  }

}

export function useFolder(folderId = null, folder = null, refresh = false) {
  
  // const [state, dispatch] = useReducer(reducer, {
  //   folderId, 
  //   folder,
  //   childFolders: [],
  //   childFiles: []
  // })
  const initializer = () => {
    // console.log('init');
    return {
      folderId, 
      folder,
      childFolders: [],
      childFiles: []
    }
  }
  const [state, dispatch] = useReducer(reducer, null, initializer)

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
      .catch((e) => {
        console.error(e);
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: { folder: ROOT_FOLDER }
        })
      });
    
  },[folderId, refresh]);

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
  },[folderId, currentUser, refresh])
  
  // file 가져오기
  useEffect(() => {
    getFiles(folderId, currentUser.uid)
      .then((snapshot) => {
        dispatch({
          type: ACTIONS.SET_CHILD_FILES,
          payload: { childFiles: snapshot.docs.map(formatDoc) }
        })
      })
  }, [folderId, currentUser, refresh])


  return state;
}