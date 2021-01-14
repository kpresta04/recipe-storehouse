export const state = () => ({
  accessToken: null,
  recipes: null,
  mealPlan: null,
  recipeObject: {
    name: null,
    date: null
  }
});

export const mutations = {
  SET_TOKEN(state, accessToken) {
    state.accessToken = accessToken;
  },
  SET_RECIPES(state, recipes) {
    state.recipes = recipes;
  },
  SET_RECIPE_OBJECT(state, recipeObject) {
    state.recipeObject = recipeObject;
  }
};
