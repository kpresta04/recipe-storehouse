export const state = () => ({
  accessToken: null
});

export const mutations = {
  SET_TOKEN(state, accessToken) {
    state.accessToken = accessToken;
  }
};
