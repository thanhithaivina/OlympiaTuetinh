export interface Question {
  q: string;
  options: string[];
  a: number;
  points?: number;
}

export interface Round2Data {
  secretWord: string;
  secretWordDisplay: string;
  rows: {
    question: string;
    answer: string;
    display: string;
    length: number;
  }[];
}

export const round1Pool: Question[] = [
  { q: "Yếu tố nào quan trọng nhất khi bắt đầu định hướng nghề nghiệp?", options: ["Sở thích và năng lực bản thân", "Mức lương cao", "Theo ý muốn của gia đình", "Nghề đang hot trên mạng"], a: 0 },
  { q: "Thị trường lao động là nơi diễn ra các giao dịch giữa ai?", options: ["Người mua và người bán hàng hóa", "Người lao động và người sử dụng lao động", "Học sinh và giáo viên", "Nhà nước và doanh nghiệp"], a: 1 },
  { q: "Để tìm hiểu thông tin về một ngành nghề, nguồn nào sau đây là đáng tin cậy nhất?", options: ["Tin đồn trên mạng xã hội", "Phim ảnh truyền hình", "Trang web chính thức của các trường đại học, cao đẳng", "Ý kiến chủ quan của một người bạn"], a: 2 },
  { q: "Kỹ năng nào sau đây được coi là 'kỹ năng mềm' cần thiết cho mọi ngành nghề?", options: ["Sử dụng phần mềm kế toán", "Giao tiếp và làm việc nhóm", "Lập trình máy tính", "Sửa chữa máy móc"], a: 1 },
  { q: "Khởi nghiệp (Startup) thường gắn liền với yếu tố nào nhất?", options: ["Sự ổn định tuyệt đối", "Đổi mới sáng tạo và rủi ro", "Làm việc theo giờ hành chính", "Chỉ cần vốn lớn là thành công"], a: 1 },
  { q: "Hệ thống giáo dục nghề nghiệp ở Việt Nam bao gồm các trình độ nào?", options: ["Sơ cấp, Trung cấp, Cao đẳng", "Tiểu học, THCS, THPT", "Đại học, Thạc sĩ, Tiến sĩ", "Chỉ có Trung cấp"], a: 0 },
  { q: "Mục đích chính của việc viết CV (Curriculum Vitae) là gì?", options: ["Kể lại toàn bộ câu chuyện cuộc đời", "Tóm tắt kinh nghiệm và kỹ năng để ứng tuyển", "Xin nghỉ phép", "Đăng ký kết hôn"], a: 1 },
  { q: "Đạo đức nghề nghiệp đòi hỏi người lao động phải có thái độ như thế nào?", options: ["Làm việc qua loa cho xong", "Trung thực, trách nhiệm và tận tụy", "Chỉ quan tâm đến lợi ích cá nhân", "Thường xuyên đi trễ về sớm"], a: 1 },
  { q: "Xu hướng nghề nghiệp nào đang phát triển mạnh mẽ trong thời đại 4.0?", options: ["Nông nghiệp thủ công", "Công nghệ thông tin và Trí tuệ nhân tạo", "Đánh máy chữ", "Giao tiếp bằng thư tay"], a: 1 },
  { q: "Khi tham gia phỏng vấn xin việc, trang phục nên như thế nào?", options: ["Mặc đồ ngủ cho thoải mái", "Lịch sự, gọn gàng, phù hợp với văn hóa công ty", "Mặc đồ đi biển", "Trang phục dạ hội lộng lẫy"], a: 1 },
  { q: "Năng lực cốt lõi là gì?", options: ["Khả năng ăn uống tốt", "Những khả năng đặc biệt giúp cá nhân hoàn thành xuất sắc công việc", "Sở thích xem phim", "Khả năng ngủ nướng"], a: 1 },
  { q: "Thông tin thị trường lao động giúp ích gì cho học sinh THPT?", options: ["Dự báo nhu cầu nhân lực để chọn ngành học phù hợp", "Biết được giá cả hàng hóa", "Dự báo thời tiết", "Tìm kiếm bạn bè trên mạng"], a: 0 },
  { q: "Sinh viên tốt nghiệp Cao đẳng có thể làm gì tiếp theo?", options: ["Chỉ có thể đi làm công nhân", "Đi làm ngay hoặc học liên thông lên Đại học", "Bắt buộc phải học lại từ đầu", "Không thể xin việc"], a: 1 },
  { q: "Trong quá trình tìm việc, 'Networking' (Xây dựng mạng lưới quan hệ) có ý nghĩa gì?", options: ["Kết nối mạng internet", "Mở rộng cơ hội nghề nghiệp qua các mối quan hệ", "Làm quen để đi chơi", "Bán hàng đa cấp"], a: 1 },
  { q: "Khi trả lời phỏng vấn, phương pháp STAR thường được dùng để làm gì?", options: ["Ngắm sao trên trời", "Trình bày kinh nghiệm làm việc một cách logic", "Vẽ hình ngôi sao", "Đánh giá ngoại hình"], a: 1 },
  { q: "Yếu tố nào KHÔNG phải là đặc điểm của một doanh nhân khởi nghiệp thành công?", options: ["Sáng tạo", "Kiên trì", "Sợ thất bại và né tránh rủi ro", "Dám nghĩ dám làm"], a: 2 },
  { q: "Trách nhiệm xã hội của doanh nghiệp (CSR) là gì?", options: ["Chỉ lo kiếm tiền", "Cam kết đóng góp cho sự phát triển bền vững của cộng đồng", "Trốn thuế", "Bóc lột sức lao động"], a: 1 },
  { q: "Để đánh giá năng lực bản thân, công cụ nào sau đây thường được sử dụng?", options: ["Bói bài Tarot", "Trắc nghiệm tính cách MBTI, Holland", "Xem bói tay", "Tung đồng xu"], a: 1 },
  { q: "'Freelancer' (Người làm nghề tự do) có đặc điểm gì?", options: ["Làm việc độc lập, không bị gò bó về thời gian và không gian", "Bắt buộc đến văn phòng lúc 8h sáng", "Chỉ làm việc cho nhà nước", "Có mức lương cố định hàng tháng"], a: 0 },
  { q: "Kỹ năng tự học có vai trò như thế nào trong sự nghiệp?", options: ["Không cần thiết", "Giúp cập nhật kiến thức liên tục và thích ứng với sự thay đổi", "Chỉ dành cho học sinh", "Làm mất thời gian"], a: 1 }
];

export const round2Pool: Round2Data[] = [
  {
    secretWord: "NGHENGHIEP",
    secretWordDisplay: "NGHỀ NGHIỆP",
    rows: [
      { question: "Đây là một trong những yếu tố quan trọng nhất để bạn gắn bó lâu dài với một công việc. (5 chữ cái)", answer: "DAMME", display: "ĐAM MÊ", length: 5 },
      { question: "Nơi diễn ra sự mua bán sức lao động được gọi là ... lao động. (9 chữ cái)", answer: "THITRUONG", display: "THỊ TRƯỜNG", length: 9 },
      { question: "Khả năng thực hiện một công việc nào đó đạt kết quả tốt được gọi là gì? (7 chữ cái)", answer: "NANGLUC", display: "NĂNG LỰC", length: 7 },
      { question: "Quá trình tìm kiếm và lựa chọn nhân sự phù hợp cho một vị trí công việc gọi là gì? (9 chữ cái)", answer: "TUYENDUNG", display: "TUYỂN DỤNG", length: 9 }
    ]
  },
  {
    secretWord: "TRITUENHANTAO",
    secretWordDisplay: "TRÍ TUỆ NHÂN TẠO",
    rows: [
      { question: "Thiết bị điện tử có khả năng xử lý thông tin và thực hiện các phép tính logic. (7 chữ cái)", answer: "MAYTINH", display: "MÁY TÍNH", length: 7 },
      { question: "Tập hợp các quy tắc hoặc bước đi rõ ràng để giải quyết một vấn đề. (9 chữ cái)", answer: "THUATTOAN", display: "THUẬT TOÁN", length: 9 },
      { question: "Khả năng suy luận hợp lý, chặt chẽ, là nền tảng của lập trình. (5 chữ cái)", answer: "LOGIC", display: "LOGIC", length: 5 },
      { question: "Việc ứng dụng công nghệ để máy móc tự hoạt động thay thế con người. (9 chữ cái)", answer: "TUDONGHOA", display: "TỰ ĐỘNG HÓA", length: 9 }
    ]
  },
  {
    secretWord: "DULIEUSO",
    secretWordDisplay: "DỮ LIỆU SỐ",
    rows: [
      { question: "Những gì đem lại hiểu biết cho con người về thế giới xung quanh. (8 chữ cái)", answer: "THONGTIN", display: "THÔNG TIN", length: 8 },
      { question: "Sự di chuyển của dữ liệu từ nơi này sang nơi khác trong mạng. (9 chữ cái)", answer: "LUUCHUYEN", display: "LƯU CHUYỂN", length: 9 },
      { question: "Mạng máy tính toàn cầu kết nối hàng tỷ thiết bị. (8 chữ cái)", answer: "INTERNET", display: "INTERNET", length: 8 },
      { question: "Việc bảo vệ thông tin an toàn khỏi sự truy cập trái phép. (6 chữ cái)", answer: "BAOMAT", display: "BẢO MẬT", length: 6 }
    ]
  },
  {
    secretWord: "CONGNGHEAI",
    secretWordDisplay: "CÔNG NGHỆ AI",
    rows: [
      { question: "Một lĩnh vực của AI giúp hệ thống tự học từ dữ liệu mà không cần lập trình rõ ràng. (6 chữ cái)", answer: "HOCMAY", display: "HỌC MÁY", length: 6 },
      { question: "Cỗ máy có thể thực hiện các công việc tự động bằng sự điều khiển của máy tính. (5 chữ cái)", answer: "ROBOT", display: "ROBOT", length: 5 },
      { question: "Quá trình xem xét chi tiết dữ liệu để tìm ra các mẫu và thông tin hữu ích. (8 chữ cái)", answer: "PHANTICH", display: "PHÂN TÍCH", length: 8 },
      { question: "Thời gian sắp tới, nơi AI được dự đoán sẽ phát triển mạnh mẽ và thay đổi cuộc sống. (8 chữ cái)", answer: "TUONGLAI", display: "TƯƠNG LAI", length: 8 }
    ]
  }
];

export const round3Pool: Question[] = [
  { q: "Hãy sắp xếp các bước sau để có một buổi phỏng vấn xin việc thành công: 1. Gửi thư cảm ơn, 2. Tìm hiểu về công ty, 3. Tham gia phỏng vấn, 4. Chuẩn bị trang phục.", options: ["2 - 4 - 3 - 1", "4 - 2 - 3 - 1", "2 - 3 - 4 - 1", "4 - 3 - 2 - 1"], a: 0 },
  { q: "Theo thống kê, nhóm ngành nào sau đây có xu hướng tuyển dụng tăng mạnh nhất trong kỷ nguyên Cách mạng công nghiệp 4.0?", options: ["Nông nghiệp truyền thống", "Công nghệ thông tin và Trí tuệ nhân tạo", "Khai thác than đá", "Thủ công mỹ nghệ"], a: 1 },
  { q: "Tìm điểm chung của các nghề sau: Bác sĩ, Giáo viên, Cảnh sát phòng cháy chữa cháy.", options: ["Đều làm việc trong văn phòng", "Đều yêu cầu thể lực xuất chúng", "Đều mang tính phục vụ cộng đồng và trách nhiệm xã hội cao", "Đều có mức lương cao nhất thị trường"], a: 2 },
  { q: "Nếu bạn có điểm mạnh là tư duy logic, thích làm việc với các con số và chi tiết, nhóm nghề nào sau đây phù hợp nhất?", options: ["Nghệ thuật, thiết kế", "Kế toán, kiểm toán, phân tích dữ liệu", "Tâm lý học, công tác xã hội", "Hướng dẫn viên du lịch"], a: 1 },
  { q: "Sắp xếp quy trình khởi nghiệp cơ bản: 1. Gọi vốn, 2. Lên ý tưởng, 3. Phát triển sản phẩm, 4. Nghiên cứu thị trường.", options: ["2 - 4 - 3 - 1", "2 - 3 - 4 - 1", "4 - 2 - 3 - 1", "1 - 2 - 3 - 4"], a: 0 },
  { q: "Kỹ năng nào được đánh giá là quan trọng nhất khi làm việc nhóm?", options: ["Nói to nhất", "Lắng nghe, thấu hiểu và phối hợp", "Luôn bảo vệ ý kiến cá nhân", "Đùn đẩy trách nhiệm"], a: 1 },
  { q: "Biểu đồ hình tròn thường được sử dụng để làm gì trong các báo cáo công việc?", options: ["Thể hiện sự thay đổi theo thời gian", "Thể hiện tỷ lệ phần trăm của các thành phần", "So sánh số lượng giữa các mục", "Hiển thị quy trình làm việc"], a: 1 },
  { q: "Thuật ngữ 'Gap year' thường được dùng để chỉ điều gì?", options: ["Năm học bị lưu ban", "Khoảng thời gian nghỉ ngơi, trải nghiệm trước khi học tiếp hoặc đi làm", "Năm làm việc với năng suất cao nhất", "Năm công ty phá sản"], a: 1 },
  { q: "Sắp xếp các bậc học theo thứ tự từ thấp đến cao: 1. Thạc sĩ, 2. Cử nhân (Đại học), 3. Tiến sĩ, 4. Trung cấp.", options: ["4 - 2 - 1 - 3", "2 - 4 - 1 - 3", "4 - 1 - 2 - 3", "2 - 1 - 3 - 4"], a: 0 },
  { q: "Kỹ năng giải quyết vấn đề bao gồm bước đầu tiên là gì?", options: ["Đổ lỗi cho người khác", "Xác định rõ vấn đề", "Đưa ra giải pháp ngay lập tức", "Bỏ qua vấn đề"], a: 1 },
  { q: "Khái niệm 'Work-life balance' có nghĩa là gì?", options: ["Làm việc 24/7", "Cân bằng giữa công việc và cuộc sống cá nhân", "Chỉ quan tâm đến cuộc sống, bỏ bê công việc", "Làm việc tại nhà"], a: 1 },
  { q: "Trong CV của sinh viên mới ra trường, phần nào thường được nhà tuyển dụng chú ý nhất khi chưa có nhiều kinh nghiệm làm việc?", options: ["Sở thích cá nhân", "Kỹ năng mềm và hoạt động ngoại khóa, dự án thực tế", "Tình trạng hôn nhân", "Màu sắc của CV"], a: 1 },
  { q: "Sắp xếp các bước cơ bản trong quá trình tìm việc: 1. Phỏng vấn, 2. Viết CV, 3. Tìm kiếm thông tin tuyển dụng, 4. Thử việc.", options: ["3 - 2 - 1 - 4", "2 - 3 - 1 - 4", "3 - 1 - 2 - 4", "2 - 1 - 3 - 4"], a: 0 },
  { q: "Ngành 'Logistics' liên quan chủ yếu đến lĩnh vực nào?", options: ["Sản xuất phần mềm", "Quản lý chuỗi cung ứng và vận chuyển hàng hóa", "Chăm sóc sức khỏe", "Giáo dục mầm non"], a: 1 },
  { q: "Khả năng thích ứng (Adaptability) quan trọng vì sao?", options: ["Để luôn đồng ý với mọi người", "Giúp tồn tại và phát triển trong môi trường làm việc thay đổi nhanh chóng", "Để không phải làm việc chăm chỉ", "Để dễ dàng chuyển công ty"], a: 1 },
  { q: "'Mentor' trong môi trường công sở có vai trò gì?", options: ["Người dọn dẹp văn phòng", "Người hướng dẫn, cố vấn giàu kinh nghiệm", "Khách hàng khó tính", "Đối thủ cạnh tranh"], a: 1 }
];

export const round4Pool: Question[] = [
  { q: "Hệ thống giáo dục đại học ở Việt Nam hiện nay bao gồm những trình độ đào tạo nào?", options: ["Chỉ có Đại học", "Đại học, Thạc sĩ, Tiến sĩ", "Cao đẳng và Đại học", "Trung cấp, Cao đẳng, Đại học"], a: 1, points: 20 },
  { q: "Trong hồ sơ xin việc, CV (Curriculum Vitae) có vai trò gì?", options: ["Là bản cam kết làm việc lâu dài", "Là bản tóm tắt quá trình học tập, kinh nghiệm và kỹ năng của ứng viên", "Là giấy khám sức khỏe", "Là đơn xin nghỉ phép"], a: 1, points: 20 },
  { q: "Trách nhiệm với nghề nghiệp được thể hiện rõ nhất qua hành động nào?", options: ["Chỉ làm đúng những gì được giao, không làm thêm", "Tuân thủ đạo đức nghề nghiệp, không ngừng học hỏi và cống hiến", "Thường xuyên chuyển việc để tìm lương cao hơn", "Giấu giếm sai sót để không bị phạt"], a: 1, points: 20 },
  { q: "Môi trường làm việc 'Độc hại' (Toxic workplace) thường có biểu hiện gì?", options: ["Mọi người giúp đỡ lẫn nhau", "Thiếu tôn trọng, áp lực tiêu cực, bè phái", "Có nhiều cây xanh", "Lương rất cao"], a: 1, points: 20 },
  { q: "Kỹ năng quản lý thời gian hiệu quả mang lại lợi ích gì lớn nhất?", options: ["Có nhiều thời gian để ngủ hơn", "Tăng năng suất làm việc và giảm căng thẳng", "Làm cho người khác thấy mình bận rộn", "Tránh bị sếp mắng"], a: 1, points: 20 },
  { q: "'Văn hóa doanh nghiệp' được hiểu là gì?", options: ["Các buổi liên hoan của công ty", "Hệ thống các giá trị, niềm tin và quy tắc ứng xử chung của công ty", "Đồng phục của nhân viên", "Kiến trúc của tòa nhà văn phòng"], a: 1, points: 20 },
  { q: "Khi khởi nghiệp, 'Khách hàng mục tiêu' là ai?", options: ["Tất cả mọi người trên thế giới", "Nhóm người có nhu cầu và khả năng mua sản phẩm cao nhất", "Gia đình và bạn bè", "Những người không thích sản phẩm của bạn"], a: 1, points: 20 },
  { q: "Lợi ích của việc tham gia các hoạt động tình nguyện đối với học sinh THPT là gì?", options: ["Được trả lương cao", "Phát triển kỹ năng mềm, mở rộng mối quan hệ và đóng góp cho cộng đồng", "Được miễn thi đại học", "Không có lợi ích gì"], a: 1, points: 20 },
  { q: "'Lương Gross' và 'Lương Net' khác nhau cơ bản ở điểm nào?", options: ["Gross là lương trả bằng tiền mặt, Net trả qua thẻ", "Gross bao gồm cả các khoản thuế và bảo hiểm, Net là số tiền thực nhận", "Gross dành cho sếp, Net dành cho nhân viên", "Không có sự khác biệt"], a: 1, points: 20 },
  { q: "Tại sao người lao động cần phải cập nhật kiến thức chuyên môn thường xuyên?", options: ["Để khoe khoang với đồng nghiệp", "Để không bị tụt hậu và đáp ứng yêu cầu công việc ngày càng cao", "Vì công ty bắt buộc", "Để được đi du lịch"], a: 1, points: 20 },
  { q: "'Làm việc từ xa' (Remote work) đòi hỏi kỹ năng nào cao nhất?", options: ["Kỹ năng lái xe", "Kỷ luật bản thân và giao tiếp trực tuyến hiệu quả", "Kỹ năng nấu ăn", "Kỹ năng trang điểm"], a: 1, points: 20 },
  { q: "Đạo đức trong nghiên cứu khoa học nghiêm cấm hành vi nào nhất?", options: ["Làm việc nhóm", "Đạo văn và làm giả số liệu", "Công bố kết quả nghiên cứu", "Xin tài trợ nghiên cứu"], a: 1, points: 20 }
];

export const botNames = ["Thí sinh 1 (Bạn)", "Thí sinh 2", "Thí sinh 3", "Thí sinh 4"];

// Helper to shuffle an array
const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export function getGameSession() {
  return {
    round1: shuffleArray(round1Pool).slice(0, 5),
    round2: shuffleArray(round2Pool)[0],
    round3: shuffleArray(round3Pool).slice(0, 4),
    round4: shuffleArray(round4Pool).slice(0, 3)
  };
}
