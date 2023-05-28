/**
 * @author Gedeon Ndunde Gibango
 * @date 27/05/2023
 * @MyYouTubeChannel NdundeCode
 */

import Auth, { headerOptions as options, apis as api } from "../../api.action";
import { cnt } from "../../constant.action";
import history from "../../../history";
import { BOM } from "../../defined.action";

export const getUserList = ()=> {
  //start loader while waiting for response
  setIsLoading(true);

  let body = {};

  /** FETCH METHOD */
  BOM.FetchReqAction(body, api.GetUser, (err, res) => {
    if (err) {
      BOM.AlertMsg(cnt.DANGER, err);
    } else {
      const objList = res.items;
      setUsersData(objList);

      //stop loader
      setIsLoading(false);

      //This is for dataTable to render correctly
      $(document).ready(function () {
        $(".gedeonTable").DataTable();
      });
    }
  });
}
