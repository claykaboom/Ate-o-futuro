<template>
  <div class="box">
    <section class="hero">
      <figure class="image">
        <img
          src="https://cdn.pixabay.com/photo/2017/07/02/09/53/office-2463928_960_720.jpg"
        />
      </figure>
    </section>

    <section class="section">
      <div class="container has-text-centered">
        <h2 class="title">Peça Feedbacks</h2>
        <p>
          Criamos um local onde você pode pedir feedbacks gratuitos sobre suas
          habilidades.
          <router-link :to="{ name: 'SkillFeedback' }">Clique aqui para testar </router-link>
        </p>
      </div>
    </section>
  </div>
</template>


