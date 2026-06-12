# ChargeGrid Intelligence

> Prova de conceito de um sistema inteligente de gerenciamento e tarifação de recargas para veículos elétricos.

Desenvolvido em parceria com a **GoodWe** como evolução do projeto open-source **ChargeGrid**, com foco no contexto comercial brasileiro, usando o carregador da FIAP como piloto.

---

## O Problema

Estações de recarga para veículos elétricos (EVs) enfrentam desafios que vão além da infraestrutura física:

- Sobrecargas na rede elétrica em horários de pico
- Falta de padronização entre equipamentos de diferentes fabricantes
- Ausência de sistemas de cobrança integrados e transparentes
- Desperdício de energia solar gerada localmente
- Experiência de uso ruim para o motorista

---

## A Solução

O ChargeGrid Intelligence é um ecossistema de software composto por cinco módulos:

| Módulo | Função |
|---|---|
| **SEMS+** | Monitora o consumo total e reduz automaticamente a potência dos carregadores para evitar sobrecarga |
| **Middleware OCPP** | Garante comunicação entre carregadores de diferentes fabricantes e versões do protocolo |
| **Billing** | Sistema de tarifação dinâmica por kWh, com prioridade para energia solar e cobrança integrada |
| **App do usuário** | Interface para localizar estações, iniciar sessão via QR Code e acompanhar a recarga em tempo real |
| **Gestão de energia** | Prioriza energia solar → rede fora do pico → rede no pico, seguindo as bandeiras tarifárias da ANEEL |

---

## Prova de Conceito — Módulo Billing

Esta entrega demonstra o funcionamento do módulo de **Billing**, responsável pela tarifação inteligente das sessões de recarga.

### O que foi implementado

Uma interface web interativa que simula uma sessão de recarga completa, do início ao recibo final.

### Fluxo do sistema

```
Usuário abre a interface
        │
        ▼
Sistema identifica fonte de energia disponível
  ├── Solar ativa → tarifa R$ 0,45/kWh
  ├── Rede fora do pico → tarifa R$ 0,75/kWh
  └── Rede horário de pico → tarifa R$ 1,20/kWh
        │
        ▼
Usuário inicia a sessão
        │
        ▼
Sistema calcula em tempo real:
  ├── kWh consumido = Potência (kW) × Tempo (h)
  ├── Custo acumulado = kWh × Tarifa ativa
  └── Nível da bateria do veículo
        │
        ▼
Usuário encerra a sessão
        │
        ▼
Sistema emite recibo com:
  ├── Consumo total (kWh)
  ├── Custo final
  ├── Economia gerada vs horário de pico
  └── CO₂ evitado em relação a um veículo a gasolina
```

### Lógica de tarifação

A tarifa é definida pela combinação de dois fatores: a **fonte de energia** e o **horário de uso**.

```
Prioridade 1 → Energia solar disponível     → R$ 0,45/kWh
Prioridade 2 → Rede elétrica fora do pico   → R$ 0,75/kWh  (00h–17h e 21h–23h59)
Prioridade 3 → Rede elétrica no horário de pico → R$ 1,20/kWh  (17h–21h)
```

Essa lógica segue as bandeiras tarifárias da **ANEEL** e incentiva o usuário a carregar quando há menor pressão sobre a rede.

### Cálculo de CO₂ evitado

O sistema estima o impacto ambiental da sessão com base em dados médios de emissão:

```
CO₂ evitado = kWh consumidos × 0,2 kg/kWh
```

Esse valor representa a diferença entre a emissão de um veículo a gasolina equivalente e a emissão da energia renovável utilizada na recarga.

---

## Energias Renováveis e Sustentabilidade

O módulo de Billing foi projetado para reforçar comportamentos sustentáveis:

- **Prioridade automática para solar:** quando há geração fotovoltaica local, o sistema a utiliza primeiro, reduzindo a dependência da rede e as emissões associadas.
- **Tarifação por horário:** tarifas menores fora do pico desestimulam o uso da rede em momentos de alta demanda, contribuindo para a estabilidade do sistema elétrico.
- **Transparência ambiental:** o recibo exibe o CO₂ evitado em cada sessão, tornando o impacto positivo visível para o usuário.
- **Integração com o ciclo solar:** a lógica de priorização respeita o período de geração solar (diurno), alinhando o consumo à disponibilidade de energia limpa.

---

## Como rodar

Não requer instalação. Basta abrir o arquivo no navegador:

```
index.html → abrir no navegador
```

Ou acessar diretamente pelo GitHub Pages, se publicado.

---

## Tecnologias utilizadas

- HTML5, CSS3 e JavaScript puro (sem dependências externas)
- Simulação em tempo real via `setInterval`
- Lógica de tarifação baseada nos protocolos OCPP e nas bandeiras tarifárias da ANEEL

---

## Arquitetura geral do projeto

```
ChargeGrid Intelligence
├── SEMS+              → controle de demanda (hardware / firmware)
├── Middleware OCPP    → interoperabilidade entre protocolos
├── Billing ◄          → esta entrega
├── App do usuário     → interface mobile
└── Gestão de energia  → integração solar + rede + bateria
```

---

## Contexto acadêmico

Projeto desenvolvido na FIAP em parceria com a GoodWe como parte do programa de desafios reais com empresas parceiras.
