/**
 * @author Gedeon Ndunde Gibango
 * @date 27/05/2023
 * @MyYouTubeChannel NdundeCode
 */

import appLabel from "../config/appLabel";
import axios from "axios";

/** BM (Block Of Methods) */
export const BOM = {

  FetchReqAction: async (body, apiUrl, callback) => {

    var config = {
      method: "get",
      url: apiUrl,
      data: body,
    };

    axios(config)
      .then(function (response) {

        let res = response.data;

        callback(null, res);
      })
      .catch(function (error) {
        console.log(error);
        callback(appLabel.smthWentWrong, null);
      });
  },
};

