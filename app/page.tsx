"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Loader2, Stars, Moon, Sparkles, Eye, SnowflakeIcon as Crystal } from "lucide-react"
import { MysticalLoader } from "@/components/mystical-loader"

interface NumerologyResult {
  lifePathNumber: number
  personalityNumber: number
  destinyNumber: number
  analysis: string
}

export default function NumerologyWebsite() {
  const [name, setName] = useState("")
  const [birthDate, setBirthDate] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<NumerologyResult | null>(null)

  const parseMarkdownBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g)
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const boldText = part.slice(2, -2)
        return (
          <span key={index} className="font-bold text-purple-200">
            {boldText}
          </span>
        )
      }
      return part
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !birthDate) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/numerology", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, birthDate }),
      })

      if (response.ok) {
        const data = await response.json()
        setResult(data)
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="text-center py-12 px-4">
          <div className="flex items-center justify-center mb-4">
            <Eye className="w-8 h-8 mr-2 text-purple-400" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Thần Số Học
            </h1>
            <Crystal className="w-8 h-8 ml-2 text-blue-400" />
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Khám phá bí mật của số phận qua con số. Để vũ trụ tiết lộ những điều huyền bí về cuộc đời bạn.
          </p>
          <div className="flex items-center justify-center mt-4 space-x-2">
            <Stars className="w-4 h-4 text-yellow-400 animate-pulse" />
            <Moon className="w-4 h-4 text-blue-400 animate-pulse delay-300" />
            <Sparkles className="w-4 h-4 text-purple-400 animate-pulse delay-600" />
          </div>
        </header>

        <div className="container mx-auto px-4 pb-12">
          <div className="max-w-4xl mx-auto">
            {/* Input Form */}
            <Card className="bg-black/50 border-purple-500/30 backdrop-blur-sm mb-8">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-purple-300 flex items-center justify-center">
                  <Crystal className="w-6 h-6 mr-2" />
                  Nhập Thông Tin Của Bạn
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Để nhận được phân tích thần số học chính xác nhất
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-purple-300">
                      Họ và Tên
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Nhập họ và tên đầy đủ"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-gray-900/50 border-purple-500/30 text-white placeholder-gray-500 focus:border-purple-400"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="birthDate" className="text-purple-300">
                      Ngày Sinh
                    </Label>
                    <Input
                      id="birthDate"
                      type="date"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      className="bg-gray-900/50 border-purple-500/30 text-white focus:border-purple-400"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isLoading || !name || !birthDate}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Đang khám phá bí mật...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Khám Phá Thần Số Học
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {isLoading && (
              <Card className="bg-black/50 border-purple-500/30 backdrop-blur-sm mb-8">
                <CardContent>
                  <MysticalLoader />
                </CardContent>
              </Card>
            )}

            {/* Results */}
            {result && (
              <Card className="bg-black/50 border-purple-500/30 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-purple-300 flex items-center justify-center">
                    <Eye className="w-6 h-6 mr-2" />
                    Kết Quả Thần Số Học
                  </CardTitle>
                  <CardDescription className="text-gray-400">Những con số định mệnh của bạn</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Numbers Grid */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-lg border border-purple-500/30">
                      <div className="text-3xl font-bold text-purple-300 mb-2">{result.lifePathNumber}</div>
                      <div className="text-sm text-gray-300">Số Đường Đời</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-blue-900/50 to-indigo-900/50 rounded-lg border border-blue-500/30">
                      <div className="text-3xl font-bold text-blue-300 mb-2">{result.personalityNumber}</div>
                      <div className="text-sm text-gray-300">Số Nhân Cách</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-indigo-900/50 to-purple-900/50 rounded-lg border border-indigo-500/30">
                      <div className="text-3xl font-bold text-indigo-300 mb-2">{result.destinyNumber}</div>
                      <div className="text-sm text-gray-300">Số Định Mệnh</div>
                    </div>
                  </div>

                  {/* Analysis */}
                  <div className="bg-gradient-to-br from-gray-900/50 to-purple-900/30 p-6 rounded-lg border border-purple-500/20">
                    <h3 className="text-xl font-semibold text-purple-300 mb-4 flex items-center">
                      <Stars className="w-5 h-5 mr-2" />
                      Phân Tích Từ Vũ Trụ
                    </h3>
                    <div className="text-gray-300 leading-relaxed space-y-4">
                      {result.analysis.split("\n").map(
                        (paragraph, index) =>
                          paragraph.trim() && (
                            <p key={index} className="text-sm md:text-base">
                              {parseMarkdownBold(paragraph)}
                            </p>
                          ),
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center py-8 px-4 border-t border-purple-500/20">
          <p className="text-gray-400 flex items-center justify-center">
            <Moon className="w-4 h-4 mr-2" />
            Được tạo bởi sức mạnh của AI và vũ trụ
            <Sparkles className="w-4 h-4 ml-2" />
          </p>
        </footer>
      </div>
    </div>
  )
}
