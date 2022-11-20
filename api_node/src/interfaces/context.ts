import { PrismaClient } from '../storage/prisma'

export interface JWTUser {
  address: string
  token_expiring_at: Date
}

export interface Context {
  user: JWTUser | null
  prisma: PrismaClient
}
