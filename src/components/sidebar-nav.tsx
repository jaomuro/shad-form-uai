import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Link, useLocation } from 'react-router-dom'

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    to: string
    title: string
  }[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const { pathname } = useLocation()

  return (
    <nav className={cn('flex lg:flex-col lg:space-x-0', className)} {...props}>
      {items.map((item) => (
        <Link
          data-current={pathname === item.to}
          key={item.to}
          to={item.to}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'justify-start hover:bg-transparent  data-[current=false]:hover:underline data-[current=true]:bg-muted data-[current=true]:hover:bg-muted',
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
