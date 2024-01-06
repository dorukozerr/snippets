'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { db } from '@/db'

const editSnippet = async (id: number, code: string) => {
  await db.snippet.update({
    where: { id },
    data: { code }
  })

  revalidatePath(`/snippets/${id}`)
  redirect(`/snippets/${id}`)
}

const deleteSnippet = async (id: number) => {
  await db.snippet.delete({ where: { id } })

  revalidatePath('/')
  redirect('/')
}

const createSnippet = async (
  formState: { message: string },
  formData: FormData
) => {
  try {
    const title = formData.get('title')
    const code = formData.get('code')

    if (typeof title !== 'string' || title.length < 3) {
      return { message: 'Title must be longer' }
    }

    if (typeof code !== 'string' || code.length < 10) {
      return { message: 'Code must be longer' }
    }

    const snippet = await db.snippet.create({
      data: {
        title: title,
        code: code
      }
    })
  } catch (error) {
    console.error(error)
    if (error instanceof Error) return { message: error.message }
    return { message: 'Something went wrong' }
  }

  revalidatePath('/')
  redirect('/')
}

export { editSnippet, deleteSnippet, createSnippet }
