<template>
  <section>
    <h1>Messages</h1>
    <table>
      <tr>
        <th>To</th>
        <th>Message</th>
        <th>Sent</th>
      </tr>
      <tr v-for="text in texts" :key="text._id">
        <td>
          <span v-for="member in text.members" :key="member.phone">{{member.name | capitalize}}</span>
        </td>
        <td id="message">{{ text.message }}</td>
        <td v-if="text.dateSent">{{ text.dateSent }}</td>
        <td v-else>No date available</td>
      </tr>
    </table>
  </section>
</template>

<script>
export default {
  data() {
    return {
      texts: []
    };
  },
  methods: {
    loadTexts() {
      const url = "http://localhost:9090/texts";
      try {
        fetch(url)
          .then(response => response.json())
          .then(texts => {
            this.texts = texts;
          });
      } catch (error) {
        console.log(error);
      }
    }
  },
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  },
  mounted() {
    this.loadTexts();
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
  padding: 0.65rem;
  text-align: left;
  font-size: 1.5rem;
  border: 1.5px solid rgb(128, 128, 128, 0.5);
  font-size: 1rem;
}
td span {
  margin-right: 0.25rem;
}
td span::after {
  content: ",";
}
td span:last-child:after {
  content: "";
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
</style>
