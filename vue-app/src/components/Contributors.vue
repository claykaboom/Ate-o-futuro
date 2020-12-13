<template>
  <div>
    <b-message
      type="is-info"
      v-for="contributor in contributors"
      :key="contributor.name"
      ><div class="columns">
        <div class="column is-one-fifth">
          <b-image
            :src="contributor.photoUrl"
            :alt="contributor.name"
            :rounded="false"
          ></b-image>
        </div>
        <div class="column">
          <h2 class="subtitle">
            <a
              style="color: black"
              :href="contributor.linkedIn"
              target="blank"
              >{{ contributor.name }}</a
            >
          </h2>
          <p>
            {{ contributor.miniBio }}<br /><br />
            <b-taglist>
              <b-tag
                type="is-warning"
                v-for="tag in contributor.Areas"
                :key="tag"
                >{{ tag }}</b-tag
              >
            </b-taglist>
            <br />
            <br />
            <a :href="contributor.linkedIn" target="blank">
              <b-button type="is-info is-large" icon-left="linkedin"
                >Conecte-se</b-button
              ></a
            >
          </p>
        </div>
      </div>
    </b-message>
  </div>
</template>
<script>
export default {
  name: "contributors",
  data: function () {
    return {
      contributors: [
        {
          name: "Clayton N. Freitas",
          linkedIn: "https://www.linkedin.com/in/claytonfreitas/",
          photoUrl:
            "https://media-exp1.licdn.com/dms/image/C4D03AQG-cze3-YHXfA/profile-displayphoto-shrink_200_200/0?e=1608768000&v=beta&t=r2Fn9VlqIGtGXRJ_JeZeMQs6BOjJpdc6B3ZrORMA2jE",
          miniBio:
            'Conhecido por dizer "Até o Futuro", é solucionador de  problemas e curioso por tecnologia e como ela pode destravar e potencializar as ações humanas. Perguntador e curioso, parece ser criativo, mas é mais colaborativo e procura despertar a criatividade do time.',
          Areas: [
            "Idiomas",
            "Comunicação",
            "Criatividade",
            "Colaboração",
            "Desenvolvimento de Software",
            "Comunicação Corporativa",
            "Gamification",
            "Pitch de Negócios",
            "Discurso",
            "Prática para Entrevista",
            "Arquitetura de TI",
            "Arquitetura de Corporativa",
            "Educação",
            "OKRs",
            "Experimentação",
            "Lean Startup",
            "Agilidade",
            "Desenvolvimento Humano",
            "Meta-aprendizado",

            "Inovação",
            "Apresentações",
            "Falar em público",
            "Storytelling",
            "RPA - Robotic Process Automation",
            "Inovação aberta",
            "Trabalho em equipe",
          ],
        },
        {
          name: "Guilherme H. Miranda",
          linkedIn: "https://www.linkedin.com/in/guilherme-h-miranda/",
          photoUrl:
            "https://media-exp1.licdn.com/dms/image/C4D03AQGXJXYsv4RI-w/profile-displayphoto-shrink_800_800/0?e=1609977600&v=beta&t=7MpWVnPOhL0zuRLFy5h8I_y56c3mJKlUzKFjeNEi9g0",
          miniBio:
            "Apaixonado por ciências exatas, por desenvolvimento de pessoas, construção de times e trabalho em equipe. Pai de três filhos (por enquanto), marido de uma esposa e sempre interessado em aprender coisas novas.",

          Areas: [
            "Agilidade",
            "Kanban",
            "Scrum",
            "Liderança",
            "Parenting",
            "Matemática",
            "Comunicação",
            "Gestão de Pessoas",
            "Treinamento",
            "Desenvolvimento Humano",
          ],
        },
        {
          name: "Sandra Leite",
          linkedIn: "https://www.linkedin.com/in/sandra-leite-8a938a/",
          photoUrl:
            "https://media-exp1.licdn.com/dms/image/C4D03AQFCnDqJsSofwg/profile-displayphoto-shrink_800_800/0?e=1609977600&v=beta&t=BMf7dMsQKaJWUZpz4xTgtgrv9OSt8zvMAz26xjZ3Ikc",
          miniBio:
            '"Apaixonada por desenvolvimento humano e gosto muito de trabalhar com pessoas. Sou coach e executiva na área de Recursos Humanos. Aprender coisas novas me encanta. Sou uma  eterna aprendiz."',

          Areas: [
            "RH",
            "Colaboração",
            "Coaching",
            "Liderança",
            "Recrutamento",
            "Entrevista",
            "Prática para Entrevista",
            "Carreira",
            "Gestão de Pessoas",
            "Desenvolvimento Humano",
            "Aprendizagem",
          ],
        },
        {
          name: "Fellipe Bonilha",
          linkedIn: "https://www.linkedin.com/in/fellipe-bonilha/",
          photoUrl:
            "https://media-exp1.licdn.com/dms/image/C4D03AQEf9ObvRgIiRw/profile-displayphoto-shrink_800_800/0?e=1611187200&v=beta&t=evFhq_9t2BZBRND1-x9zNzgWf7oUhLQdXAg2pwAW8TY",
          miniBio:
            "Adora bater um papo e conhecer pessoas, investir em amizades de qualidade e de longa duração. Contador de histórias, jornalista, tecnologista. Trabalha hoje com Automação Robótica de Processos para fazer com que mais produtividade seja entregue às empresas.",

          Areas: [
            "Inovação",
            "Apresentações",
            "Falar em público",
            "Storytelling",
            "RPA - Robotic Process Automation",
            "Inovação aberta",
            "Trabalho em equipe",

            "Marketing pessoal ",
            "Negociação",
            "Gestão de Pessoas",

            "Processos ITIL",
            "Gestão de Projetos",
            "Liderança",
          ],
        },
        {
          name: "Carolina Piovesan Tuneli",
          linkedIn:
            "https://www.linkedin.com/in/carolina-piovesan-tuneli-a9bb4051/",
          photoUrl:
            "https://media-exp1.licdn.com/dms/image/C4D03AQFieieELYe-og/profile-displayphoto-shrink_200_200/0?e=1611187200&v=beta&t=qjs_PSWj3arIgl72tXWik_1NSwH8dtps3UEdbIzmzmg",
          miniBio: `Uma vez me perguntaram:  “Você sabe quem você é, sem falar onde você trabalha e o que estuda?”. Com base na Análise de Perfil Comportamental, eu ajudo pessoas a  se conhecerem melhor, a saber por quê reagem de determinadas maneiras, a identificar seus maiores motivadores, ter flexibilidade na comunicação e entender seus sentimentos, porque isso ajuda a gente a ter uma melhor performance em várias áreas da vida no nosso dia a dia. Vamos trabalhar juntos para mudar isso e ser mais conscientes sobre o nosso EU!  `,

          Areas: [
            "Colaboração",
            "Coaching",
            "Liderança",
            "Entrevista",
            "Carreira",
            "Gestão de Pessoas",
            "Desenvolvimento Humano",
          ],
        },
        {
          name: "Fernando Bittencourt",
          linkedIn: "https://www.linkedin.com/in/fghbittencourt/",
          photoUrl:
            "https://media-exp1.licdn.com/dms/image/C4D03AQGe90aS2Zjiuw/profile-displayphoto-shrink_800_800/0?e=1612396800&v=beta&t=Q8MenaDj95QZCHvCxcMlPIcemrEpCd9i3orn2-4CW5E",
          miniBio: `Gosto de me definir como bom aprendiz e curioso. Amante de viagens e culturas diferentes, atualmente ganho a vida com tecnologia. Neste ramo gosto muito de Arquitetura e Engenharia de Softwares corporativos. Gosto de ensinar e tenho orgulho de pensar que muitas pessoas que passaram por minhas equipes hoje ocupam boas posições no mercado de TI. Acredito que a melhor maneira de aprender algo é você ensinar isto a alguém.`,

          Areas: [
            "Arquitetura de Software",
            "Engenharia de Software",
            "Varejo",
            "Franchising - Fraquias e Franqueamento",
            "SDLC - Systems Development Life Cycle",
            "Gestão de Times",
            "Inovação",
            "Viagens",
            "Desenvolvimento Humano",
          ],
        },
        {
          name: "Graziela Rodrigues",
          linkedIn: "https://www.linkedin.com/in/graziela-rodrigues-19516a55/",
          photoUrl:
            "https://media-exp1.licdn.com/dms/image/C5103AQFk0EqQe6DsUw/profile-displayphoto-shrink_800_800/0?e=1612396800&v=beta&t=kzaHWgu0lFQJNhd065pOkQ_uPYNvRAVmBDuowl-bJWE",
          miniBio: `Mãe coruja de uma menina arteira e de um menino espoleta. Também é apaixonada pelo desenvolvimento humano nos aspectos biopsicossociais. Além disso, como é muito curiosa e inquieta, está sempre estudando para sanar os questionamentos que surgem ao longo da vida e, ao mesmo tempo, aprimorar seu próprio desenvolvimento pessoal e profissional. Atua como professora e gestora de pessoas e projetos nas áreas da saúde e da educação.`,

          Areas: [
            "Desenvolvimento Humano",
            "Liderança",
            "Gestão de Projetos",
            "Gestão de Processos",
            "Planejamento Estratégico",
            "Criatividade",
            "Pesquisa",
            "Educação ao longo da vida",
            "Capacitação de Recursos Humanos",
            "Cuidados da Saúde",
            "Envelhecimento Humano",
            "Gerontologia",
          ],
        },
        {
          name: "Fabiano Romão",
          linkedIn: "https://www.linkedin.com/in/fabiano-rom%C3%A3o-91717b1b1/",
          photoUrl:
            "https://media-exp1.licdn.com/dms/image/C4E03AQEC3D_hfC0SAw/profile-displayphoto-shrink_200_200/0?e=1612396800&v=beta&t=Pt-uFk7c6aOooJhGy9lMYv441Q-RvNDml2Pmk9chzeQ",
          miniBio: `Como todo aliado aos "porquês" nas mais variadas facetas da vida, tenho o privilégio de notar as nuances nas personalidades das pessoas que causam desentendimentos entre elas. Dessa forma, tento oferecer uma visão sobre tais nuances a fim de contribuir nas relações interpessoais, diminuindo atritos nos mais diversos formatos e ainda cooperando para que você possa se tornar alguém melhor relacionado.`,

          Areas: [
            "Poesia",
            "Xadrez",
            "Oratória",
            "Relações interpessoais",
            "Relações sociais",
            "Relacionamentos",
            "Falar em público",
            "Discurso",
            "Persuasão",
          ],
        },
        {
          name: "Alexandre Veronezi",
          linkedIn: "https://www.linkedin.com/in/alexandreveronezi",
          photoUrl:
            "https://media-exp1.licdn.com/dms/image/C4E03AQFoZVqsF6ahXQ/profile-displayphoto-shrink_200_200/0?e=1612396800&v=beta&t=RTWp_5Yk2-pjhl5N6efdFKUkCbBphPTrr3KGFOYjI5k",
          miniBio: `Sou um privilegiado por ter tido pessoas que me ajudaram ao longo da vida a ser quem eu sou e a chegar onde estou hoje. Hoje sou marido, sou pai, sou filho, sou irmão e sou "tech guy", apaixonado por minha família e por tecnologia aplicada a resolução de problemas. Sou líder de equipes multidisciplinares e multiculturais e eu acredito no potencial do ser humano e trabalho no desenvolvimento de pessoas para atingir objetivos. Considero-me um eterno aprendiz e que conhecimento é algo que deva ser compartilhado. O que vamos aprender juntos hoje?`,

          Areas: [
            "TI - Tecnologia da Informação",
            "Comunicação",
            "Inovação",
            "Digitalização",
            "Colaboração",
            "Comunicação Corporativa",
            "Prática para Entrevista",
            "Liderança",
            "Desenvolvimento Humano",
            "Segurança da Informação",
            "Trabalho em equipe",
            "Gestão de pessoas",
            "Diversidade Cultural",
          ],
        },
        {
          name: "Niudo Freitas",
          linkedIn: "https://www.linkedin.com/in/niudo-freitas-193a6012/",
          photoUrl:
            "https://media-exp1.licdn.com/dms/image/C4D03AQH58E22qr0gzQ/profile-displayphoto-shrink_800_800/0?e=1612396800&v=beta&t=WxsWv3xuyQDEybhLxMN-YUipZw8d_1Y3quqeeh1qKOU",
          miniBio: `Entusiasta do Cooperativismo & Parcerias voltados para empreendimentos socioambientais; pesquisador com foco no desenvolvimento de novos produtos sustentáveis à base de polímeros termoplásticos. Educador Ambiental e idealizador da "Maratona do Lixo" e do "Banco Socioambiental" para o qual procura estruturar uma equipe composta por pessoas apaixonadas pelo "Socioambientalismo Sustentável" visando implementar a plataforma e torná-lo monetizável e escalável; experiência em levantamento de requisitos para produção de sistemas de gestão empresarial, desenvolvedor de sistema de gestão de manufatura e do ERP GRID. Estudante dos Processos de Raciocínio da Teoria das Restrições (TOC), e agraciado por ter tido como instrutor o próprio Dr. Eliyahu Goldratt criador da TOC, em New Haven, CT,USA.`,

          Areas: [
            "TI - Tecnologia da Informação",
            "Idiomas",
            "Inovação",
            "Oratória",
            "Colaboração",
            "Varejo",
            "Meta-aprendizado",
            "Clareza de Demonstração de Ideias",
            "Falar em público",
            "Negociação",
            "Pitch de Negócios",
            "Trabalho em equipe",
            "Criatividade",
            "Raciocínio Analítico",
            "Inglês",
            "Persuasão",
            "Educação",
            "Aprendizagem",
            "TOC - Teoria das Restrições",
          ],
        },
        {
          name: "Natália Strassacapa Reis",
          linkedIn:
            "https://www.linkedin.com/in/nat%C3%A1lia-strassacapa-reis-86058084/",
          photoUrl:
            "https://media-exp1.licdn.com/dms/image/C4D03AQG0MbC9u5hOAA/profile-displayphoto-shrink_800_800/0/1518534322784?e=1612396800&v=beta&t=DA26x22abmgCAxtS8eWyNIYOb1cLuaIghSS2pDKMIpw",
          miniBio: `Conhecida por ser uma pessoa tranquila e determinada, tem perfil observador e está sempre disposta a ouvir o que os outros têm para falar, entendendo o ponto de vista deles. Curiosa, busca entender como as coisas funcionam e atualmente trabalha com tecnologia. Não gosta de começar algo e não terminar e se sente feliz em ajudar as pessoas e trabalhar em equipe.`,

          Areas: [
            "Criatividade",
            "Colaboração",
            "RPA - Robotic Process Automation",
            "Trabalho em equipe",
            "Inovação",
            "Lógica de Programação",
            "TI - Tecnologia da Informação",
          ],
        },
        {
          name: "Cleiton Claudino",
          linkedIn:
            "https://www.linkedin.com/in/cleitonclaudinosantos/",
          photoUrl:
            "https://media-exp1.licdn.com/dms/image/C4D03AQGJvkqPiESRRg/profile-displayphoto-shrink_800_800/0/1574417484663?e=1613606400&v=beta&t=kyJ3Jii9YkQpEvrQrqkf9aVpscpCthithWTNKSCJdkk",
          miniBio: `O caminho para se comunicar de maneira mais efetiva não é apenas desvendar como as pessoas agem, mas por que elas agem de determinada forma. Imagine que você consiga interpretar as motivações das pessoas, até onde isso poderia te levar? Talvez evitar uma guerra, não é mesmo? 
Essa não é a minha pretensão, sou apenas um comercial que busca ajudar as pessoas. Se você procura alguma orientação específica sobre como entender os porquês de determinados comportamentos, me procure e estarei pronto para te dar uma mãozinha. 
Com formação em TI e marketing e com mais de uma década de experiência na área comercial, Cleiton poderá ajudá-lo a melhorar suas skills comportamentais.`,

          Areas: [
            "Criatividade",
            "Colaboração",
            "Vendas",
            "Comunicação",
            "Inovação",
            "Digitalização",
            "TI - Tecnologia da Informação",
            "Discurso",
          ],
        },
      ],
    };
  },
};
</script>