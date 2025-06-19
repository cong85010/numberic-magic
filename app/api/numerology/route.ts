import { google } from "@ai-sdk/google"
import { generateText } from "ai"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { name, birthDate } = await request.json()

    if (!name || !birthDate) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const { text } = await generateText({
      model: google("gemini-1.5-flash"),
      prompt: `
        Bạn là một chuyên gia thần số học huyền bí với kiến thức sâu sắc về ý nghĩa của các con số trong cuộc sống và vũ trụ.
        
        Thông tin của người tìm hiểu:
        - Tên: ${name}
        - Ngày sinh: ${birthDate}
        
        Hãy tính toán và phân tích thần số học chi tiết, huyền bí và đầy cảm hứng bằng tiếng Việt. 
        
        Đầu tiên, hãy tính toán 3 con số chính:
        1. Số Đường Đời (Life Path Number):
        2. Số Nhân Cách (Personality Number):
        3. Số Định Mệnh (Destiny Number): 
        
        Sau đó, tạo phân tích bao gồm:
        
        🔮 **Số Đường Đời [số]:**
        - Ý nghĩa tâm linh và năng lượng của con số này
        - Sứ mệnh và mục đích cuộc đời
        - Những bài học quan trọng cần học
        
        ✨ **Số Nhân Cách [số]:**
        - Cách thế giới nhìn nhận bạn
        - Tính cách bề ngoài và ấn tượng đầu tiên
        - Điểm mạnh trong giao tiếp
        
        🌟 **Số Định Mệnh [số]:**
        - Tài năng thiên bẩm và khả năng tiềm ẩn
        - Hướng phát triển sự nghiệp lý tưởng
        - Cách thực hiện ước mơ và hoài bão
        
        💫 **Tổng Hợp & Lời Khuyên:**
        - Sự kết hợp độc đáo của 3 con số này
        - Thử thách có thể gặp phải và cách vượt qua
        - Lời khuyên cho tình yêu, sự nghiệp và tâm linh
        - Những con số may mắn và thời điểm thuận lợi
        
        Viết theo phong cách tâm linh, huyền bí nhưng tích cực, đầy hy vọng và có ý nghĩa thực tế. 
        Sử dụng emoji phù hợp và tạo cảm giác như đang được một nhà tiên tri chia sẻ bí mật vũ trụ.
        Độ dài khoảng 400-500 từ.
      `,
    })

    // Parse the generated text to extract numbers and create structured response
    const lifePathMatch = text.match(/Số Đường Đời (\d+)/)
    const personalityMatch = text.match(/Số Nhân Cách (\d+)/)
    const destinyMatch = text.match(/Số Định Mệnh (\d+)/)

    const result = {
      lifePathNumber: lifePathMatch ? parseInt(lifePathMatch[1]) : 0,
      personalityNumber: personalityMatch ? parseInt(personalityMatch[1]) : 0,
      destinyNumber: destinyMatch ? parseInt(destinyMatch[1]) : 0,
      analysis: text,
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error generating numerology analysis:", error)
    return NextResponse.json(
      {
        error: "Không thể kết nối với vũ trụ lúc này. Vui lòng thử lại sau.",
      },
      { status: 500 },
    )
  }
}
