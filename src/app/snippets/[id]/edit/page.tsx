import { notFound } from 'next/navigation'
import { db } from '@/db'
import SnippetEditForm from '@/components/SnippetEditForm'

interface SnşppetEditPageProps {
  params: { id: string }
}

const SnippetEditPage = async (props: SnşppetEditPageProps) => {
  const id = parseInt(props.params.id)

  const snippet = await db.snippet.findFirst({ where: { id } })

  if (!snippet) notFound()

  return <SnippetEditForm snippet={snippet} />
}

export default SnippetEditPage
