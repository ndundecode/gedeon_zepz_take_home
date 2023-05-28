/**
 * @author Gedeon Ndunde Gibango
 * @date 27/05/2023
 * @MyYouTubeChannel NdundeCode
 */

import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { cnt } from "../../services/constant.action";
import Header from "../layout/Header";
import appLabel from "../../config/appLabel";
import history from "../../history";
const UserDetail = (props) => {
  const { location, userObjList } = props;
  const { state } = location;
  const { ggParam } = state;
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(ggParam);
  }, []);

  const onFollow = (idParam) => {

    console.log(idParam);
    let newList = userObjList.listOfUser.map((item) =>
      item.user_id === idParam
        ? {
            ...item,
            followed: true,
          }
        : { ...item }
    );

    // console.log(newList);

    ggParam.followed= true

    dispatch({
      type: cnt.SAVE_USER_LIST,
      payload: newList,
    });
  };
  const onUnFollow = (idParam) => {

    console.log("UnFolow: ", idParam);
    let newList = userObjList.listOfUser.map((item) =>
      item.user_id === idParam
        ? {
            ...item,
            followed: false,
          }
        : { ...item }
    );

    // console.log(newList);

    ggParam.followed= false

    dispatch({
      type: cnt.SAVE_USER_LIST,
      payload: newList,
    });
  };
  const onBlock = (idParam) => {

    console.log(idParam);
    let newList = userObjList.listOfUser.map((item) =>
      item.user_id === idParam
        ? {
            ...item,
            blocked: true,
            followed: false,
          }
        : { ...item }
    );

    // console.log(newList);

    ggParam.blocked= true

    //unfollow automatically when you block
    // onUnFollow(idParam)
    ggParam.followed= false

    dispatch({
      type: cnt.SAVE_USER_LIST,
      payload: newList,
    });
  };
  return (
    <>
      <div className="container-sm">
        <Header />
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="col-md-12 mb-3">
              <h5>{appLabel.userDetail}</h5>
              <button
                type="button"
                onClick={() => history.goBack()}
                className="btn btn-outline-secondary"
              >
                <i className="fa fa-long-arrow-left" /> &nbsp; {appLabel.back}
              </button>{" "}
            </div>
            <div className="card hovercard">
              <div className="cardheader"></div>
              <div className="avatar">
                <img src={ggParam.profile_image} />
              </div>
              <div className="info">
                <div className="title">
                  <a target="_blank" href={ggParam.link}>
                    {ggParam.display_name}
                  </a>
                </div>
                <div className="desc">{ggParam.reputation}</div>
                <div className="desc">{ggParam.user_type}</div>
                <div className="desc">{ggParam.location}</div>
              </div>
              <div className="bottom">
                <div>
                  <button
                    type="button"
                    className={`btn mr-3 btn-outline-${
                      ggParam.followed ? "primary" : "success"
                    }`}
                    disabled={ggParam.blocked}
                    style={ggParam.blocked ? {pointerEvents:"none", opacity:"0.4"}: {cursor:"pointer"}}
                  >
                    {ggParam.followed ? (
                      <span onClick={()=>onUnFollow(ggParam.user_id)}>
                        <i className="fa fa-minus" /> {appLabel.unfollow}
                      </span>
                    ) : (
                      <span onClick={()=>onFollow(ggParam.user_id)}>
                        <i className="fa fa-plus-circle"  /> {appLabel.follow}
                      </span>
                    )}
                  </button>
                  <button disabled={ggParam.blocked} onClick={()=>onBlock(ggParam.user_id)} type="button" className={`btn mr-3 btn-outline-${ggParam.blocked ? "secondary":"danger"}`}>
                    <i className="fa fa-ban" /> &nbsp; {appLabel.block}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  userObjList: state.userObjList,
});

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);
