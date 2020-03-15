<template>
  <section>
    <h1>Members</h1>
    <ul>
      <li
        v-for="member in members"
        :class="member.addedToText ? 'added' : null"
        :key="member.phone"
        @click="addMember(member)"
      >
        {{ member.name }}
      </li>
    </ul>
    <button class="little" @click="addAllMembers">Add all</button>
  </section>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  computed: mapState(["members"]),
  methods: {
    ...mapMutations(["addMember", "addAllMembers"]),
    ...mapActions(["loadMembers"])
  },
  created() {
    this.loadMembers();
  }
};
</script>

<style scoped>
li {
  text-transform: capitalize;
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
