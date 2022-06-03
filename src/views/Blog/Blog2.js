import React, { Component } from "react";
import Homeheader from "../Homepage/Homeheader/Homeheader";
import HomeFooter from "../Homepage/HomeFooter/HomeFooter";
import detailblog3 from "../../assets/images/Blog1/detail3-blog1.jpg";
import detailblog4 from "../../assets/images/Blog1/detail4-blog1.jpg";
import detailblog5 from "../../assets/images/Blog1/detail5-blog1.jpg";
import "./Blog1.scss";

class Blog2 extends Component {
  render() {
    return (
      <React.Fragment>
        <Homeheader />
        <h3 className="title-blog">Cập nhật tin tức công nghệ</h3>
        <div className="container-blog1">
          <h5 className="h5">Tin tức:</h5>
          <div className="content-blog1">
            <h2 className="title-blog1">
              Galaxy XCover6 Pro lộ ảnh render chính thức kèm cấu hình chi tiết
            </h2>
            <p>Ngày 30/5/2022</p>
            <br />
            <b>
              Tuần trước, Samsung Galaxy XCover Pro 2 hay còn gọi là Galaxy
              XCover6 Pro đã được phát hiện trên trang web chứng nhận Bluetooth
              SIG. Giờ đây, hình ảnh render chính thức cùng với danh sách thông
              số kỹ thuật đầy đủ của smartphone này đã được chia sẻ.
            </b>
            <img
              className="img-blog1"
              src={detailblog3}
              alt="detail-blog-img"
            />
            <p>
              Theo đó, leaker nổi tiếng Onleaks dã hợp tác với Giznext đã tạo ra
              loạt ảnh render mới về Galaxy XCover6 Pro. Nhờ đó mà chúng ta có
              cái nhìn chi tiết về thiết kế smartphone này, đầy đủ các góc cạnh.
            </p>
            <img
              className="img-blog1"
              src={detailblog4}
              alt="detail-blog-img"
            />
            <p>
              Ở mặt sau, smartphone này có cụm camera hình viên thuốc chứa 2 ống
              kính và đèn flash LED nằm kế bên. Ở phía bên phải, thiết bị có nút
              chỉnh âm lượng và nút nguồn trong khi phía bên trái có một nút lớn
              với đường viền màu đỏ chưa rõ chức năng. Phần dưới cùng của Galaxy
              XCover6 Pro có loa ngoài và cổng sạc USB-C trong khi giắc cắm âm
              thanh nằm ở cạnh trên.
            </p>
            <p>
              Chiếc điện thoại bền bỉ này dường như có khung bằng nhựa cứng để
              tăng độ bền và mặt sau có các đường vân sần giúp thiết bị trở nên
              chắc chắn hơn. Ngoài ra, thiết bị được tiết lộ có kích thước 169 x
              80 x 10mm và nặng 235 gram.
            </p>
            <img className="img-blog1" src={detailblog5} title="img-blog" />
            <p>
              Về cấu hình, báo cáo cho biết Galaxy XCover6 Pro sẽ đi kèm với màn
              hình TFT 6.6 inch với độ phân giải 1,080 x 2,408 pixel, độ phân
              giải Full-HD+ và tốc độ làm mới 60Hz. Nó sẽ có viền dày và rãnh
              giọt sương để chứa camera trước.
            </p>
            <p>
              Bên trong, smartphone này sẽ được trang bị chipset Snapdragon 778G
              hỗ trợ 5G, đi kèm với RAM 6GB và bộ nhớ trong 128GB. Về mặt phần
              mềm, XCover6 Pro sẽ chạy One UI dựa trên hệ điều hành Android 12
              ngay khi xuất xưởng. Thiết bị này cũng được cho là có pin 4,050
              mAh, đủ dùng trong 1 ngày dài.
            </p>
            <p>
              Về khả năng nhiếp ảnh, Galaxy XCover6 Pro sẽ có camera chính 50
              megapixel kết hợp với ống kính siêu rộng có độ phân giải 8
              megapixel hoặc 12 megapixel. Ở mặt trước, smartphone này sẽ có cảm
              biến 13 megapixel để chụp ảnh tự sướng và gọi video call.
            </p>
          </div>
        </div>

        <HomeFooter />
      </React.Fragment>
    );
  }
}

export default Blog2;
