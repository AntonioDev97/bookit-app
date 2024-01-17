import ResetPassword from '@/app/components/ResetPassword'
import React from 'react'

export const metadata = { title: 'Recover Password' };

interface Props {
    params: { token: string }
};

const ResetPasswordPage = ({ params }: Props) => {
  return (
    <div>
        <ResetPassword token={params.token} />
    </div>
  )
}

export default ResetPasswordPage