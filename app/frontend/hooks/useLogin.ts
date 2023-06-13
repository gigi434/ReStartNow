import axios from 'axios'

export function useLogin() {
  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('/login', { email, password })
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  return { login }
}
