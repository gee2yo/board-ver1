import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

export default function BoardRow({ _id, createdAt, title }) {
  return (
    <tr>
      <td>
        <NavLink to={{ pathname: "/board/detail", query: { _id } }}>
          {createdAt.substring(0, 10)}
        </NavLink>
      </td>
      <td>
        <NavLink to={{ pathname: "/board/detail", query: { _id } }}>
          {title}
        </NavLink>
      </td>
    </tr>
  );
}

BoardRow.propTypes = {
  _id: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
