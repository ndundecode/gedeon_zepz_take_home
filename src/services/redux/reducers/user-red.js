/**
 * @author Gedeon Ndunde Gibango
 * @date 27/05/2023
 * @MyYouTubeChannel NdundeCode
 */

import { cnt } from "../../constant.action";

const INITIAL_STATE = {
  listOfUser: [],
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  
  switch (type) {
    case cnt.SAVE_USER_LIST:
      return {
        ...state,
        listOfUser: payload,
      };
    default:
      return state;
  }
};
