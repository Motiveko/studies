import { createSelector } from 'reselect';

export const getFriends = (state,_) => state.friend.friends;
export const getAgeLimit = (_, ageLimit) => ageLimit;
export const getShowLimit = state => state.friend.showLimit;

const getFriendsWithAgeLimit = createSelector([getFriends, getAgeLimit],(friends, ageLimit) => friends.filter(friend => friend.age <= ageLimit));

export const makeGetFriendsWithAgeLimit = () => getFriendsWithAgeLimit;

export const getFriendsWithAgeShowLimit = createSelector([getFriendsWithAgeLimit, getShowLimit],(friends, showLimit) => friends.slice(0, showLimit));
