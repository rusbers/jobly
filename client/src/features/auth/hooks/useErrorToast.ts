import { useToast } from "@/components/ui/use-toast"
import { ERROR_DURATION } from "../constants/constants"

type toasterArgs = {
  title: string
  description?: string
  duration?: number
}

export function useErrorToast() {
  const { toast } = useToast()

  return ({ title, description = "Please try again!", duration = ERROR_DURATION }: toasterArgs) =>
    toast({
      title,
      description,
      variant: "destructive",
      duration: duration,
    })
}
