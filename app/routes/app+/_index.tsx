import { requireAuthedUser } from '@/lib/services/auth.server'

import { User } from 'types/user'

import { LoaderFunctionArgs, json } from '@remix-run/node'
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from '@remix-run/react'
import Header from '@/components/header'
import GetStarted from '@/components/get-started'
import { Card } from '@/components/ui/card'
import { ApiKeyResponse, getUserApiKey } from '@/lib/services/apikey.server'

export async function loader({ request }: LoaderFunctionArgs) {
  const user = (await requireAuthedUser(request)) as User
  const userApiKeyResponse = (await getUserApiKey(request)) as ApiKeyResponse
  return json({
    userApiKeyResponse,
    user,
  })
}

export default function AppIndex() {
  const { user, userApiKeyResponse } = useLoaderData<typeof loader>()
  console.log(userApiKeyResponse)
  return (
    <main className="flex min-h-screen flex-col items-center gap-y-12 p-8">
      <Header user={user} />
      <div className="mt-32 flex h-full w-full flex-col items-center gap-8">
        <Card className="flex w-[92vw] max-w-[728px] flex-col items-center gap-8 p-16 text-center"></Card>
        <div />
        <GetStarted />
      </div>
    </main>
  )
}

export function ErrorBoundary() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    )
  } else if (error instanceof Error) {
    return (
      <div>
        <p>{error.message}</p>
      </div>
    )
  } else {
    return <h1>Unknown Error</h1>
  }
}
