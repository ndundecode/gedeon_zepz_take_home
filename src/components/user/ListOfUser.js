/**
 * @author Gedeon Ndunde Gibango
 * @date 27/05/2023
 * @MyYouTubeChannel NdundeCode
 */

import React, { Fragment, useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { BOM } from "../../services/defined.action";
import { apis as api } from "../../services/api.action";
import { cnt } from "../../services/constant.action";
import { TableFacility, HandleSkeletonTbleFac } from "../layout/Facility";
import appStatic from "../../config/appStaticData";
import appLabel from "../../config/appLabel";
import Header from "../layout/Header";
import history from "../../history";

const ListOfUser = (props) => {
  const {userObjList} = props
  const { tableData } = appStatic;
  const [usersData, setUsersData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {

    switch (userObjList.listOfUser.length) {
      case 0:
          getUserList();
          console.log("get list from api: ", usersData);
        break;
    
      default:
        setUsersData(userObjList.listOfUser)
        $(document).ready(function () {
          $(".gedeonTable").DataTable();

          console.log("get list from redux: ", userObjList.listOfUser);
        });
        break;
    }
  }, []);

  function getUserList() {
    //start loader while waiting for response
    setIsLoading(true);

    let body = {};

    /** FETCH METHOD */
    BOM.FetchReqAction(body, api.GetUser, (err, res) => {
      if (err) {
        BOM.AlertMsg(cnt.DANGER, err);
      } else {
        const objList = res.items;
        let newList = []
        // ADD TWO ADDITIONAL KEY TO THE LIST
        objList.forEach(element => {
          newList.push({
            ...element,
            followed:false,
            blocked:false
          })
        });
        
        setUsersData(newList);

        //stop loader
        setIsLoading(false);

        //This is for dataTable to render correctly
        $(document).ready(function () {
          $(".gedeonTable").DataTable();
        });

        dispatch({
          type: cnt.SAVE_USER_LIST,
          payload: newList,
        });

      }
    });
  }

  const onViewDetail = (objParam)=>{

    history.push("/user-detail", {ggParam:objParam})
  }

  const onUnblock = (idParam) => {

    let newList = userObjList.listOfUser.map((item) =>
      item.user_id === idParam
        ? {
            ...item,
            blocked: false,
          }
        : { ...item }
    );

    setUsersData(newList)

    dispatch({
      type: cnt.SAVE_USER_LIST,
      payload: newList,
    });
  };

  return (
    <Fragment>
      <div className="container-sm">
        <Header />
        <div className="row">
          <div className="col-md-12">
            <div className="ibox">

            <div className="ibox-content">
              <div className="col-md-12 mb-3">
                <h5>{appLabel.listOfUser}</h5>
              </div>
              <HandleSkeletonTbleFac
                classParam={`${isLoading ? "" : "hide-content"}`}
              />
              <div className={` ${isLoading ? "hide-content" : ""}`}>
                {usersData.length === 0 ? (
                  <div className="alert alert-warning text-center">
                    <a className="alert-link">{appLabel.noDataInTableMsg}</a>
                  </div>
                ) : (
                  <TableFacility thData={tableData.userThList} thExtra={[]}>
                    {usersData.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <img src={item.profile_image} className="rounded" />
                        </td>
                        <td>{item.display_name}</td>
                        <td>{item.reputation}</td>
                        <td>
                        <span  className={`badge badge-success mr-3 ${ item.followed ? "":"hide-content"}`}>{appLabel.following}</span>
                        
                          <button
                            type="button"
                            className="btn btn-outline-success mr-3"
                            disabled={item.blocked}
                            onClick={()=>onViewDetail(item)}
                          >
                           <i className="fa fa-folder-open"/>  &nbsp;  {appLabel.view} 
                          </button>
                          <button
                            type="button"
                            className={`btn btn-outline-warning mr-3 ${ item.blocked ? "":"hide-content"}`}
                            onClick={()=>onUnblock(item.user_id)}
                          >
                           <i className="fa fa-check"/>  &nbsp;  {appLabel.unblock} 
                          </button>
                        </td>
                      </tr>
                    ))}
                  </TableFacility>
                )}
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};


const mapStateToProps = (state) => ({
  userObjList: state.userObjList,
});

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(ListOfUser);