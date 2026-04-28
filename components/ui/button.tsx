"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// 统一按钮样式：莫兰迪深绿主色 + 圆角14px
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // 主按钮：主色填充 + 白字
        default: "bg-[#2C4A46] text-white hover:bg-[#1f3633] shadow-sm hover:shadow-md hover:-translate-y-0.5",
        // 次按钮：白底 + 主色边框
        outline: "border-2 border-[#2C4A46] bg-white text-[#2C4A46] hover:bg-[#F5F1E9]",
        // 幽灵按钮
        ghost: "hover:bg-[#F5F1E9] hover:text-[#2C4A46]",
        // 链接样式
        link: "text-[#2C4A46] underline-offset-4 hover:underline",
        // 危险按钮
        destructive: "bg-red-600 text-white hover:bg-red-700",
        // 辅助按钮：暖米黄背景
        secondary: "bg-[#F5F1E9] text-[#2C4A46] hover:bg-[#ebe6dc]",
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
