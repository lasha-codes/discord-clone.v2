import { PrismaClient } from '@prisma/client'

let prisma = new PrismaClient()

// await prisma.member.deleteMany()

if (!global.prisma) {
  global.prisma = new PrismaClient()

  prisma = global.prisma
}

export default prisma
