export const state = () => ({
  accessToken: null,
  recipes: null
});

export const mutations = {
  SET_TOKEN(state, accessToken) {
    state.accessToken = accessToken;
  },
  SET_RECIPES(state, recipes) {
    state.recipes = recipes;
  }
};
