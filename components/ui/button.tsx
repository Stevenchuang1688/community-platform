"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// 年轻活力按钮系统 - Indigo + Amber
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // 主按钮：Indigo 填充 + 白字
        default: "bg-[#6366F1] text-white hover:bg-[#4F46E5] shadow-sm hover:shadow-md hover:-translate-y-0.5 focus-visible:ring-[#6366F1]",
        // 次按钮：白底 + Indigo 边框
        outline: "border-2 border-[#6366F1] bg-white text-[#6366F1] hover:bg-[#F0F0FF]",
        // 幽灵按钮
        ghost: "hover:bg-[#F0F0FF] hover:text-[#6366F1]",
        // 链接样式
        link: "text-[#6366F1] underline-offset-4 hover:underline",
        // 危险按钮
        destructive: "bg-red-500 text-white hover:bg-red-600 shadow-sm",
        // 辅助按钮：Indigo-50 底
        secondary: "bg-[#F0F0FF] text-[#6366F1] hover:bg-[#E0E0FF]",
        // CTA按钮：Amber 强调
        cta: "bg-[#F59E0B] text-[#78350F] hover:bg-[#D97706] shadow-sm hover:shadow-md hover:-translate-y-0.5 font-semibold",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 px-4 py-2 text-xs",
        lg: "h-12 px-8 py-3 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
