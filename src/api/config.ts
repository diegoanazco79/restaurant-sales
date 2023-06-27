import axios, { type AxiosError } from 'axios'
import Swal from 'sweetalert2'

const axiosConfig = axios.create()

axiosConfig.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      void Swal.fire({
        title: 'Sesión expirada',
        text: 'Tu sesión ha expirado, por favor inicia sesión nuevamente.',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      }).then(() => {
        window.location.href = '/login'
      })
    }
    return await Promise.reject(error)
  }
)

export default axiosConfig
