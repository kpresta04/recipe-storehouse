export default function({ store, redirect }) {
  // If the user is not authenticated
  console.log(store.state);
  if (typeof window !== "undefined") {
    console.log(window);
  }
  if (!store.state.authenticated) {
    return redirect("/login");
  }
  mounted: {
    window.alert("hello");
  }
}
