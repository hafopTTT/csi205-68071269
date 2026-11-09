import { useRouter } from "next/navigation"
import { Credential, logout } from "@/data/credential"
type Router = ReturnType<typeof useRouter>

export const checkLogin = (router: Router, retrunPath: string) => { 
    // back up return 
    localStorage.setItem("returnPath", retrunPath)
    // check credential
    const credentialString = localStorage.getItem('credential')
    if (credentialString !== null) {
        const { token, email, name, role }: Credential = JSON.parse(credentialString)
        if (
            token === undefined ||
            email === undefined ||
            name === undefined ||
            role === undefined
        ) {
            // fail
            router.replace("/login")
            router.refresh()
        }
        else {
            // succes
            router.replace(retrunPath)
            router.refresh()

        }
    } else {
        // fail
        router.replace("/login")
        router.refresh()
    }


}

export const doLogout = (router: Router, retrunPath: string) => {
  const credentialString = localStorage.getItem('credential')
  if (credentialString !== null) {
    const { token }: Credential = JSON.parse(credentialString)

    logout(token)
      .then(() => {})
      .catch(() => {})
      .finally(() => {
        localStorage.removeItem('credential')
        router.replace(retrunPath)
        router.refresh()
      })
  } else {
    router.replace(retrunPath)
    router.refresh()
  }
}