-- Create news table
CREATE TABLE IF NOT EXISTS news (
  id BIGSERIAL PRIMARY KEY,
  title_vi TEXT NOT NULL,
  title_en TEXT NOT NULL,
  content_vi TEXT NOT NULL,
  content_en TEXT NOT NULL,
  excerpt_vi TEXT,
  excerpt_en TEXT,
  image_url TEXT,
  category VARCHAR(50) DEFAULT 'company',
  published BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  service TEXT,
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Policies for news (public read, authenticated write)
CREATE POLICY "Allow public read news" ON news
  FOR SELECT TO anon, authenticated
  USING (published = true);

CREATE POLICY "Allow authenticated all on news" ON news
  FOR ALL TO authenticated
  USING (true);

-- Policies for contacts
CREATE POLICY "Allow public insert contacts" ON contacts
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated read contacts" ON contacts
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated update contacts" ON contacts
  FOR UPDATE TO authenticated
  USING (true);

-- Insert sample news data
INSERT INTO news (title_vi, title_en, content_vi, content_en, excerpt_vi, excerpt_en, image_url, category, featured) VALUES
('Tàu thương mại điện tử xuyên biên giới Trung Quốc-Châu Âu chính thức khai trương', 'China-Europe Cross-border E-commerce Train Officially Launched', 
'Tàu thương mại điện tử xuyên biên giới Trung Quốc-Châu Âu đã chính thức khai trương, đánh dấu bước tiến quan trọng trong việc phát triển logistics thương mại điện tử xuyên biên giới. Sagoke tự hào là đối tác chiến lược trong dự án này, cung cấp dịch vụ logistics toàn diện từ kho bãi, đóng gói đến vận chuyển và thông quan. Tuyến đường sắt này kết nối trực tiếp các trung tâm thương mại điện tử lớn của Trung Quốc với thị trường châu Âu, rút ngắn thời gian vận chuyển xuống còn 15-18 ngày so với 35-40 ngày bằng đường biển. Với tần suất 3 chuyến/tuần, tuyến này có thể xử lý hàng nghìn container mỗi tháng, đáp ứng nhu cầu ngày càng tăng của thương mại điện tử xuyên biên giới.',
'The China-Europe cross-border e-commerce train has officially launched, marking an important step in developing cross-border e-commerce logistics. Sagoke is proud to be a strategic partner in this project, providing comprehensive logistics services from warehousing, packaging to transportation and customs clearance. This railway route directly connects major e-commerce centers in China with European markets, reducing shipping time to 15-18 days compared to 35-40 days by sea. With a frequency of 3 trips per week, this route can handle thousands of containers per month, meeting the growing demand for cross-border e-commerce.',
'Sagoke đẩy mạnh dịch vụ logistics thương mại điện tử xuyên biên giới với tuyến tàu mới.', 'Sagoke enhances cross-border e-commerce logistics with new train route.',
'/cross-border-train-event.png', 'company', true),

('Diễn đàn Kết nối Vận tải Toàn cầu 2025', 'Global Transport Connectivity Forum 2025',
'Sagoke đã tham gia Diễn đàn Kết nối Vận tải Toàn cầu 2025 tại Singapore, nơi quy tụ hơn 500 chuyên gia logistics hàng đầu thế giới. Tại diễn đàn, CEO Sagoke đã trình bày về "Tương lai của Logistics Á-Âu trong kỷ nguyên số", chia sẻ những thành tựu và kế hoạch phát triển của công ty. Sagoke cũng ký kết thỏa thuận hợp tác với 5 đối tác quốc tế mới, mở rộng mạng lưới dịch vụ đến 15 quốc gia mới. Diễn đàn cũng là cơ hội để Sagoke giới thiệu nền tảng tracking AI mới, cho phép khách hàng theo dõi hàng hóa real-time với độ chính xác 99.9%.',
'Sagoke participated in the Global Transport Connectivity Forum 2025 in Singapore, which brought together over 500 leading logistics experts worldwide. At the forum, Sagoke CEO presented on "The Future of Asia-Europe Logistics in the Digital Era", sharing the company achievements and development plans. Sagoke also signed cooperation agreements with 5 new international partners, expanding the service network to 15 new countries. The forum was also an opportunity for Sagoke to introduce the new AI tracking platform, allowing customers to track goods in real-time with 99.9% accuracy.',
'Sagoke tham gia diễn đàn toàn cầu và ký kết hợp tác mở rộng mạng lưới.', 'Sagoke joins global forum and signs partnerships to expand network.',
'/china-europe-freight.png', 'exhibition', true),

('Hội nghị Tổng kết Giữa năm 2025', 'Mid-Year Review Conference 2025',
'Sagoke tổ chức Hội nghị Tổng kết Giữa năm 2025 với sự tham gia của toàn thể nhân viên và đối tác chiến lược. Trong 6 tháng đầu năm, Sagoke đã đạt được nhiều thành tựu đáng kể: doanh thu tăng 45% so với cùng kỳ, mở rộng 8 văn phòng mới tại châu Âu và Đông Nam Á, triển khai thành công hệ thống quản lý kho thông minh tại 12 depot. Đặc biệt, dịch vụ Sagoke Express đã vận chuyển thành công hơn 50,000 TEU, thiết lập kỷ lục mới. Hội nghị cũng công bố kế hoạch đầu tư 100 triệu USD vào công nghệ xanh và bền vững trong 3 năm tới.',
'Sagoke organized the Mid-Year Review Conference 2025 with the participation of all employees and strategic partners. In the first 6 months of the year, Sagoke achieved many remarkable achievements: revenue increased 45% compared to the same period, expanded 8 new offices in Europe and Southeast Asia, successfully deployed smart warehouse management systems at 12 depots. Notably, Sagoke Express service has successfully transported over 50,000 TEU, setting a new record. The conference also announced a plan to invest $100 million in green and sustainable technology over the next 3 years.',
'Sagoke đạt nhiều thành tựu trong 6 tháng đầu năm với doanh thu tăng 45%.', 'Sagoke achieves many accomplishments in first half of year with 45% revenue growth.',
'/exhibition-event.png', 'company', false);
