import './App.css'

import { useState, useEffect } from 'react'
import { useFetch } from './hooks/useFetch'

function App() {

  const [url, setUrl] = useState("http://localhost:3000/products")
  const [products, setProducts] = useState([])
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")

  function clearForm() {
    setName("")
    setPrice("")
  }

  //Return products list 
  const { data: items, httpConfig, loading, error } = useFetch(url)

  // handle Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault()

    const product = {
      name,
      price
    }

    httpConfig(product, "POST")
    clearForm()
  }

  const handleRemove = async (id) => {
    httpConfig(id, "DELETE")
  }

  return (
    <>
      <div>
        <h1>Cadastar Produto</h1>
      </div>

      <div className='add-product'>
        <form onSubmit={handleSubmit}>
          Produto: <input type='text' value={name} name='name' onChange={(e) => setName(e.target.value)} />
          Preço: <input type='text' value={price} name='price' onChange={(e) => setPrice(e.target.value)} />
          <input type="submit" value="Criar" />
        </form>
      </div>

      <hr></hr>

      <div>
        <h1> Lista produtos</h1>
        {loading && <p> carregando dados...</p>}
        {error && <p> {error} </p>}
        <table id="customers">
          <thead>
            <tr>
              <th>Código</th>
              <th>Produto</th>
              <th>Preço</th>
              <th>Ação</th>
            </tr>
          </thead>
          {!error && (

            items && items.map((product, indice) => (
              <tbody>
                <tr>
                  <td> {product.id}  </td>
                  <td> {product.name}  </td>
                  <td> R$ {product.price}  </td>
                  <td>
                    <button type='submit' className='submit' onClick={() => handleRemove(product.id)}> Excluir</button>
                  </td>
                </tr>
              </tbody>
            ))

          )}
        </table>
      </div>
    </>
  )
}

export default App
