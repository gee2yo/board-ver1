import React, { Component } from "react";
import { Route } from "react-router-dom";
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
        resultForm = <Route exact path="/" component={BoardForm} />;
        return resultForm;
      }
      resultForm = <Route exact path="/" component={LoginForm} />;
      return resultForm;
    }

    getResultForm();

    return (
      <div>
        <Route path="/mypage" component={MypageForm} />
        <Route path="/boardWrite" component={BoardWriteForm} />
        <Route path="/board/detail" component={BoardDetail} />
        {resultForm}
      </div>
    );
  }
}

export default Body;
