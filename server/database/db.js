import { PrismaClient } from '@prisma/client'

let prisma = new PrismaClient()

// await prisma.member.deleteMany()
// await prisma.token.deleteMany()

const members = await prisma.member.findMany()
console.log(members)

if (!global.prisma) {
  global.prisma = new PrismaClient()

  prisma = global.prisma
}

export default prisma
