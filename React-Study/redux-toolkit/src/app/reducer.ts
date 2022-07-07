import { configureStore, createEntityAdapter, createSlice } from "@reduxjs/toolkit";

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
  initialState: booksAdapter.getInitialState(), // { ids: [], entities: {} }
  reducers: {
    bookAdded: booksAdapter.addOne, // adapter function을 그대로 reducer에 전달하는 케이스
    booksReceived(state, action) {
      // adapter function을 mutating helper로 사용하는 케이스
      booksAdapter.setAll(state, action.payload.books);
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

// Can create a set of memoized selectors based on the location of this entity state
const booksSelectors = booksAdapter.getSelectors<RootState>(
  (state) => state.books
)
