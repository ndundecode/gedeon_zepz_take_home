import React, { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import appLabel from "../../config/appLabel";

export const TableHeader = (props) => {
  const { thData } = props;
  return (
    <>
      <thead>
        <tr>
          {thData.map((item, index) => (
            <th key={index}>{item.name}</th>
          ))}
          <th></th>
        </tr>
      </thead>
    </>
  );
};
export const TableFooter = (props) => {
  const { thData } = props;
  return (
    <>
      <thead>
        <tr>
          {thData.map((item, index) => (
            <th key={index}>{item.name}</th>
          ))}
          <th></th>
        </tr>
      </thead>
    </>
  );
};

export const TableFacility = (props) => {
  const { children, thData, thExtra } = props;
  // useEffect(() => {
  //   $(document).ready(function () {
  //     $(".gedeonTable").DataTable();
  //   });
  // }, []);
  return (
    <div className="table-responsive">
      <table
        className="table table-striped table-bordered gedeonTable"
        style={{ width: "100%" }}
      >
        <thead>
          <tr>
            {thExtra.map((item, index) => (
              <th key={index}></th>
            ))}
            {thData.map((item, index) => (
              <th key={index}>{item.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
        <tfoot>
          <tr>
            {thExtra.map((item, index) => (
              <th key={index}></th>
            ))}
            {thData.map((item, index) => (
              <th key={index}>{item.name}</th>
            ))}
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
export const HandleSkeletonTbleFac = (props) => {
  const { classParam } = props;
  return (
    <div className={`table-responsive ${classParam}`}>
      <table className="myTable table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th></th>
            <th>
              <Skeleton />
            </th>
            <th>
              <Skeleton />
            </th>
            <th>
              <Skeleton />
            </th>
            <th>
              <Skeleton />
            </th>
          </tr>
        </thead>
        <tbody>
          {Array(5)
            .fill()
            .map((item, index) => (
              <tr key={index}>
                <td>
                  <Skeleton />
                </td>
                <td>
                  <Skeleton />
                </td>
                <td>
                  <Skeleton />
                </td>
                <td>
                  <Skeleton />
                </td>
                <td>
                  <Skeleton />
                </td>
              </tr>
            ))}
        </tbody>
        <tfoot>
          <tr>
            <th></th>
            <th>
              <Skeleton />
            </th>
            <th>
              <Skeleton />
            </th>
            <th>
              <Skeleton />
            </th>
            <th>
              <Skeleton />
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
