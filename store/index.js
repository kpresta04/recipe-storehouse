export const state = () => ({
  users: []
});

export const mutations = {
  SET_USERS(state, users) {
    state.users = users;
  }
};
