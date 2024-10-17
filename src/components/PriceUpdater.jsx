import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const csvData = `Sku;Articulo;Precio 2024-09-03;Precio 2024-09-02;Upc;;;
176172;Jugo Watts Tutikiwi 1.5L;1690;;7801620002343;;;
144893;Coca Cola Light 591cc;1490;1590;7801610000595;;;
183621;Termo Iguazu Verde;27990;;17798385662608;;;
145319;Bilz Zero Pet 500 cc;1390;1450;7801620004965;;;
143726;Galletas Mini Selz Cracker 35g;450;;7802225689021;;;
183622;Manta Roll Up Negro/Blanco;13990;;17798385661304;;;
177673;Pepsi  600 cc;1390;1450;7801620009373;;;
180430;Bilz Pet 600cc;1390;1450;7801620009502;;;
146996;Agua Cachantun 1L;1890;2190;7801620005412;;;
179350;Chicle Mentos Botella Up2U60g;2990;;75072582;;;
138780;Galletas Gran Cereal Muesli 135g;990;;7802215302060;;;
177674;Pepsi Zero 600 cc;1390;1450;7801620009342;;;
131786;Jugo Nectar Andina Durazno 1L;1490;;7802820500097;;;
144892;Coca Cola Sin Azucar 591cc;1490;1590;7801610000601;;;
183619;Botella Atuel Blanco;12990;;17798385669447;;;
178808;Fanta Pomelo Sin Azucar 591cc;1490;1390;7801610285817;;;
176534;Gatolate 30g;600;;7802000009969;;;
148244;Fanta Sin Azucar 591cc;1490;1590;7801610059173;;;
180427;Kem Zero Pet 600cc;1390;1450;7801620009410;;;
183615;Mug Chalten Verde;6990;;17798385664183;;;
148245;Sprite Zero 591cc;1490;1590;7801610591864;;;
170232;Gomitas Calyptus Mentol 25Gr;350;;7802200139664;;;
180421;Kem Pet 600cc;1390;1450;7801620009441;;;
177675;Kem Xtreme 600 cc;1390;1450;7801620009434;;;
147022;Fanta 591cc;1490;1590;7801610591161;;;
183617;Mug Road Blanco/Negro;7990;;17798127207548;;;
180831;Mentitas Masti Crunch 13g;450;;7750885017725;;;
170320;Galletas Tuareg 48g;650;;78030299;;;
177676;Kem Xtreme Sugar Free 600 cc;1390;1450;7801620009427;;;
145320;Pap Zero PET 500 cc;1390;1450;7801620004927;;;
183618;Mug Road Plata/Negro;7990;;17798127207555;;;
183616;Mug Retro Blanco;6990;;17798127209733;;;
147023;Sprite Pet 591;1490;1590;7801610591925;;;
144873;Coca Cola 591cc;1490;1590;7801610000571;;;
145616;Agua Vital Sin Gas 990ml;1850;2040;7802820990102;;;
183620;Botella Atuel Negro;12990;;17798385669430;;;
180424;Pap Pet 600cc;1390;1450;7801620009380;;;`;

const PriceUpdater = () => {
  const location = useLocation();
  const { store } = location.state || {};
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState(null);

  const handleUpdatePrices = () => {
    setIsLoading(true);
    setTimeout(() => {
      try {
        const lines = csvData.split('\n');
        const headers = lines[0].split(';');
        const priceIndex = headers.indexOf('Precio 2024-09-03');
        const articleIndex = headers.indexOf('Articulo');
        const oldPriceIndex = headers.indexOf('Precio 2024-09-02');

        const prices = lines.slice(1).map(line => {
          const values = line.split(';');
          return {
            product: values[articleIndex],
            price: parseFloat(values[priceIndex]),
            oldPrice: parseFloat(values[oldPriceIndex]),
          };
        }).filter(item => !isNaN(item.price));

        const totalUpdated = prices.length;
        const increases = prices.filter(item => item.price > item.oldPrice).length;
        const decreases = prices.filter(item => item.price < item.oldPrice).length;
        const newProducts = prices.filter(item => !item.oldPrice).length;

        setSummary({
          totalUpdated,
          increases,
          decreases,
          newProducts, // Añadimos la cantidad de productos nuevos
          detailedChanges: prices,
        });
      } catch (error) {
        console.error('Error processing CSV data:', error);
      } finally {
        setIsLoading(false);
      }
    }, 2000); // Simulate loading for 2 seconds
  };

  const handleDownloadSummary = () => {
    const detailedSummary = summary.detailedChanges
      .map(change => {
        const priceChange = change.oldPrice ? (change.price - change.oldPrice).toFixed(2) : 'Producto nuevo';
        return `${change.product}: $${change.price.toFixed(2)} (Cambio: ${priceChange})`;
      })
      .join('\n');

    const fullSummary = `
Resumen de actualización de precios para ${store}

Total de productos actualizados: ${summary.totalUpdated}
Aumentos de precio: ${summary.increases}
Disminuciones de precio: ${summary.decreases}
Productos nuevos: ${summary.newProducts}

Precios detallados:
${detailedSummary}
    `;

    const blob = new Blob([fullSummary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resumen_precios_${store.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const containerStyle = {
    maxWidth: '900px',
    margin: '20px auto',
    padding: '2rem',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    fontFamily: 'Arial, sans-serif',
    
  };

  const summaryContainerStyle = {
    marginTop: '2rem',
    padding: '1.5rem',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
  };

  const tableStyle = {
    width: '100%',
    marginTop: '1.5rem',
    borderCollapse: 'collapse',
  };

  const thStyle = {
    borderBottom: '2px solid #ddd',
    padding: '10px',
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold',
    textAlign: 'left', // Alineación izquierda para los encabezados
    fontFamily: 'Flamante Roma, sans-serif'
  };

  const tdStyle = {
    borderBottom: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left', // Alineación izquierda para las celdas
  };

  const buttonStyle = {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '1rem',
    transition: 'background-color 0.3s',
    fontFamily: 'Flamante Roma, sans-serif'

  };

  const downloadButtonStyle = {
    ...buttonStyle,
    backgroundColor: 'darkred',
    justifyContent: 'center',
  };

  const imageContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1rem',
  };

  const spinnerStyle = {
    width: '16px',
    height: '16px',
    border: '3px solid rgba(255, 255, 255, 0.6)',
    borderTopColor: 'white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    display: 'inline-block',
    marginRight: '10px',
    fontFamily: 'Flamante Roma, sans-serif'

  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1rem',
    fontFamily: 'Flamante Roma, sans-serif'

  };

  return (
    <div style={containerStyle}>
      <h2>Actualización de Precios desde Sckuba para {store}</h2>
      <div style={imageContainerStyle}>
        <img
          src="https://play-lh.googleusercontent.com/QzJM-JULtutSqefQu5TNr_HEG7zvZJbRfe61ZqdmpVzNRCfE2B0nRWvNgcH7eAiMrP0"
          alt="Sckuba Logo"
          style={{ width: '100px' }}
        />
      </div>
      {!summary && (
        <div style={buttonContainerStyle}>
          <button onClick={handleUpdatePrices} style={buttonStyle} disabled={isLoading}>
            {isLoading && <span style={spinnerStyle}></span>}
            {isLoading ? 'Actualizando...' : 'Actualizar Precios'}
          </button>
        </div>
      )}
      {summary && (
        <div style={summaryContainerStyle}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Resumen de actualización a 15/10/2024</h3>
          <p>Total de productos actualizados: {summary.totalUpdated}</p>
          <p>Aumentos de precio: {summary.increases}</p>
          <p>Disminuciones de precio: {summary.decreases}</p>
          <p>Productos nuevos: {summary.newProducts}</p>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Producto</th>
                <th style={thStyle}>Precio Actualizado</th>
                <th style={thStyle}>Cambio</th>
              </tr>
            </thead>
            <tbody>
              {summary.detailedChanges.map((item, index) => {
                const priceChange = item.oldPrice
                  ? `${(item.price - item.oldPrice).toFixed(2)}`
                  : 'Producto nuevo';
                return (
                  <tr key={index}>
                    <td style={tdStyle}>{item.product}</td>
                    <td style={tdStyle}>${item.price.toFixed(2)}</td>
                    <td style={tdStyle}>{priceChange}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button onClick={handleDownloadSummary} style={downloadButtonStyle}>
            Descargar resumen detallado
          </button>
        </div>
      )}
    </div>
  );
};

export default PriceUpdater;