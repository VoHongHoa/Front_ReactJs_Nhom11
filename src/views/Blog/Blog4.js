import React, { Component } from "react";
import Homeheader from "../Homepage/Homeheader/Homeheader";
import HomeFooter from "../Homepage/HomeFooter/HomeFooter";
import detailblog13 from "../../assets/images/Blog1/detail13-blog1.jpg";
import detailblog14 from "../../assets/images/Blog1/detail14-blog1.jpg";
import detailblog15 from "../../assets/images/Blog1/detail15-blog1.jpg";
import detailblog16 from "../../assets/images/Blog1/detail16-blog1.jpg";
import "./Blog1.scss";

class Blog4 extends Component {
  render() {
    return (
      <React.Fragment>
        <Homeheader />
        <h3 className="title-blog">Cập nhật tin tức công nghệ</h3>
        <div className="container-blog1">
          <h5 className="h5">Tin tức:</h5>
          <div className="content-blog1">
            <h2 className="title-blog1">
              ASUS Republic of Gamers ra mắt loạt sản phẩm Laptop mới sử dụng
              AMD Ryzen 6000 Series tại Việt Nam
            </h2>
            <p>Ngày 10/5/2022</p>
            <br />
            <b>
              Tại sự kiện Rise Up: For Those Who Dare vừa diễn ra, ASUS Republic
              of Gamers (ROG) đã nâng tầm trải nghiệm Gaming với loạt sản phẩm
              Laptop hoàn toàn mới sử dụng AMD Ryzen 6000 Series.
            </b>
            <p>
              Dòng sản phẩm mới đem tới nhiều công nghệ vượt trội, thiết kế đậm
              chất cá tính và hiệu năng cực kỳ mạnh mẽ, đáp ứng tối đa mọi nhu
              cầu của Game thủ và giới sáng tạo nội dung.
            </p>
            <h3>ROG Zephyrus Duo 16: Hai màn hình – Không giới hạn</h3>
            <p>
              ROG Zephyrus Duo 16 là một trong những sản phẩm đổi mới và sáng
              tạo nhất của ROG trong năm 2022, với công nghệ màn hình thứ hai
              mang tên ScreenPad Plus giúp tăng năng suất làm việc lên tối đa,
              hỗ trợ stream Game trực tuyến hoặc trải nghiệm phong cách điều
              khiển hoàn toàn mới với các tựa Game được hỗ trợ như Dying Light
              2. Nhờ cơ chế bản lề 4 hướng mới, màn hình ScreenPad Plus sẽ tự
              động nâng cao một góc 13° khi mở máy và nằm sát với màn hình
              chính, cho trải nghiệm sử dụng hai màn hình gần như không viền.
            </p>
            <img className="img-blog1" src={detailblog13} title="img-blog" />
            <p>
              Sản phẩm được cài sẵn hệ điều hành Windows 11, tích hợp vi xử AMD
              Ryzen 9 6900HX và card đồ họa NVIDIA® GeForce RTX 3080 Ti với công
              suất tối đa 150W nhờ công nghệ Dynamic Boost cho hiệu năng cực
              đỉnh, đi kèm keo tản nhiệt kim loại lỏng giúp giảm nhiệt độ CPU
              lên tới 15°C so với keo tản nhiệt truyền thống. Công nghệ tản
              nhiệt AAS Plus 2.0 giúp tăng 30% lượng gió mát vào hệ thống, tối
              ưu hóa hiệu suất tản nhiệt, đảm bảo giữ hiệu năng cao nhất trong
              quá trình sử dụng lâu dài, chơi Game hoặc xử lý tác vụ đồ họa
              nặng. ROG Zephyrus Duo 16 cũng được tích hợp tính năng MUX Switch
              giúp tối ưu giữa hiệu năng và thời lượng pin.
              <br />
              ROG Zephyrus Duo 16 có độ phân giải QHD tần số quét 165Hz, tỷ lệ
              16:10, 512 vùng tối cục bộ, độ sáng lên tới 1100 nits, đạt chuẩn
              VESA DisplayHDR 1000, độ tương phản 100,000:1 . Đây cũng là màn
              hình Laptop đầu tiên trên thế giới đạt chứng chỉ ROG Nebula HDR,
              mang tới trải nghiệm chơi Game và xem phim HDR đỉnh cao.
            </p>
            <img className="img-blog1" src={detailblog14} title="img-blog" />
            <p>
              ROG Zephyrus Duo 16 cũng được tích hợp công nghệ bàn phím
              NumberPad ảo ở bàn rê chuột, bàn phím LED RGB từng phím với hành
              trình lên tới 1.7m, hệ thống 6 loa với hai loa trầm triệt tiêu lực
              kép (Dual Force-Cancelling Woofers), hỗ trợ Dolby Atmos, âm thanh
              Hi-Res chất lượng cao và công nghệ khử tiếng ồn hai chiều AI Noise
              Cancellation. Dù được tích hợp hàng loạt công nghệ và sở hữu hai
              màn hình riêng biệt, nhưng Zephyrus Duo 16 vẫn vừa vặn trong thân
              máy Laptop 15 inch truyền thống, cho khả năng di động.
            </p>
            <h3>
              ROG Zephyrus G14 và ROG Zephyrus G15: Đỉnh hiệu năng – Bật phong
              cách
            </h3>
            <p>
              Với phiên bản nâng cấp trong năm 2022, ROG Zephyrus G14 sẽ được
              tăng lực nhờ hệ điều hành Windows 11 cài sẵn, vi xử lý AMD Ryzen 9
              Series và card đồ họa AMD Radeon RX 6000S Series với tính năng MUX
              Switch đi kèm, cho hiệu năng tối ưu theo nhu cầu của người dùng.
              Hệ thống tản nhiệt thông minh ROG Intelligent Cooling với keo tản
              nhiệt kim loại lỏng và tản nhiệt buồng hơi giúp đảm bảo hiệu năng
              tuyệt vời trong thời gian dài sử dụng, đi kèm RAM DDR5 và SSD PCIe
              1TB cho tốc độ tải ứng dụng cực nhanh và tối ưu khi xử lý đa tác
              vụ.
            </p>
            <img className="img-blog1" src={detailblog15} title="img-blog" />
            <p>
              ROG Zephyrus G14 sở hữu hai màu sắc là Xám Eclipse Gray và Trắng
              Moonlight White, với logo thương hiệu đậm cá tính. Phần mặt lưng
              có thiết kế vô cùng độc đáo với 14,969 lỗ được CNC chính xác đi
              kèm 1,449 bóng đèn LED mini phía dưới, cho phép người dùng tự do
              sáng tạo nội dung hiển thị trên màn hình AniMe Matrix độc quyền,
              từ thú cưng ảo, hình ảnh động, hiệu ứng âm thanh tới thông báo hệ
              thống. Hệ thống bóng LED mini mới có số lượng nhiều hơn tới 20% so
              với thế hệ cũ, mang tới nhiều hiệu ứng và trải nghiệm hình ảnh
              chân thực hơn.
              <br />
              Sản phẩm cũng hỗ trợ âm thanh Dolby Atmos, hệ thống mic 3D với
              công nghệ khử tiếng ồn AI Noise Canceling, cùng WiFi 6E cho tốc độ
              truy cập Internet cực nhanh. Riêng ROG Zephyrus G15 tuy không có
              nhiều thay đổi về mặt thiết kế, nhưng đều được nâng cấp cấu hình
              toàn diện, sử dụng linh kiện mới nhất từ AMD và NVIDIA, RAM DDR5,
              WiFi 6E và đặc biệt là đi kèm tính năng MUX Switch.
            </p>
            <h3>
              ROG Flow X13 và ROG XG Mobile: Laptop Gaming 13 inch xoay gập mạnh
              nhất thế giới
            </h3>
            <img className="img-blog1" src={detailblog16} title="img-blog" />
            <p>
              Là Laptop Gaming 13 inch mạnh nhất năm 2021, ROG Flow X13 năm nay
              cũng được nâng cấp về hiệu năng với vi xử lý AMD Ryzen 9 6000
              Series và card đồ họa NVIDIA GeForce RTX 3050 Ti tích hợp MUX
              Swtich, sử dụng RAM LPDDR5 xung nhịp lên đến 6400MHz và màn hình
              có độ sáng lên đến 500 nits.
              <br />
              Với nhu cầu chơi Game AAA bom tấn, xử lý đồ họa nặng, hoặc mở rộng
              kết nối như USB, DisplayPort, HDMI và cổng mạng Ethernet, ROG Flow
              X13 có thể kết hợp với card đồ họa rời ROG XG Mobile, tích hợp
              NVIDIA® GeForce RTX™ 3080 mạnh mẽ. Đặc biệt năm nay ROG XG Mobile
              sẽ được bán lẻ, bổ sung thêm sự lựa chọn cho người dùng.
            </p>
          </div>
        </div>

        <HomeFooter />
      </React.Fragment>
    );
  }
}

export default Blog4;
