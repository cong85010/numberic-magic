import { Loader2, Stars, Moon, Sparkles } from "lucide-react"

export function MysticalLoader() {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <div className="relative">
        <Loader2 className="w-12 h-12 text-purple-400 animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 bg-purple-500/20 rounded-full animate-pulse"></div>
        </div>
      </div>

      <div className="flex items-center space-x-2 animate-pulse">
        <Stars className="w-4 h-4 text-yellow-400" />
        <span className="text-purple-300 font-medium">Đang kết nối với vũ trụ...</span>
        <Moon className="w-4 h-4 text-blue-400" />
      </div>

      <div className="flex space-x-1">
        <Sparkles className="w-3 h-3 text-purple-400 animate-bounce" />
        <Sparkles className="w-3 h-3 text-blue-400 animate-bounce delay-100" />
        <Sparkles className="w-3 h-3 text-pink-400 animate-bounce delay-200" />
      </div>

      <p className="text-gray-400 text-sm text-center max-w-md">
        Các vì sao đang sắp xếp để tiết lộ những bí mật về số phận của bạn...
      </p>
    </div>
  )
}
