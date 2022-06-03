import React, { Component } from "react";
import Homeheader from "../Homepage/Homeheader/Homeheader";
import HomeFooter from "../Homepage/HomeFooter/HomeFooter";
import detailblog1 from "../../assets/images/Blog1/detail-blog1.jpg";
import detailblog2 from "../../assets/images/Blog1/detail2-blog1.jpg";
import "./Blog1.scss";

class Blog1 extends Component {
  render() {
    return (
      <React.Fragment>
        <Homeheader />
        <h3 className="title-blog">Cập nhật tin tức công nghệ</h3>
        <div className="container-blog1">
          <h5 className="h5">Tin tức:</h5>
          <div className="content-blog1">
            <h2 className="title-blog1">
              Biến thể dùng chip Dimensity 9000 của Xiaomi 12S Pro vừa đạt chứng
              nhận 3C, sắp sửa ra mắt?
            </h2>
            <p>Ngày 1/6/2022</p>
            <br />
            <b>
              Các báo cáo gần đây đã tiết lộ rằng, Xiaomi đang làm việc trên bộ
              đôi Xiaomi 12S và 12S Pro mới.
            </b>
            <p>
              Theo tin đồn, Xiaomi 12S Pro sẽ hai tới cho người dùng 2 phiên bản
              khác nhau, dùng chipset Snapdragon 8+ Gen 1 và Dimensity 9000. Giờ
              đây, một chiếc smartphone Xiaomi mới có số model 2207122MC đã nhận
              được sự chấp thuận từ nền tảng chứng nhận 3C của Trung Quốc. Có
              tin đồn cho rằng, đây có thể là Xiaomi 12S Pro với chipset
              Dimensity 9000.
            </p>
            <img
              className="img-blog1"
              src={detailblog1}
              alt="detail-blog-img"
            />
            <p>
              Danh sách 3C của phiên bản dùng chip Dimensity 9000 của Xiaomi 12S
              Pro tiết lộ smartphone này sẽ đi kèm bộ sạc nhanh 67W. Số model
              2207122MC đã xuất hiện trong danh sách 3C trước đây đã được phát
              hiện trong cơ sở dữ liệu IMEI. Đáng tiếc là các chứng nhận này
              không có thông tin nào khác về cấu hình của thiết bị.
            </p>
            <p>
              Biến thể SD8+ G1 của Xiaomi 12S Pro vẫn chưa xuất hiện trong cơ sở
              dữ liệu của 3C. Các báo cáo trước đây đã tiết lộ rằng số model của
              biến thể SD8+ G1 sẽ là 2206122SC. Hy vọng trong vài ngày tới,
              chúng ta sẽ được nhìn thấy nhiều thông tin hơn về smartphone này
              xuất hiện trên các trang mạng.
            </p>
            <img className="img-blog1" src={detailblog2} title="img-blog" />
            <p>
              Trong một tin tức liên quan, Xiaomi dự kiến ​​sẽ ra mắt chiếc
              flagship Xiaomi 12 Ultra với chipset Snapdragon 8+ Gen 1 vào tháng
              7 năm nay. Nó dự kiến ​​sẽ có màn hình AMOLED cong 6.73 inch QHD+
              và hỗ trợ tần số quét 120Hz. Thiết lập máy ảnh phía sau của nó có
              thể bao gồm cảm biến chính Sony IMX800 50 megapixel, ống kính góc
              siêu rộng 48 megapixel, camera tele sử dụng ống kính tiềm vọng 48
              megapixel và cảm biến Lidar.
            </p>
          </div>
        </div>

        <HomeFooter />
      </React.Fragment>
    );
  }
}

export default Blog1;
