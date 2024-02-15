import { useState } from 'react'
import './App.css'

interface Produto {
  estabelecimento: string;
  categoria: string;
  nomeProduto: string;
  unidadeMedida: string;
  valor: number;
  dataRegistro: string;
}

function App() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [message, setMessage] = useState<string>('')

  // Header
  const Header = () => {
    return (
      <header className='header'>
        <h1>Índice de Preços - Toledo</h1>
        <h3>Empresa Júnior Toledo</h3>
      </header>
    )
  }

  // Formulário
  const Form = () => {
    // State
    const [estabelecimento, setEstabelecimento] = useState<string>('')
    const [categoria, setCategoria] = useState<string>('')
    const [nomeProduto, setNomeProduto] = useState<string>('')
    const [unidadeMedida, setUnidadeMedida] = useState<string>('')
    const [valor, setValor] = useState<number>(0) 
    const [dataRegistro, setDataRegistro] = useState<string>('')

    const enviar = () => {
      if (estabelecimento == '' || categoria == '' || nomeProduto == '' || unidadeMedida == '' || valor == 0 || dataRegistro == '') {
        setMessage('Por favor, informe todos os campos!')
        return
      }
  
      for (let i = 0; i < produtos.length; i++) {
        if (nomeProduto == produtos[i]?.nomeProduto && estabelecimento == produtos[i]?.estabelecimento) {
          setMessage('Este produto ja foi informado!')
          return
        }
      }
  
      setProdutos([...produtos, {estabelecimento, categoria, nomeProduto, unidadeMedida, valor, dataRegistro}])
      setMessage('Produto adicionado com sucesso!')
      setEstabelecimento('')
      setCategoria('')
      setNomeProduto('')
      setUnidadeMedida('')
      setValor(0)
      setDataRegistro('')
    }

    return (
      <>
        <h3 className='title'>Adicionar Produto</h3>
        <form className="form">
          <div>
            <label htmlFor="estabelecimento">Estabelecimento</label>
            <input type="text" id="estabelecimento" name="estabelecimento" placeholder="Supermercado XPTO" value={estabelecimento} onChange={(e) => setEstabelecimento(e.target.value)}/>
          </div>

          <div>
            <label htmlFor="categoria">Categoria</label>
            <input type="text" id="categoria" name="categoria" placeholder="Bebidas" value={categoria} onChange={(e) => setCategoria(e.target.value)}/>
          </div>

          <div>
            <label htmlFor="nome-produto">Nome do Produto</label>
            <input type="text" id="nome-produto" name="nome-produto" placeholder="Agua Mineral" value={nomeProduto} onChange={(e) => setNomeProduto(e.target.value)}/>
          </div>

          <div>
            <label htmlFor="unidade-medida">Unidade de Medida</label>
            <input type="text" id="unidade-medida" name="unidade-medida" placeholder="KG" value={unidadeMedida} onChange={(e) => setUnidadeMedida(e.target.value)}/>
          </div>

          <div>
            <label htmlFor="valor">Valor</label>
            <input type="number" id="valor" name="valor" placeholder="12.29" onChange={(e) => setValor(Number(e.target.value))}/>
          </div>

          <div>
            <label htmlFor="data-registro">Data de Registro</label>
            <input type="date" id="data-registro" name="data-registro" value={dataRegistro} onChange={(e) => setDataRegistro(e.target.value)}/>
          </div>
          <button type='button' onClick={enviar}>Adicionar</button>
          <p className='message'>{message}</p>
        </form>
      </>
    )
  }

  // Tabela
  const Tabela = () => {
    const excluir = (index: number) => {
      produtos.splice(index, 1)
      setProdutos([...produtos])
    }

    const capitalize = (text: string) => {
      return text.charAt(0).toUpperCase() + text.slice(1)
    }
    
    return (
      <>
        <h3 className='title'>Produtos</h3>
        {produtos.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Estabelecimento</th>
                <th>Categoria</th>
                <th>Nome do Produto</th>
                <th>Unidade de Medida</th>
                <th>Valor</th>
                <th>Data de Registro</th>
                <th>Excluir</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((item, index) => (
                <tr key={index}>
                  <td>{capitalize(item.estabelecimento)}</td>
                  <td>{capitalize(item.categoria)}</td>
                  <td>{capitalize(item.nomeProduto)}</td>
                  <td>{capitalize(item.unidadeMedida)}</td>
                  <td>{item.valor}</td>
                  <td>{item.dataRegistro}</td>
                  <td><button onClick={() => excluir(index)}>Excluir</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {produtos.length == 0 && <p className='noProducts'>Nenhum registro encontrado</p>}
      </>
    )
  }
  
  return (
    <>
     <Header />
     <Form />
     <Tabela />
    </>
  )
}

export default App
