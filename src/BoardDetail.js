/* eslint-disable no-underscore-dangle */
import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";

axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class BoardDetail extends Component {
  static deleteBoard = (_id) => {
    const sendParam = {
      headers,
      _id,
    };
    if (window.confirm("정말 삭제하시겠습니까?")) {
      axios
        .post("http://localhost:8080/board/delete", sendParam)
        // 정상 수행
        .then(() => {
          alert("게시글이 삭제 되었습니다.");
          window.location.href = "/";
        })
        // 에러
        .catch((err) => {
          console.log(err);
          alert("글 삭제 실패");
        });
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      board: [],
    };
  }

  componentDidMount() {
    const { location } = this.props;
    if (location.query !== undefined) {
      this.getDetail();
    } else {
      window.location.href = "/";
    }
  }

  getDetail = ({ location }) => {
    const sendParam = {
      headers,
      _id: location.query._id,
    };
    const marginBottom = {
      marginBottom: 5,
    };
    axios
      .post("http://localhost:8080/board/detail", sendParam)
      // 정상 수행
      .then((returnData) => {
        if (returnData.data.board[0]) {
          const board = (
            <div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>{returnData.data.board[0].title}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      dangerouslySetInnerHTML={{
                        __html: returnData.data.board[0].content,
                      }}
                    />
                  </tr>
                </tbody>
              </Table>
              <div>
                <NavLink
                  to={{
                    pathname: "/boardWrite",
                    query: {
                      title: returnData.data.board[0].title,
                      content: returnData.data.board[0].content,
                      _id: location.query._id,
                    },
                  }}
                >
                  <Button block style={marginBottom}>
                    글 수정
                  </Button>
                </NavLink>
                <Button
                  block
                  onClick={() => this.deleteBoard(location.query._id)}
                >
                  글 삭제
                </Button>
              </div>
            </div>
          );
          this.setState({
            board,
          });
        } else {
          alert("글 상세 조회 실패");
        }
      })
      // 에러
      .catch((err) => {
        console.log(err);
      });
  };

  // onClick={this.getBoard.bind(null,this.props._id)}
  render() {
    const divStyle = {
      margin: 50,
    };
    const { board } = this.state;
    return <div style={divStyle}>{board}</div>;
  }
}

export default BoardDetail;

BoardDetail.propTypes = {
  location: PropTypes.string.isRequired,
};
