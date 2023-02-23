import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { type Organization, type Profile } from './interfaces/authType'

interface State {
  token: string
  profile: Profile | null
  organization: Organization | null
  isAuth: boolean
}

interface Actions {
  setToken: (token: string) => void
  setProfile: (profile: Profile) => void
  logout: () => void
  setOrganization: (organization: Organization) => void
}

export const useAuthStore = create(persist<State & Actions>((set) => ({
  token: '',
  profile: null,
  isAuth: false,
  organization: null,
  setToken: (token: string) => { set((state) => ({ token, isAuth: true })) },
  setProfile: (profile: Profile) => { set((state) => ({ profile })) },
  logout: () => { set((state) => ({ token: '', isAuth: false, profile: null })) },
  setOrganization: (organization: Organization) => { set((state) => ({ organization })) }
}), {
  name: 'auth'
}
))
