'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface userProps {
    login: string,
    password: string
}

async function get() {
    const user = await prisma.user.findMany()
    return user
}

async function create(values: userProps) {
  const user = await prisma.user.create({
      data: {
        login: values.login,
        password: values.password,
      },
    })

  return user
}


export const createUser = (values: userProps) => {
  const user = create(values)
  .then(async (user) => {
    await prisma.$disconnect()
    return user
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })  
  
  return user
}


export const getUser = () => {
    const user = get()
    .then(async (user) => {
      await prisma.$disconnect()
      return user
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })  
    
    return user
}
