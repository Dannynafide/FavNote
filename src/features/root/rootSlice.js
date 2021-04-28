import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../services/firebase';

export const fetchItems = createAsyncThunk(
  'root/fetchItems',
  async (args, thunkAPI) => {
    const userId = thunkAPI.getState().auth.user.id;

    const userItemsRef = db
      .collection('users')
      .doc(userId)
      .collection(args.itemType);

    const results = await userItemsRef.get();
    const tmp = [];
    results.docs.forEach((doc) => {
      tmp.push({ id: doc.id, ...doc.data() });
    });

    return { itemType: args.itemType, items: tmp };
  }
);

export const cardAddedAsync = createAsyncThunk(
  'root/cardAddedAsync',
  async (args, thunkAPI) => {
    const userId = thunkAPI.getState().auth.user.id;
    const { themeContext: itemType, title, content } = args;

    const newId = nanoid();
    const item = { id: newId, title, content };
    if (itemType === 'twitters') {
      item.twitterName = args.twitterName;
    } else if (itemType === 'articles') {
      item.articleUrl = args.articleUrl;
    }

    const userItemRef = db
      .collection('users')
      .doc(userId)
      .collection(itemType)
      .doc(newId);

    userItemRef.set(item);

    return { itemType, item };
  }
);

export const cardRemovedAsync = createAsyncThunk(
  'root/cardRemovedAsync',
  async (args, thunkAPI) => {
    const userId = thunkAPI.getState().auth.user.id;
    const { themeContext: itemType, id } = args;

    const userItemRef = db
      .collection('users')
      .doc(userId)
      .collection(itemType)
      .doc(id);

    await userItemRef.delete();

    return { itemType, id };
  }
);

export const cardUpdatedAsync = createAsyncThunk(
  'root/cardUpdatedAsync',
  async (args, thunkAPI) => {
    const userId = thunkAPI.getState().auth.user.id;
    const {
      page: itemType,
      id,
      title,
      content,
      twitterName,
      articleUrl,
    } = args;

    const newCard = {};
    newCard.title = title;
    newCard.content = content;
    if (twitterName) newCard.twitterName = twitterName;
    if (articleUrl) newCard.articleUrl = articleUrl;

    const userItemRef = db
      .collection('users')
      .doc(userId)
      .collection(itemType)
      .doc(id);

    userItemRef.update(newCard);
    newCard.id = id;

    return args;
  }
);

// const initialState = {
//   twitters: [
//     {
//       id: 1,
//       title: 'Hello Roman',
//       content:
//         'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, tempora quibusdam natus modi tempore esse adipisci, dolore odit animi',
//       created: '1 day',
//       twitterName: 'hello_roman',
//     },
//     {
//       id: 2,
//       title: 'Redux guy',
//       content:
//         'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, tempora quibusdam natus modi tempore esse adipisci, dolore odit animi',
//       created: '1 day',
//       twitterName: 'dan_abramov',
//     },
//     {
//       id: 3,
//       title: 'React router stuff',
//       content:
//         'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, tempora quibusdam natus modi tempore esse adipisci, dolore odit animi',
//       created: '5 days',
//       twitterName: 'mjackson',
//     },
//     {
//       id: 4,
//       title: 'Super animacje!',
//       content:
//         'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, tempora quibusdam natus modi tempore esse adipisci, dolore odit animi',
//       created: '10 days',
//       twitterName: 'sarah_edo',
//     },
//     {
//       id: 5,
//       title: 'Super animacje!',
//       content:
//         'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, tempora quibusdam natus modi tempore esse adipisci, dolore odit animi',
//       created: '10 days',
//       twitterName: 'sarah_edo',
//     },
//   ],
//   articles: [
//     {
//       id: 1,
//       title: 'React on my mind',
//       content:
//         'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, tempora quibusdam natus modi tempore esse adipisci, dolore odit animi',
//       articleUrl: 'https://youtube.com/helloroman',
//       created: '1 day',
//     },
//     {
//       id: 2,
//       title: 'Wish you React',
//       content:
//         'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, tempora quibusdam natus modi tempore esse adipisci, dolore odit animi',
//       articleUrl: 'https://youtube.com/helloroman',
//       created: '1 day',
//     },
//     {
//       id: 3,
//       title: 'You gave React a bad name',
//       content:
//         'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, tempora quibusdam natus modi tempore esse adipisci, dolore odit animi',
//       articleUrl: 'https://youtube.com/helloroman',
//       created: '5 days',
//     },
//     {
//       id: 4,
//       title: 'Is it React you looking for?',
//       content:
//         'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, tempora quibusdam natus modi tempore esse adipisci, dolore odit animi',
//       articleUrl: 'https://youtube.com/helloroman',
//       created: '10 days',
//     },
//   ],
//   notes: [
//     {
//       id: 1,
//       title: 'Wake me up when Vue ends',
//       content:
//         'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, tempora quibusdam natus modi tempore esse adipisci, dolore odit animi',
//       created: '1 day',
//     },
//     {
//       id: 2,
//       title: 'Como es An Gular?',
//       content:
//         'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, tempora quibusdam natus modi tempore esse adipisci, dolore odit animi',
//       created: '1 day',
//     },
//     {
//       id: 3,
//       title: 'Du bist Reactish',
//       content:
//         'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, tempora quibusdam natus modi tempore esse adipisci, dolore odit animi',
//       created: '5 days',
//     },
//     {
//       id: 4,
//       title: 'Reactuj się kto moze!',
//       content:
//         'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, tempora quibusdam natus modi tempore esse adipisci, dolore odit animi',
//       created: '10 days',
//     },
//   ],
// };

const rootSlice = createSlice({
  name: 'root',
  initialState: { notes: [], twitters: [], articles: [] },
  reducers: {
    cardAdded: {
      reducer(state, action) {
        const { itemType, item } = action.payload;
        state[itemType].push(item);
      },
      prepare(id, title, content) {
        return {
          payload: {
            id,
            created: new Date().toISOString(),
            title,
            content,
          },
        };
      },
    },
    cardRemoved(state, action) {
      const { id, itemType } = action.payload;

      state[itemType] = state[itemType].filter((item) => item.id !== id);
    },
    cardUpdated(state, action) {
      const {
        page,
        id,
        title,
        content,
        twitterName,
        articleUrl,
      } = action.payload;
      const existingCard = state[page].find(
        (card) => String(card.id) === String(id)
      );
      if (existingCard) {
        existingCard.title = title;
        existingCard.content = content;
        if (twitterName) existingCard.twitterName = twitterName;
        if (articleUrl) existingCard.articleUrl = articleUrl;
      }
    },
    reset(state) {
      state.notes = [];
      state.twitters = [];
      state.articles = [];
    },
  },
  extraReducers: {
    [fetchItems.fulfilled]: (state, action) => {
      state[action.payload.itemType] = action.payload.items;
    },
    [cardRemovedAsync.fulfilled]: (state, action) => {
      rootSlice.caseReducers.cardRemoved(state, action);
    },
    [cardAddedAsync.fulfilled]: (state, action) => {
      rootSlice.caseReducers.cardAdded(state, action);
    },
    [cardUpdatedAsync.fulfilled]: (state, action) => {
      rootSlice.caseReducers.cardUpdated(state, action);
    },
  },
});

export const { cardAdded, cardRemoved, cardUpdated, reset } = rootSlice.actions;

export default rootSlice.reducer;
