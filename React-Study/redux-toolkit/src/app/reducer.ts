import { configureStore, createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";

type Book = {
  bookId: string; // 식별자
  title: string;
}

const booksAdapter = createEntityAdapter<Book>({
  // 객체에서 어떤 값이 식별자인지 알려준다.
  selectId: (book) => book.bookId,
  // ID 배열이 sortComparer에 따라 정렬된다.
  sortComparer: (a, b) => a.title.localeCompare(b.title)
});


const bookSlice = createSlice({
  name: 'books',
  initialState: booksAdapter.getInitialState<{isLoading: boolean}>({
    isLoading: true,
  }),
  reducers: {
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    }
  }
});

const store = configureStore({
  reducer: {
    books: bookSlice.reducer
  }
})

type RootState = ReturnType<typeof store.getState>

console.log(store.getState().books);
// { ids: [], entities: {} }


const simpleSelectors = booksAdapter.getSelectors();
const globalizedSelectors = booksAdapter.getSelectors<RootState>(
  (state) => state.books
)

// 1. 일반 셀렉터, books reducer 의 상태를 가져오는 방법을 알려줘야한다.
const ids1 = simpleSelectors.selectIds(store.getState().books);

/**  
  2. globalizedSeletor, 제네릭으로 rootstate 타입을 전달했고, 컬렉션 가져오는법을 getSelector 인자로 알려줬다.
  rootstate를 인자로 전달하면 알아서 books 컬렉션을 가져온다.
*/
const ids2 = globalizedSelectors.selectIds(store.getState());