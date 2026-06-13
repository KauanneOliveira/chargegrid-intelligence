# ChargeGrid Intelligence

Prova de conceito de um sistema inteligente de gerenciamento e tarifação de recargas para veículos elétricos, desenvolvido em parceria com a **GoodWe** usando o carregador da FIAP como piloto.

## O Problema

Estações de recarga para veículos elétricos (EVs) enfrentam desafios que vão além da infraestrutura física:

- Sobrecargas na rede elétrica em horários de pico
- Falta de padronização entre equipamentos de diferentes fabricantes
- Ausência de sistemas de cobrança integrados e transparentes
- Desperdício de energia solar gerada localmente
- Experiência de uso ruim para o motorista

## A Solução

O projeto propõe um ecossistema composto por cinco módulos:

| Módulo | Função |
|---|---|
| **SEMS+** | Monitora o consumo total e reduz automaticamente a potência dos carregadores para evitar sobrecarga |
| **Middleware OCPP** | Garante comunicação entre carregadores de diferentes fabricantes e versões do protocolo |
| **Billing** | Sistema de tarifação dinâmica por kWh, com prioridade para energia solar e cobrança integrada |
| **App do usuário** | Interface para localizar estações, iniciar sessão via QR Code e acompanhar a recarga |
| **Gestão de energia** | Prioriza solar → rede fora do pico → rede no pico, seguindo as bandeiras tarifárias da ANEEL |

## Prova de Conceito — Módulo Billing

Esta entrega demonstra o funcionamento do módulo de **Billing**: tarifação dinâmica de sessões de recarga com base na fonte de energia utilizada.

### Fluxo do sistema

```
Usuário seleciona a fonte de energia
  ├── Solar        → R$ 0,45/kWh
  ├── Fora do pico → R$ 0,75/kWh
  └── Horário pico → R$ 1,20/kWh
          │
          ▼
Sessão iniciada — cálculo em tempo real
  ├── kWh = Potência (7,4 kW) × Tempo (h)
  ├── Custo = kWh × Tarifa selecionada
  └── Bateria sobe proporcionalmente
          │
          ▼
Sessão encerrada — recibo gerado
  ├── Consumo total e custo final
  ├── Comparativo entre as 3 tarifas
  ├── Economia vs horário de pico
  └── CO₂ evitado vs veículo a gasolina
```

### Tarifas

```
Solar        → R$ 0,45/kWh  (prioridade 1)
Fora do pico → R$ 0,75/kWh  (00h–17h e 21h–23h59)
Horário pico → R$ 1,20/kWh  (17h–21h, bandeira vermelha ANEEL)
```

### Cálculo de CO₂ evitado

```
CO₂ evitado = kWh consumidos × 0,2 kg/kWh
```

## Energias Renováveis e Sustentabilidade

- **Prioridade solar:** quando há geração fotovoltaica local, o sistema a utiliza primeiro, reduzindo a dependência da rede
- **Tarifação por horário:** incentiva o carregamento fora dos momentos de alta demanda na rede
- **Transparência ambiental:** o recibo exibe o CO₂ evitado em cada sessão
- **Comparativo de tarifas:** o usuário visualiza quanto economizou ao escolher energia limpa

## Como rodar

Não requer instalação. Há duas formas de executar:

**1. Baixando os arquivos**
Baixe os três arquivos (`index.html`, `style.css`, `script.js`) na mesma pasta e abra o `index.html` no navegador.

**2. Clonando o repositório**
```bash
git clone https://github.com/seu-usuario/chargegrid-intelligence
cd chargegrid-intelligence
# abrir index.html no navegador
```

## Estrutura do projeto

```
chargegrid-intelligence/
├── index.html    → estrutura da interface
├── style.css     → estilos e tema visual
└── script.js     → lógica de tarifação e simulação
```

## Tecnologias

- HTML5, CSS3 e JavaScript puro (sem dependências)
- Simulação em tempo real via `setInterval`
- Tarifação baseada nas bandeiras da ANEEL e protocolo OCPP

## Vídeo de demonstração
[Assistir demonstração no YouTube](https://youtu.be/hVSawXmt-7c)
> Configurado como "Não listado" no YouTube.
