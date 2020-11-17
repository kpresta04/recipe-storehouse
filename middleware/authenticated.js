export default function({ store, redirect }) {
  // If the user is not authenticated
  // console.log(store.state);

  if (!store.state.accessToken) {
    return redirect("/login");
  }
  // mounted: {
  //   if (typeof window !== "undefined") {
  //     console.log(localStorage);
  //   }
  // }
}
