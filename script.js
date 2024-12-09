async function buscarCNPJ() {
    const cnpj = document.getElementById('cnpj').value;
    const cnpjRegex = /^\d{14}$/;

    // Verifica se o CNPJ tem 14 dígitos
    if (!cnpjRegex.test(cnpj)) {
        document.getElementById('resultado').innerHTML = '<p style="color: red;">O CNPJ deve ter 14 dígitos.</p>';
        return;
    }

    try {
        const response = await fetch(`https://www.receitaws.com.br/v1/cnpj/${cnpj}`);
        const data = await response.json();

        if (data.status === 'ERROR') {
            document.getElementById('resultado').innerHTML = `<p style="color: red;">${data.message}</p>`;
            return;
        }

        // Exibindo dados da empresa
        document.getElementById('resultado').innerHTML = `
            <h2>${data.nome}</h2>
            <p><strong>Endereço:</strong> ${data.logradouro}, ${data.numero}, ${data.bairro}, ${data.municipio} - ${data.uf}</p>
            <p><strong>Telefone:</strong> ${data.telefone}</p>
            <p><strong>Atividade Principal:</strong> ${data.atividade_principal[0].text}</p>
        `;
    } catch (error) {
        document.getElementById('resultado').innerHTML = '<p style="color: red;">Erro ao buscar o CNPJ.</p>';
    }
}
