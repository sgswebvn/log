import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { departure, destination } = await request.json()
    
    // Giả lập tìm kiếm (trong thực tế sẽ truy vấn MongoDB)
    const searchResults = [
      {
        id: 1,
        route: `${departure} - ${destination}`,
        duration: "15-20 ngày",
        price: "Liên hệ",
        service: "Đường sắt",
        description: `Tuyến vận chuyển từ ${departure} đến ${destination} bằng đường sắt`
      },
      {
        id: 2,
        route: `${departure} - ${destination}`,
        duration: "25-30 ngày",
        price: "Liên hệ", 
        service: "Đường biển",
        description: `Tuyến vận chuyển từ ${departure} đến ${destination} bằng đường biển`
      }
    ]
    
    return NextResponse.json({
      success: true,
      data: searchResults
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Lỗi khi tìm kiếm' },
      { status: 500 }
    )
  }
}
