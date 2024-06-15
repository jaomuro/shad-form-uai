import { Link, useRouteError } from 'react-router-dom'

export function ErrorPage() {
  const error = useRouteError() as Error
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold">Whooops, algo aconteceu...</h1>
      <p className="text-accent-foreground">
        Um erro aconteceu, abaixo você encontra mais detalhes
      </p>
      <pre>{error?.message || JSON.stringify(error)}</pre>
      <p className="text-accent-foreground">
        Voltar para a página{' '}
        <Link className="text-sky-600 dark:text-sky-400" to="/">
          Home
        </Link>
      </p>
    </div>
  )
}
