import { SidebarNav } from '@/components/sidebar-nav'
import { Separator } from '@/components/ui/separator'
import { Table2 } from 'lucide-react'

import { Link, Outlet } from 'react-router-dom'

const sidebarNavItems = [
  {
    title: 'Simple form',
    to: '/simple-form',
  },
  {
    title: 'Array field form',
    to: '/array-field-form',
  },
  {
    title: 'Form with file input',
    to: '/form-file-input',
  },
]

export function AppLayout() {
  return (
    <div className="min-h-screen grid w-full grid-cols-7">
      <aside>
        <div className="sticky top-0 flex flex-col gap-2 p-4">
          <Link to="#" className="flex items-center gap-2">
            <Table2 className="h-6 w-6" />
            <span className="text-lg font-semibold">Shad Forms uai</span>
          </Link>
          <Separator className="my-3" />
          <SidebarNav items={sidebarNavItems} />
        </div>
      </aside>

      <main className="overflow-auto col-start-2 px-4 pt-12 col-span-6">
        <Outlet />
      </main>
    </div>
  )
}
