/* eslint-disable no-underscore-dangle */
import React, { Component } from "react";
import CKEditor from "ckeditor4-react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";

axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class BoardWriteForm extends Component {
  constructor() {
    super();
    this.state = {
      data: "",
    };
  }

  UNSAFE_componentWillMount({ location }) {
    // 컴포넌트가 마운트 되기 직전에 실행되는 메소드
    if (location.query !== undefined) {
      this.setState({
        data: location.query.content,
      });
    }
  }

  componentDidMount({ location }) {
    // 컴포넌트가 마운트 된 직후에 실행되는 메소드
    if (location.query !== undefined) {
      this.boardTitle.value = location.query.title;
    }
  }

  writeBoard = ({ location }) => {
    let url;
    let sendParam;
    const { data } = this.state;
    const boardTitle = this.boardTitle.value;
    const boardContent = data;

    if (boardTitle === undefined || boardTitle === "") {
      alert("글 제목을 입력 해주세요.");
      boardTitle.focus();
    } else if (boardContent === undefined || boardContent === "") {
      alert("글 내용을 입력 해주세요.");
      boardContent.focus();
    }

    if (location.query !== undefined) {
      url = "http://localhost:8080/board/update";
      sendParam = {
        headers,
        _id: location.query._id,
        title: boardTitle,
        content: boardContent,
      };
    } else {
      url = "http://localhost:8080/board/write";
      sendParam = {
        headers,
        _id: $.cookie("login_id"),
        title: boardTitle,
        content: boardContent,
      };
    }

    axios
      .post(url, sendParam)
      // 정상 수행
      .then((returnData) => {
        if (returnData.data.message) {
          alert(returnData.data.message);
          window.location.href = "/";
        } else {
          alert("글쓰기 실패");
        }
      })
      // 에러
      .catch((err) => {
        console.log(err);
      });
  };

  onEditorChange = (evt) => {
    this.setState({
      data: evt.editor.getData(),
    });
  };

  render() {
    const divStyle = {
      margin: 50,
    };
    const titleStyle = {
      marginBottom: 5,
    };
    const buttonStyle = {
      marginTop: 5,
    };
    const { data } = this.state;

    return (
      <div style={divStyle} className="App">
        <h2>글쓰기</h2>
        <Form.Control
          type="text"
          style={titleStyle}
          placeholder="글 제목"
          ref={(ref) => this.boardTitle === ref}
        />
        <CKEditor data={data} onChange={this.onEditorChange} />
        <Button style={buttonStyle} onClick={this.writeBoard} block>
          저장하기
        </Button>
      </div>
    );
  }
}

export default BoardWriteForm;
