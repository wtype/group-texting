<template>
  <section>
    <form>
      <textarea
        name="message"
        v-model="message"
        maxlength="1000"
        rows="10"
        placeholder="Enter text message here..."
        type="text"
      ></textarea>
      <button
        v-if="membersToText.length > 0 && message.length > 0"
        type="submit"
        @click.prevent="sendMessage"
      >Send</button>
      <small v-else-if="membersToText.length > 0">Please add a text message...</small>
      <small v-else-if="message.length > 0">Please add recipients...</small>
      <small v-else>Please add recipients and a text message to send a text...</small>
    </form>
  </section>
</template>

<script>
export default {
  props: ["membersToText"],
  data() {
    return {
      message: ""
    };
  },
  methods: {
    sendMessage() {
      this.$emit("sendMessage", this.message);
      document.querySelector("form").reset();
      this.message = "";
    }
  }
};
</script>

<style scoped>
section {
  padding: 0;
  background: none;
}
form {
  display: flex;
  flex-direction: column;
}
textarea {
  font-family: inherit;
  font-size: 2rem;
  color: white;
  border: none;
  background: rgba(70, 70, 70, 0.15);
  box-shadow: 0px 0px 0px 2px rgb(65, 65, 65);
  resize: vertical;
  padding: 1em;
  width: 100%;
  border-radius: 0.02rem;
  transition: 110ms ease;
}
textarea:hover,
textarea:focus {
  box-shadow: 0px 0px 0px 2px rgb(104, 104, 104);
}
button {
  cursor: pointer;
  background: rgb(104, 104, 104);
  border: none;
  font-size: 2rem;
  padding: 2rem 3rem;
  margin-top: 4vw;
  border-radius: 0.02rem;
  transition: 110ms ease;
}
button:hover {
  background: rgb(122, 204, 255);
}
small {
  font-size: 1.2rem;
  padding: 2rem 0;
  color: rgb(104, 104, 104);
}
@media (min-width: 960px) {
  form {
    justify-content: flex-end;
  }
  button {
    width: 30%;
  }
}
</style>