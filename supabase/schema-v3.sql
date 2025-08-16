-- Drop existing tables if they exist
DROP TABLE IF EXISTS news CASCADE;
DROP TABLE IF EXISTS news_categories CASCADE;
DROP TABLE IF EXISTS contacts CASCADE;

-- Create news categories table (simplified)
CREATE TABLE news_categories (
  id BIGSERIAL PRIMARY KEY,
  name_vi TEXT NOT NULL,
  name_en TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description_vi TEXT,
  description_en TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create news table with category relationship
CREATE TABLE news (
  id BIGSERIAL PRIMARY KEY,
  title_vi TEXT NOT NULL,
  title_en TEXT NOT NULL,
  content_vi TEXT NOT NULL,
  content_en TEXT NOT NULL,
  excerpt_vi TEXT,
  excerpt_en TEXT,
  image_url TEXT,
  category_id BIGINT REFERENCES news_categories(id) ON DELETE SET NULL,
  author TEXT DEFAULT 'Sagoke Admin',
  slug TEXT UNIQUE,
  published BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE
);

-- Create contacts table
CREATE TABLE contacts (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  service TEXT,
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'processing', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE news_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Policies for news_categories
CREATE POLICY "Allow public read categories" ON news_categories
  FOR SELECT TO anon, authenticated
  USING (active = true);

CREATE POLICY "Allow authenticated all on categories" ON news_categories
  FOR ALL TO authenticated
  USING (true);

-- Policies for news
CREATE POLICY "Allow public read published news" ON news
  FOR SELECT TO anon, authenticated
  USING (published = true);

CREATE POLICY "Allow authenticated all on news" ON news
  FOR ALL TO authenticated
  USING (true);

-- Policies for contacts
CREATE POLICY "Allow public insert contacts" ON contacts
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated all on contacts" ON contacts
  FOR ALL TO authenticated
  USING (true);

-- Insert default categories
INSERT INTO news_categories (name_vi, name_en, slug, description_vi, description_en) VALUES
('Tin công ty', 'Company News', 'company', 'Tin tức về hoạt động và phát triển của công ty', 'News about company activities and development'),
('Khuyến mại', 'Promotions', 'promotions', 'Các chương trình khuyến mại và ưu đãi', 'Promotional programs and special offers'),
('Triển lãm', 'Exhibitions', 'exhibitions', 'Tham gia các triển lãm và sự kiện ngành', 'Participation in industry exhibitions and events'),
('Truyền thông', 'Media', 'media', 'Tin tức truyền thông và báo chí', 'Media and press news'),
('Dữ liệu ngành', 'Industry Data', 'industry', 'Thống kê và phân tích dữ liệu ngành logistics', 'Logistics industry statistics and analysis');

-- Insert sample news with categories
INSERT INTO news (title_vi, title_en, content_vi, content_en, excerpt_vi, excerpt_en, image_url, category_id, published, featured, slug) VALUES
('Tàu thương mại điện tử xuyên biên giới Trung Quốc-Châu Âu chính thức khai trương', 'China-Europe Cross-border E-commerce Train Officially Launched', 
'Tàu thương mại điện tử xuyên biên giới Trung Quốc-Châu Âu đã chính thức khai trương, đánh dấu bước tiến quan trọng trong việc phát triển logistics thương mại điện tử xuyên biên giới. Sagoke tự hào là đối tác chiến lược trong dự án này, cung cấp dịch vụ logistics toàn diện từ kho bãi, đóng gói đến vận chuyển và thông quan. Tuyến đường sắt này kết nối trực tiếp các trung tâm thương mại điện tử lớn của Trung Quốc với thị trường châu Âu, rút ngắn thời gian vận chuyển xuống còn 15-18 ngày so với 35-40 ngày bằng đường biển. Với tần suất 3 chuyến/tuần, tuyến này có thể xử lý hàng nghìn container mỗi tháng, đáp ứng nhu cầu ngày càng tăng của thương mại điện tử xuyên biên giới.',
'The China-Europe cross-border e-commerce train has officially launched, marking an important step in developing cross-border e-commerce logistics. Sagoke is proud to be a strategic partner in this project, providing comprehensive logistics services from warehousing, packaging to transportation and customs clearance. This railway route directly connects major e-commerce centers in China with European markets, reducing shipping time to 15-18 days compared to 35-40 days by sea. With a frequency of 3 trips per week, this route can handle thousands of containers per month, meeting the growing demand for cross-border e-commerce.',
'Sagoke đẩy mạnh dịch vụ logistics thương mại điện tử xuyên biên giới với tuyến tàu mới.', 'Sagoke enhances cross-border e-commerce logistics with new train route.',
'/cross-border-train-event.png', 1, true, true, 'china-europe-ecommerce-train-launch'),

('Diễn đàn Kết nối Vận tải Toàn cầu 2025', 'Global Transport Connectivity Forum 2025',
'Sagoke đã tham gia Diễn đàn Kết nối Vận tải Toàn cầu 2025 tại Singapore, nơi quy tụ hơn 500 chuyên gia logistics hàng đầu thế giới. Tại diễn đàn, CEO Sagoke đã trình bày về "Tương lai của Logistics Á-Âu trong kỷ nguyên số", chia sẻ những thành tựu và kế hoạch phát triển của công ty. Sagoke cũng ký kết thỏa thuận hợp tác với 5 đối tác quốc tế mới, mở rộng mạng lưới dịch vụ đến 15 quốc gia mới. Diễn đàn cũng là cơ hội để Sagoke giới thiệu nền tảng tracking AI mới, cho phép khách hàng theo dõi hàng hóa real-time với độ chính xác 99.9%.',
'Sagoke participated in the Global Transport Connectivity Forum 2025 in Singapore, which brought together over 500 leading logistics experts worldwide. At the forum, Sagoke CEO presented on "The Future of Asia-Europe Logistics in the Digital Era", sharing the company achievements and development plans. Sagoke also signed cooperation agreements with 5 new international partners, expanding the service network to 15 new countries. The forum was also an opportunity for Sagoke to introduce the new AI tracking platform, allowing customers to track goods in real-time with 99.9% accuracy.',
'Sagoke tham gia diễn đàn toàn cầu và ký kết hợp tác mở rộng mạng lưới.', 'Sagoke joins global forum and signs partnerships to expand network.',
'/china-europe-freight.png', 3, true, false, 'global-transport-connectivity-forum-2025'),

('Hội nghị Tổng kết Giữa năm 2025', 'Mid-Year Review Conference 2025',
'Sagoke tổ chức Hội nghị Tổng kết Giữa năm 2025 với sự tham gia của toàn thể nhân viên và đối tác chiến lược. Trong 6 tháng đầu năm, Sagoke đã đạt được nhiều thành tựu đáng kể: doanh thu tăng 45% so với cùng kỳ, mở rộng 8 văn phòng mới tại châu Âu và Đông Nam Á, triển khai thành công hệ thống quản lý kho thông minh tại 12 depot. Đặc biệt, dịch vụ Sagoke Express đã vận chuyển thành công hơn 50,000 TEU, thiết lập kỷ lục mới. Hội nghị cũng công bố kế hoạch đầu tư 100 triệu USD vào công nghệ xanh và bền vững trong 3 năm tới.',
'Sagoke organized the Mid-Year Review Conference 2025 with the participation of all employees and strategic partners. In the first 6 months of the year, Sagoke achieved many remarkable achievements: revenue increased 45% compared to the same period, expanded 8 new offices in Europe and Southeast Asia, successfully deployed smart warehouse management systems at 12 depots. Notably, Sagoke Express service has successfully transported over 50,000 TEU, setting a new record. The conference also announced a plan to invest $100 million in green and sustainable technology over the next 3 years.',
'Sagoke đạt nhiều thành tựu trong 6 tháng đầu năm với doanh thu tăng 45%.', 'Sagoke achieves many accomplishments in first half of year with 45% revenue growth.',
'/exhibition-event.png', 1, true, false, 'mid-year-review-conference-2025'),

('Chương trình khuyến mại mùa hè 2025', 'Summer 2025 Promotion Program',
'Sagoke triển khai chương trình khuyến mại mùa hè 2025 với nhiều ưu đãi hấp dẫn dành cho khách hàng. Chương trình bao gồm giảm giá 20% cho dịch vụ vận chuyển đường sắt Trung-Âu, miễn phí kho bãi 30 ngày đầu, và tặng bảo hiểm hàng hóa trị giá lên đến 100,000 USD. Đặc biệt, khách hàng mới sẽ được tư vấn miễn phí về tối ưu hóa chuỗi cung ứng và hỗ trợ thủ tục thông quan. Chương trình có hiệu lực từ ngày 1/6 đến 31/8/2025.',
'Sagoke launches Summer 2025 promotion program with attractive offers for customers. The program includes 20% discount on China-Europe rail transport services, free 30-day warehousing, and complimentary cargo insurance up to $100,000. New customers will receive free supply chain optimization consultation and customs clearance support. The program is valid from June 1 to August 31, 2025.',
'Ưu đãi hấp dẫn mùa hè với giảm giá 20% và nhiều dịch vụ miễn phí.', 'Attractive summer offers with 20% discount and free services.',
'/placeholder.svg?height=400&width=600', 2, true, false, 'summer-2025-promotion'),

('Báo cáo thị trường logistics Q2/2025', 'Logistics Market Report Q2/2025',
'Theo báo cáo mới nhất của Sagoke Research, thị trường logistics Á-Âu trong quý 2/2025 đã có những biến động tích cực. Tổng khối lượng hàng hóa vận chuyển tăng 18% so với cùng kỳ năm trước, trong đó vận tải đường sắt chiếm 35% thị phần. Chi phí vận chuyển trung bình giảm 8% nhờ việc tối ưu hóa tuyến đường và công nghệ. Dự báo quý 3 và 4 sẽ tiếp tục tăng trưởng mạnh với sự phục hồi của thương mại quốc tế.',
'According to the latest report by Sagoke Research, the Asia-Europe logistics market in Q2/2025 showed positive developments. Total cargo volume increased 18% compared to the same period last year, with rail transport accounting for 35% market share. Average shipping costs decreased 8% thanks to route optimization and technology. Q3 and Q4 are forecast to continue strong growth with international trade recovery.',
'Thị trường logistics Á-Âu tăng trưởng 18% trong quý 2/2025.', 'Asia-Europe logistics market grows 18% in Q2/2025.',
'/placeholder.svg?height=400&width=600', 5, true, false, 'logistics-market-report-q2-2025'),

('Khai trương văn phòng mới tại Berlin', 'New Berlin Office Opening',
'Sagoke chính thức khai trương văn phòng mới tại Berlin, Đức, đánh dấu bước mở rộng quan trọng tại thị trường châu Âu. Văn phòng Berlin sẽ phục vụ như trung tâm điều phối cho khu vực Đức, Áo và các nước Đông Âu. Với đội ngũ 25 chuyên gia logistics địa phương, văn phòng sẽ cung cấp dịch vụ tư vấn, thông quan và hỗ trợ khách hàng 24/7. Đây là văn phòng thứ 12 của Sagoke tại châu Âu.',
'Sagoke officially opens new office in Berlin, Germany, marking an important expansion in the European market. The Berlin office will serve as a coordination center for Germany, Austria and Eastern European countries. With a team of 25 local logistics experts, the office will provide consulting, customs clearance and 24/7 customer support services. This is Sagoke 12th office in Europe.',
'Mở rộng mạng lưới với văn phòng mới tại Berlin, Đức.', 'Network expansion with new office in Berlin, Germany.',
'/placeholder.svg?height=400&width=600', 1, true, false, 'berlin-office-opening');
