import { Toaster as SonnerToaster, toast } from "sonner"
import { useId } from "react"

interface ToasterProps {
  position?: "top-center" | "top-left" | "top-right" | "bottom-center" | "bottom-left" | "bottom-right"
  slotId?: string
}

function Toaster({ position = "top-center", slotId }: ToasterProps) {
  const id = useId()
  return (
    <div data-slot="toaster" data-slot-id={slotId ?? id}>
      <SonnerToaster
      position={position}
      className="vdesign-toaster"
      richColors
      expand={false}
      toastOptions={{
        classNames: {
          toast: "vdesign-toast",
          title: "vdesign-toast-title",
          description: "vdesign-toast-description",
          success: "vdesign-toast-success",
          info: "vdesign-toast-info",
          warning: "vdesign-toast-warning",
          error: "vdesign-toast-error",
        },
      }}
    />
    </div>
  )
}

// 带尺寸参数的 toast 调用方法
function createToastWithSize(size: "base" | "lg") {
  // lg 尺寸通过额外 class 标记
  const sizeClass = size === "lg" ? " vdesign-toast-lg" : ""
  const classNames = {
    toast: `vdesign-toast${sizeClass}`,
    title: "vdesign-toast-title",
    description: "vdesign-toast-description",
    success: `vdesign-toast-success${sizeClass}`,
    info: `vdesign-toast-info${sizeClass}`,
    warning: `vdesign-toast-warning${sizeClass}`,
    error: `vdesign-toast-error${sizeClass}`,
  }

  return {
    default: (message: string) =>
      toast(message, { classNames }),
    success: (message: string) =>
      toast.success(message, { classNames }),
    info: (message: string) =>
      toast.info(message, { classNames }),
    warning: (message: string) =>
      toast.warning(message, { classNames }),
    error: (message: string) =>
      toast.error(message, { classNames }),
    promise: <T,>(
      promise: Promise<T> | (() => Promise<T>),
      opts: { loading: string; success: string | ((data: T) => string); error: string }
    ) =>
      toast.promise(promise, { ...opts, classNames }),
  }
}

export { Toaster, toast, createToastWithSize }
export type { ToasterProps }