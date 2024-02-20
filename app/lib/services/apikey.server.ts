import { z } from 'zod'
import { requireAuthedUser } from './auth.server'
import { invariant } from '../utils/misc'
import { User } from 'types/user'

export const ApiKeyResponseSchema = z.object({
  id: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  last_login: z.string(),
  api_key: z.string().optional(),
  wallet: z.string(),
  role: z.enum(['User', 'Admin']), // Assuming 'User' and 'Admin' are the only roles
})

export type ApiKeyResponse = z.infer<typeof ApiKeyResponseSchema>

export async function getUserApiKey(request: Request): Promise<ApiKeyResponse> {
  const user = await requireAuthedUser(request)
  invariant(user, 'User not found')

  const userApiKeyResponse = await fetch(
    `${process.env.API_URL}/users/apikey`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${(user as User).token}`,
      },
    },
  )

  if (!userApiKeyResponse.ok) {
    throw new Error(`Error retrieving user API key.`)
  }

  const resp = await userApiKeyResponse.json()
  let parsedResponse: ApiKeyResponse
  try {
    parsedResponse = ApiKeyResponseSchema.parse(resp) // This ensures the response fits the schema and types
  } catch (error) {
    console.error('Failed to parse response:', error)
    throw new Error('Failed to parse the API key response.')
  }

  return parsedResponse
}
