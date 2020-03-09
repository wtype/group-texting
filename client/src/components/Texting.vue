<template>
  <section>
    <h1>Texting</h1>
    <ul>
      <li
        v-for="member in membersToText"
        :key="member.name"
        @click="removeMember(member)"
      >{{member.name}}</li>
    </ul>
  </section>
</template>

<script>
export default {
  props: ["membersToText"],
  data() {
    return {};
  },
  methods: {
    removeMember(member) {
      this.$emit("removeMember", member);
      member.addedToText = false;
    }
  }
};
</script>

<style scoped>
li {
  background: rgb(122, 204, 255);
}
li:hover {
  background: rgb(152, 240, 255);
  box-shadow: 0px 0px 0px 3.5px rgb(129, 206, 220);
}
</style>