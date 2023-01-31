/* eslint-disable no-underscore-dangle */
import React, { Component } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";
import BoardRow from "./BoardRow";

axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class BoardForm extends Component {
  constructor() {
    super();
    this.state = {
      boardList: [],
    };
  }

  componentDidMount() {
    this.getBoardList();
  }

  getBoardList = () => {
    const sendParam = {
      headers,
      _id: $.cookie("login_id"),
    };
    axios
      .post("http://localhost:8080/board/getBoardList", sendParam)
      .then((returnData) => {
        let boardList;
        if (returnData.data.list.length > 0) {
          // console.log(returnData.data.list.length);
          const boards = returnData.data.list;
          boardList = boards.map((item) => (
            <BoardRow
              key={Date.now() + Math.random() * 500}
              _id={item._id}
              createdAt={item.createdAt}
              title={item.title}
            />
          ));
          // console.log(boardList);
          this.setState({
            boardList,
          });
        } else {
          boardList = (
            <tr>
              <td colSpan="2">작성한 게시글이 존재하지 않습니다.</td>
            </tr>
          );
          this.setState({
            boardList,
          });
          // window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const divStyle = {
      margin: 50,
    };
    const { boardList } = this.state;
    return (
      <div>
        <div style={divStyle}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>날짜</th>
                <th>글 제목</th>
              </tr>
            </thead>
            <tbody>{boardList}</tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default BoardForm;
