import { NextResponse } from 'next/server'

// Dữ liệu tin tức mẫu (trong thực tế sẽ lấy từ MongoDB)
const newsData = [
  {
    id: 1,
    title: "Tàu thương mại điện tử xuyên biên giới Trung Quốc-Châu Âu chính thức khai trương",
    content: "Tàu thương mại điện tử xuyên biên giới Trung Quốc-Châu Âu đã chính thức khai trương, và sự phát triển của logistics thương mại điện tử xuyên biên giới ngày càng sâu rộng. Đây là một bước tiến quan trọng trong việc kết nối thương mại giữa hai lục địa.",
    image: "/api/placeholder/400/200",
    date: "2024-01-15",
    category: "Tin tức"
  },
  {
    id: 2,
    title: "Tập đoàn Logistics Tân Cương trao giải Xuất sắc Logistics Toàn cầu",
    content: "Tập đoàn Logistics Tân Cương đã trao giải thưởng Xuất sắc Logistics Toàn cầu cho những đóng góp xuất sắc trong lĩnh vực logistics quốc tế.",
    image: "/api/placeholder/400/200",
    date: "2024-01-10",
    category: "Giải thưởng"
  }
]

export async function GET() {
  try {
    // Trong thực tế, đây sẽ là truy vấn MongoDB
    return NextResponse.json({
      success: true,
      data: newsData
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Lỗi khi lấy dữ liệu tin tức' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Trong thực tế, đây sẽ là thêm vào MongoDB
    const newNews = {
      id: Date.now(),
      ...body,
      date: new Date().toISOString()
    }
    
    return NextResponse.json({
      success: true,
      data: newNews
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Lỗi khi tạo tin tức mới' },
      { status: 500 }
    )
  }
}
