import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { type Rol, type Organization, type Profile, type Subsidiary } from './interfaces/authType'

interface State {
  token: string
  profile: Profile | null
  organization: Organization | null
  subsidiary: Subsidiary | null
  roles: Rol[] | null
  isAuth: boolean
}

interface Actions {
  setToken: (token: string) => void
  setProfile: (profile: Profile) => void
  logout: () => void
  setOrganization: (organization: Organization) => void
  setRoles: (roles: Rol[]) => void
  setSubsidiary: (subsidiary: Subsidiary) => void
}

export const useAuthStore = create(persist<State & Actions>((set) => ({
  token: '',
  profile: null,
  isAuth: false,
  organization: null,
  roles: null,
  subsidiary: null,
  setToken: (token: string) => { set((state) => ({ token, isAuth: true })) },
  setProfile: (profile: Profile) => { set((state) => ({ profile })) },
  logout: () => { set((state) => ({ token: '', isAuth: false, profile: null, roles: null })) },
  setOrganization: (organization: Organization) => { set((state) => ({ organization })) },
  setRoles: (roles: Rol[]) => { set((state) => ({ roles })) },
  setSubsidiary: (subsidiary: Subsidiary) => { set((state) => ({ subsidiary })) }
}), {
  name: 'auth'
}
))
