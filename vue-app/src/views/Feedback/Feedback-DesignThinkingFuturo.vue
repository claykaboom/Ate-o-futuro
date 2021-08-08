<template>
  <layout-default>
    <vue-headful
      title="Como foi o nosso evento?"
      description="Como foi o nosso evento?"
    />
    <div class="box">
      Podemos ouvir um pouco de você?
      <iframe
        :src="`https://docs.google.com/forms/d/e/1FAIpQLSeOMnpnHviyxgRLMF_Gx6_PRhTNP5-zE3wVb5dyXNkbnAkxvg/viewform?usp=pp_url&entry.833965079=${$route.params.IdEvento}`"
        width="100%"
        height="1850"
        frameborder="0"
        marginheight="0"
        marginwidth="0"
        >Carregando…</iframe
      >
    </div>
  </layout-default>
</template>