import React, { Component } from "react";
import Homeheader from "../Homepage/Homeheader/Homeheader";
import HomeFooter from "../Homepage/HomeFooter/HomeFooter";
import blog1 from "../../assets/images/blog1.jpg";
import "./Blog.scss";

class Blog extends Component {
  render() {
    return (
      <React.Fragment>
        <Homeheader />
        <h3 className="title-blog">Chủ đề hot</h3>
        <div class="blog-card">
          <img className="blog-img" src={blog1} alt="blog-img" />
          <div class="card-body">
            <p class="card-text">
              Galaxy XCover6 Pro lộ ảnh render chính thức kèm cấu hình chi tiết
            </p>
          </div>
        </div>
        <HomeFooter />
      </React.Fragment>
    );
  }
}

export default Blog;
