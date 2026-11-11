import { MemberDetailPage } from '@/features/member-directory/presentation/pages/member-detail-page'

interface MemberPageProps {
  params: Promise<{ id: string }>
}

export default async function MemberDetailRoute({ params }: MemberPageProps) {
  const { id } = await params
  return <MemberDetailPage memberId={id} />
}
