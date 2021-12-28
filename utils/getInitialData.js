import Axios from "./Axios";

const getInitialData = async (state, setState) => {
  
  let categories = state.categories;
  let user = state.auth.user;
  let cart = state.cartData.cart;


  try { 

    // get categories 
    categories = (await Axios.get("categories")).data.categories;


    if (!state.serverRendered) {
      // authenticate user
       user = (await Axios.get("users/me")).data.user;

      // get cart data
       cart = (await Axios.get("cart")).data.cart;
    }

    setState((state) => ({
      ...state,
      categoryData: { loading: false, categories },
      auth: { loading: false, user },
      cartData: { loading: false, cart },
    }));
  
  } catch (error) {
    setState((state) => ({
      ...state,
      categoryData: {loading: false, categories},
      auth: { loading: false, user },
      cartData: {loading: false, cart}
    }));
  }
};

export default getInitialData;
