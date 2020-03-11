<template>
  <section>
    <h1>Texting</h1>
    <ul>
      <li
        v-for="member in membersToText"
        :key="member.phone"
        @click="removeMember(member)"
      >{{member.name}}</li>
    </ul>
    <button class="little" @click="removeAll">Remove all</button>
  </section>
</template>

<script>
export default {
  props: ["members", "membersToText"],
  data() {
    return {};
  },
  methods: {
    removeMember(member) {
      member.addedToText = false;
      const index = this.membersToText.indexOf(member);
      this.membersToText.splice(index, 1);
    },
    removeAll() {
      this.membersToText.forEach(member => {
        member.addedToText = false;
      });
      this.membersToText.splice(0, this.membersToText.length);
    }
  }
};
</script>

<style scoped>
li {
  text-transform: capitalize;
  background: rgb(122, 204, 255);
}
li:hover {
  background: rgb(152, 240, 255);
  box-shadow: 0px 0px 0px 3.5px rgb(129, 206, 220);
}
</style>