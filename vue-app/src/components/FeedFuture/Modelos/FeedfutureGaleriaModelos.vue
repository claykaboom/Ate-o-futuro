<template>
    <div>
        <div class="columns">
        <div v-for="(model) in models" v-bind:key="model.id" 
          class="column is-12-mobile is-6-tablet is-4-widescreen is-6-desktop"
        >
          <div class="item post-card bottom-border">
            <a class="item-link" href="/the-editor/">
             <b-image
             :src="'https://source.unsplash.com/featured/?magic&'+ Math.random()"
            :alt="model.title"
            ratio="601by235"
  
        ></b-image>
             
            </a>
            <div class="item-tags">
              <a
                class="button tag-getting-started is-rounded"
                href="/tag/getting-started/"
                title="Getting Started"
                aria-label="Getting Starteds"
                >#Getting Started</a
              >
            </div>
            <h2 class="title item-title is-size-4 has-text-weight-extra-bold">
              <a class="item-link" href="/the-editor/"
                >{{model.title}}  </a
              >
            </h2>
            <div class="level">
              <div class="level-left">
                <div class="item-author">
                  <a href="/author/ghost/">Ghost</a>
                </div>
              </div>
              <div class="level-right">
                <time datetime="2020-12-22">Dec 22, 2020</time>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props:{
    models: {
      type: Array,
      default: function () {
        return [ ];
      },
    },
  }
}
</script>