import { SidebarNav } from '@/components/sidebar-nav'
import { Separator } from '@/components/ui/separator'

import { Outlet } from 'react-router-dom'

const sidebarNavItems = [
  // {
  //   title: 'Simple Form',
  //   to: '/simple-form',
  // },
  {
    title: 'Array Field Form',
    to: '/array-field-form',
  },
  // {
  //   title: 'Dinamic Field Form',
  //   to: '/dinamic-field-form',
  // },
  // {
  //   title: 'Nested Field Form',
  //   to: '/nested-field-form',
  // },
  // {
  //   title: 'File Field Form',
  //   to: '/file-field-form',
  // },
]

export function AppLayout() {
  return (
    <div className="space-y-6 p-10 pb-16 h-full min-h-screen">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Forms</h2>
        <p className="text-muted-foreground">
          Escolha um exemplo de form para testar
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 ">
        <aside className="-mx-6 lg:w-1/6 flex">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex items-center justify-center w-full h-[500px]">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
