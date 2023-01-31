import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import $ from "jquery";
import {} from "jquery.cookie";
import LoginForm from "./LoginForm";
import BoardForm from "./BoardForm";
import BoardWriteForm from "./BoardWriteForm";
import BoardDetail from "./BoardDetail";
import MypageForm from "./MypageForm";

class Body extends Component {
  render() {
    let resultForm;

    function getResultForm() {
      // console.log($.cookie("login_id"));
      if ($.cookie("login_id")) {
        resultForm = <Route element={<BoardForm />} exact path="/" />;
        return resultForm;
      }
      resultForm = <Route element={<LoginForm />} exact path="/" />;
      return resultForm;
    }

    getResultForm();

    return (
      <div>
        <Routes>
          <Route path="/mypage" component={MypageForm} />
          <Route path="/boardWrite" component={BoardWriteForm} />
          <Route path="/board/detail" component={BoardDetail} />
          {resultForm}
        </Routes>
      </div>
    );
  }
}

export default Body;
