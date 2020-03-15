<template>
  <section>
    <h1>Texting</h1>
    <ul>
      <li v-for="member in membersToText" :key="member.phone" @click="removeMember(member)">{{ member.name }}</li>
    </ul>
    <button class="little" @click="removeAllMembers">Remove all</button>
  </section>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  computed: mapState(["members", "membersToText"]),
  methods: mapMutations(["removeMember", "removeAllMembers"])
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
