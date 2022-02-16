import './App.css';
import React, {useState} from "react";
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

function App() {

  const [cnpj, setCnpj] = useState('');
  const [companyData, setCompanyData] = useState(null);

  async function handlePesquisar() {
    if(cnpj.replace(/\D/g,'').length == 14) {
      // let response = await axios.get(`https://brasilapi.com.br/api/cnpj/v1/${cnpj.replace(/\D/g,'')}`);
      let response = await axios.get(`/api/cnpj/${cnpj.replace(/\D/g,'')}`);
      setCompanyData(response);
    } else {

    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Pesquisar CNPJ</h1>
        <div className='busca'>
          <input type="text"
            onChange={event => setCnpj(event.target.value)}
            value={cnpj}></input>
          <button type='button'
            onClick={() => handlePesquisar()}
          >Pesquisar</button>
        </div>
      </header>
      <main>
        {companyData != null ? 
          <Tabs>
          <TabList>
            <Tab>Informações</Tab>
            <Tab>Atividade econômica</Tab>
            <Tab>Sócios</Tab>
          </TabList>

          <TabPanel className="tab_panel_informações">
            <div>
              <label>Nome Empresarial:</label>
              <strong>{companyData.data.razao_social}</strong>
            </div>
            <div>
              <label>Número da Inscrição:</label>
              <strong>{companyData.data.cnpj}</strong>
            </div>
            <div>
              <label>Data da Abertura:</label>
              <strong>{companyData.data.data_inicio_atividade}</strong>
            </div>
            <div>
              <label>Última Atualizazção:</label>
              <strong>{companyData.data.data_situacao_cadastral}</strong>
            </div>
            <div>
              <label>Logradouro:</label>
              <strong>{companyData.data.logradouro}</strong>
            </div>
            <div>
              <label>Número:</label>
              <strong>{companyData.data.numero}</strong>
            </div>
            <div>
              <label>CEP:</label>
              <strong>{companyData.data.cep}</strong>
            </div>
            <div>
              <label>Bairro:</label>
              <strong>{companyData.data.bairro}</strong>
            </div>
            <div>
              <label>Município:</label>
              <strong>{companyData.data.municipio}</strong>
            </div>
            <div>
              <label>UF:</label>
              <strong>{companyData.data.uf}</strong>
            </div>
            <div>
              <label>Telefone:</label>
              <strong>{companyData.data.ddd_telefone_1}</strong>
            </div>
            <div>
              <label>Capital Social:</label>
              <strong>{companyData.data.capital_social}</strong>
            </div>
            
          </TabPanel>
          <TabPanel>
            <table className='tab_table'>
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Descrição</th>
                </tr>
              </thead>
              <tbody>
              <tr>
                <td>{companyData.data.cnae_fiscal}</td>
                <td>{companyData.data.cnae_fiscal_descricao}</td>
              </tr>
              {companyData.data.cnaes_secundarios.map(cnae => {
                return (
                  <tr key={cnae.codigo}>
                    <td>{cnae.codigo}</td>
                    <td>{cnae.descricao}</td>
                  </tr>
                )
                })}
              </tbody>
            </table>
          </TabPanel>
          <TabPanel>
            <table className='tab_table'>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>CPF Representante</th>
                </tr>
              </thead>
              <tbody>
              {companyData.data.qsa.map(socio => {
                return (
                  <tr key={socio.codigo}>
                    <td>{socio.nome_socio}</td>
                    <td>{socio.cnpj_cpf_do_socio}</td>
                  </tr>
                )
                })}
              </tbody>
            </table>
          </TabPanel>
        </Tabs>
        :''}
      </main>
    </div>
  );
}

export default App;
