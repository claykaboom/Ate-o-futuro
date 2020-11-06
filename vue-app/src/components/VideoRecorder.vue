<template>
  <div>
    <div v-if="videoData != null">
      <b>Seu vídeo</b>
      <br />
      <video class="preview" :src="video" controls></video>

      <br />

      <button @click="remove" class="button is-danger">Trocar o Vídeo</button>
      <button @click="onUpload" class="button is-primary">Upload</button>
    </div>

    <b-field v-if="videoData == null">
      <b-upload
        accept="video/*"
        v-model="dropFiles"
        @input="previewVideo"
        drag-drop
      >
        <section class="section">
          <div class="content has-text-centered">
            <p>
              <b-icon icon="upload" size="is-large"></b-icon>
            </p>
            <p>Arraste o seu vídeo ou clique para fazer upload</p>
          </div>
        </section>
      </b-upload>
    </b-field>
    <div v-if="isUploading">
      <div>
        <p>
          <b-progress
            :value="uploadValue"
            show-value
            format="percent"
          ></b-progress>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "VideoRecorder",
  props: ["IdFeedBackRequest", "StoredPath"],
  event: "uploadComplete",
  data() {
    return {
      dropFiles: null,
      videoData: null,
      video: null,
      uploadValue: 0,
      isUploading: false,
    };
  },
  mounted() {},
  methods: {
    previewImage(event) {
      this.uploadValue = 0;
      this.video = null;
      this.videoData = event.target.files[0];
      this.selectedFile = event.target.files[0];

      var input = event.target;
      // Ensure that you have a file before attempting to read it
      if (input.files && input.files[0]) {
        // create a new FileReader to read this image and convert to base64 format
        var reader = new FileReader();
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = (e) => {
          // Note: arrow function used here, so that "this.videoData" refers to the videoData of Vue component
          //aqui é onde eu setaria a url da imagem que estou manipulando, mas como ela é um objeto do tipo categoria não sei como acessar essa propriedade dela
          this.video = e.target.result;
        };
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsDataURL(input.files[0]);
      }
    },
    previewVideo() {
      this.uploadValue = 0;
      var thisVM = this;
      this.videoData = null;

      // Ensure that you have a file before attempting to read it
      if (this.dropFiles) {
        // create a new FileReader to read this image and convert to base64 format
        var reader = new FileReader();
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = (e) => {
          // Note: arrow function used here, so that "this.videoData" refers to the videoData of Vue component
          //aqui é onde eu setaria a url da imagem que estou manipulando, mas como ela é um objeto do tipo categoria não sei como acessar essa propriedade dela
          thisVM.video = e.target.result;
        };
        // Start the reader job - read file as a data url (base64 format)
        thisVM.videoData = this.dropFiles;
        reader.readAsDataURL(this.dropFiles);
      }
    },

    remove() {
      this.videoData = null;
      this.video = null;
    },
    onUpload() {
      //  this.video = null;
      var thisVM = this;
      thisVM.$root.startLoading();
      thisVM.isUploading = true;
      //const storageRef=firebase.storage().ref(this.$route.params.time`/${this.videoData.name}`).put(this.videoData);
      const storageRef = firebase
        .storage()
        .ref("FeedbackRequests/" + thisVM.IdFeedBackRequest + "/video.mp4")
        .put(this.videoData);
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (this.uploadValue == 100) {
            thisVM.$root.stopLoading();
            thisVM.isUploading = false;
          }
        },
        (error) => {
          this.$buefy.dialog.alert({
            message: `Ocorreu um erro! Seu vídeo não foi carregado 😢. Detalhes: ${error}`,
            onConfirm: () => {},
          });
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.video = url;
            this.$emit("uploadComplete", url);
            thisVM.$root.stopLoading();
          });
        }
      );
    },
  },
};
</script>