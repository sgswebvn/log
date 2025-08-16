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

-- Drop existing policies
DROP POLICY IF EXISTS "Allow public read categories" ON news_categories;
DROP POLICY IF EXISTS "Allow authenticated all on categories" ON news_categories;
DROP POLICY IF EXISTS "Allow public read published news" ON news;
DROP POLICY IF EXISTS "Allow authenticated all on news" ON news;
DROP POLICY IF EXISTS "Allow public insert contacts" ON contacts;
DROP POLICY IF EXISTS "Allow authenticated all on contacts" ON contacts;

-- Policies for news_categories - Allow all operations for everyone
CREATE POLICY "Allow all operations on categories" ON news_categories
  FOR ALL TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Policies for news - Allow all operations for everyone
CREATE POLICY "Allow all operations on news" ON news
  FOR ALL TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Policies for contacts - Allow all operations for everyone
CREATE POLICY "Allow all operations on contacts" ON contacts
  FOR ALL TO anon, authenticated
  USING (true)
  WITH CHECK (true);

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
'/china-europe-freight.png', 3, true, false, 'global-transport-connectivity-forum-2025');
