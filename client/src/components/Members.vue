<template>
  <section>
    <h1>Members</h1>
    <ul>
      <li
        v-for="member in members"
        :class="member.addedToText ? 'added' : null"
        :key="member.name"
        @click="addMemberToText(member)"
      >{{member.name}}</li>
    </ul>
    <button class="little" @click="addAll">Add all</button>
  </section>
</template>

<script>
export default {
  props: ["members"],
  data() {
    return {};
  },
  methods: {
    addMemberToText(member) {
      this.$emit("addMember", member);
      member.addedToText = true;
    },
    addAll() {
      this.members.forEach(member => {
        this.addMemberToText(member);
        member.addedToText = true;
      });
    }
  }
};
</script>

<style scoped>
li {
  background: rgb(233, 242, 190);
}
li:hover {
  background: rgb(222, 237, 137);
  box-shadow: 0px 0px 0px 3.5px rgb(192, 205, 122);
}
.added {
  background-color: rgba(128, 128, 128, 0.577);
  cursor: not-allowed;
}
.added:hover {
  background: rgba(128, 128, 128, 0.577);
  box-shadow: none;
}
</style>