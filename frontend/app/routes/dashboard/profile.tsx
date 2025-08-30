import { useAuth } from '@/provider/auth-context';
import React from 'react'

const profile = () => {
  const {isAuthenticated, user } = useAuth();

  return (
    <div>profile</div>
  )
}

export default profile