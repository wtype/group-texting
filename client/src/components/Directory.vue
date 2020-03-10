<template>
  <div>
    <AddMember @nameChanged="nameChanged" @phoneChanged="phoneChanged" />
    <section>
      <h1>Directory</h1>
      <table>
        <tr>
          <th>Name</th>
          <th>Phone</th>
          <th id="remove">Remove</th>
        </tr>
        <tr v-if="name.length > 0 || phone.length > 0">
          <td>{{name}}</td>
          <td>{{phone}}</td>
        </tr>
        <tr v-for="member in members" :key="member.phone">
          <td>{{member.name}}</td>
          <td>{{member.phone}}</td>
          <td v-if="member.dateAdded" class="remove" @click="removeMember($event, member)">╳</td>
        </tr>
      </table>
    </section>
  </div>
</template>

<script>
import AddMember from "./AddMember";
import { eventBus } from "../main";

export default {
  data() {
    return {
      name: "",
      phone: "",
      members: this.$route.params.members
    };
  },
  components: { AddMember },
  created() {
    eventBus.$on("membersLoaded", members => {
      this.members = members;
    });
  },
  methods: {
    nameChanged(value) {
      this.name = value;
    },
    phoneChanged(value) {
      this.phone = value;
    },
    removeMember(e, member) {
      const id = member._id;
      const url = `http://localhost:9090/delete/?id=${id}`;
      fetch(url, {
        method: "DELETE"
      })
        .then(() => {
          eventBus.$emit("updateMembers", this.members);
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style scoped>
table {
  margin-top: 2rem;
  width: 100%;
  color: rgb(128, 128, 128);
  border-collapse: collapse;
  cursor: default;
}
th,
td,
tr {
  text-transform: capitalize;
  padding: 0.65rem;
  text-align: left;
  font-size: 1.5rem;
  border: 1.5px solid rgb(128, 128, 128, 0.5);
}
th {
  padding: 0.3rem 0.65rem;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
}
th:after {
  content: ":";
}
tr:hover :not(th) {
  color: white;
  background: rgba(40, 40, 40, 0.65);
}
#remove {
  width: 0;
}
.remove {
  text-align: center;
  cursor: pointer;
}
.remove:hover {
  color: rgb(255, 80, 78);
}
</style>