import { useProtectedPage } from "../hooks/useProtectedPage"
import useRequestData from "../hooks/useRequestData"

function FeedPage() {
  useProtectedPage()

  const tokenLogado = localStorage.getItem('token')

  const config = {
    headers:{
      Authorization: tokenLogado
    }
  }

  const [feed] = useRequestData([], '/feed', config)
  return (
    <main>
      <h1>Página de Feed</h1>
    </main>
  );
}

export default FeedPage;