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
            {{ contributor.miniBio }}<br />
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
            'Conhecido por dizer "Até o Futuro", é solucionador de  problemas e curioso por tecnologia e como ela pode destravar e potencializar as ações humanas.',
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
            "Apaixonada por desenvolvimento humano e gosto muito de trabalhar com pessoas. Sou coach e executiva na área de Recursos Humanos. Aprender coisas novas me encanta. Sou uma  eterna aprendiz.",

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
      ],
    };
  },
};
</script>