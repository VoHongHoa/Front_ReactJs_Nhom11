import React, { Component } from "react";
import Homeheader from "../Homepage/Homeheader/Homeheader";
import HomeFooter from "../Homepage/HomeFooter/HomeFooter";
import detailblog6 from "../../assets/images/Blog1/detail6-blog1.jpg";
import detailblog7 from "../../assets/images/Blog1/detail7-blog1.jpg";
import detailblog8 from "../../assets/images/Blog1/detail8-blog1.jpg";
import detailblog9 from "../../assets/images/Blog1/detail9-blog1.jpg";
import detailblog10 from "../../assets/images/Blog1/detail12-blog1.jpg";
import "./Blog1.scss";

class Blog3 extends Component {
  render() {
    return (
      <React.Fragment>
        <Homeheader />
        <h3 className="title-blog">Cập nhật tin tức công nghệ</h3>
        <div className="container-blog1">
          <h5 className="h5">Tin tức:</h5>
          <div className="content-blog1">
            <h2 className="title-blog1">
              WWDC 2022: Điều gì sẽ xảy ra, iOS 16, macOS 13, MacBook Air được
              thiết kế lại và còn gì nữa?
            </h2>
            <p>Ngày 24/5/2022</p>
            <br />
            <b>
              Chưa đầy 2 tuần nữa, Apple sẽ tổ chức sự kiện WWDC 2022. Vào ngày
              6/6, chúng ta sẽ tìm hiểu thêm về các kế hoạch của công ty liên
              quan đến iOS 16, iPadOS 16, watchOS 9, macOS 13 và tvOS 16.
            </b>
            <p>
              Ngoài ra, chúng ta cũng có thể thấy Apple tiết lộ sản phẩm phần
              cứng mới hoặc giới thiệu một sản phẩm trong tương lai. Dưới đây là
              những gì có thể mong đợi từ Hội nghị các nhà phát triển toàn cầu
              của Apple trong năm nay.
            </p>
            <h3>iOS 16 sẽ xuất hiện với nhiều tính năng mới</h3>
            <img
              className="img-blog1"
              src={detailblog6}
              alt="detail-blog-img"
            />
            <p>
              Cho đến nay, các tin đồn cho biết Apple đang có kế hoạch cải tiến
              trung tâm thông báo và màn hình khóa, đồng thời bổ sung nhiều khả
              năng hơn cho Focus Mode, tính năng được công bố vào năm ngoái.
            </p>
            <p>
              Ngoài ra, Mark Gurman của Bloomberg cho biết iOS 16 một tính năng
              được đồn đại cho dòng iPhone 14 Pro, đó là Always On Display. Nhà
              báo cũng cho rằng iOS 16 sẽ mang lại các cải tiến sau: Hình nền có
              các tính năng giống như widget con, Chức năng giống như mạng xã
              hội đối với Messages, Các tính năng sức khỏe mới.
            </p>
            <h3>
              WWDC 2022 cuối cùng có thể mở ra tiềm năng của iPad với iPadOS 16
            </h3>
            <img className="img-blog1" src={detailblog7} title="img-blog" />
            <p>
              Những tin đồn về iPadOS 16 là sự pha trộn giữa thông tin nội bộ và
              những gì người dùng thắc mắc bấy lâu nay. Gurman cho biết anh ấy
              đang mong đợi “những thay đổi lớn đối với cửa sổ và đa nhiệm”.
              <br />
              Nếu điều đó trở thành sự thật, người dùng iPad cuối cùng cũng có
              thể tận dụng phần cứng mạnh mẽ đã có trên các mẫu iPad Pro và iPad
              Air mới nhất với chip M1.
              <br />
              Cũng giống như iOS 16, iPadOS 16 có thể sẽ có màn hình khóa và
              trung tâm thông báo được cải tiến, cùng với các chức năng mở rộng
              cho Focus Mode. Chưa hết, Apple cũng có thể mang đến một ứng Máy
              tính và thời tiết mới.
            </p>
            <h3>macOS 13 sẽ có tên Mammoth?</h3>
            <img className="img-blog1" src={detailblog8} title="img-blog" />
            <p>
              9to5Mac có một số lý do để tin rằng Apple sẽ giới thiệu macOS 13
              Mammoth trong sự kiện WWDC 2022 sắp tới. Không chỉ vậy, với quá
              trình chuyển đổi từ chip Intel sang Silicon cho dòng máy Mac của
              công ty hiện đã kết thúc, có thể chúng ta sẽ thấy rất nhiều tính
              năng dành riêng cho máy Mac M1 trong hệ điều hành macOS 13 sắp
              tới.
              <br />
              Gurman, trong bản tin Power On mới nhất của mình, cho biết máy Mac
              sẽ nhận được một số ứng dụng được thiết kế lại trong WWDC 2022 và
              “đại tu rất cần thiết đối với Tùy chọn hệ thống để làm cho chúng
              phù hợp hơn với Cài đặt trên iOS”.
            </p>
            <h3>watchOS 9 sẽ đi kèm các tính năng sức khỏe mới?</h3>
            <img className="img-blog1" src={detailblog9} title="img-blog" />
            <p>
              watchOS 9 dự kiến ​​sẽ nhận được một số cải tiến mới từ Apple
              trong bài phát biểu WWDC 2022 vào ngày 6/6. Các tin đồn trước đây
              cho rằng công ty cuối cùng sẽ cập nhật các Mặt đồng hồ cũ để trông
              đẹp hơn trên màn hình lớn hơn, chẳng hạn như các mặt đồng hồ có
              sẵn trong dòng Apple Watch Series 7.
              <br />
              Ngoài ra, sẽ có một tính năng chế độ năng lượng thấp tốt hơn và
              “những cải tiến đáng kể ảnh hưởng đến hoạt động và điều hướng hàng
              ngày” của Apple Watch. Chúng ta cũng có thể mong đợi watchOS 9 sẽ
              mang lại các bài tập mới, các phép đo sức khỏe và hơn thế nữa.
            </p>
            <h3>Sự xuất hiện RealityOS?</h3>
            <img className="img-blog1" src={detailblog10} title="img-blog" />
            <p>
              Hiện tại, vẫn chưa rõ liệu Apple có giới thiệu RealityOS sắp tới
              tại sự kiện WWDC 2022 hay không. Có một điều chắc chắn là tất cả
              các hệ điều hành khác có thể sẽ gợi ý về một loạt các tính năng
              mới đến với kính thực tế ảo hỗn hợp được đồn đại của Apple, dự
              kiến ​​sẽ được công bố vào cuối năm nay.
              <br />
              Ngay cả khi Apple không giới thiệu RealityOS, WWDC 2022 này chắc
              chắn sẽ có rất nhiều tính năng mới đến với tất cả các thiết bị của
              Apple vào cuối mùa thu này.
              <br />
              Bạn có hào hứng với WWDC 2022 không?
            </p>
          </div>
        </div>

        <HomeFooter />
      </React.Fragment>
    );
  }
}

export default Blog3;
