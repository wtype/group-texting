<template>
  <section>
    <h1>Add Member</h1>
    <form @submit.prevent="addMember">
      <input name="name" v-model="name" type="text" placeholder="Name" maxlength="50" required />
      <input
        name="phone"
        v-model="phone"
        type="text"
        placeholder="Number"
        maxlength="10"
        minlength="10"
        required
      />
      <button type="submit">Add Member</button>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      phone: "",
      members: this.$route.params.members
    };
  },
  watch: {
    name(value) {
      this.$emit("nameChanged", value);
    },
    phone(value) {
      this.$emit("phoneChanged", value);
    }
  },
  mounted() {
    // this.loadDirectory();
  },
  methods: {
    isNumber(input) {
      const regex = /[0-9]/g;
      const found = input.toString().match(regex);
      if (found === null) {
        return false;
      }
      if (found.length === input.length) {
        return true;
      }
    },
    addMember() {
      const url = "http://localhost:9090/directory";

      if (!this.isNumber(this.phone)) {
        alert(
          "Please enter a valid number: no characters, parantheses, or dashes"
        );
        return;
      }

      const info = {
        name: this.name,
        phone: this.phone
      };

      console.log(info.name, info.phone);
      console.log(JSON.stringify(info));

      fetch(url, {
        method: "POST",
        body: JSON.stringify(info),
        headers: {
          "content-type": "application/json"
        }
      })
        .then(response => console.log(response))
        .catch(err => console.log(err));
    }
  }
};
</script>

<style scoped>
form {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
}
input {
  margin-top: 1rem;
  font-family: inherit;
  font-size: 2rem;
  color: white;
  border: none;
  background: rgba(70, 70, 70, 0.15);
  box-shadow: 0px 0px 0px 2px rgb(65, 65, 65);
  padding: 1em;
  width: 100%;
  border-radius: 0.02rem;
  transition: 110ms ease;
}
button {
  cursor: pointer;
  background: rgb(104, 104, 104);
  border: none;
  font-size: 2rem;
  padding: 2rem 3rem;
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;
  border-radius: 0.02rem;
  transition: 110ms ease;
}
button:hover {
  background: rgb(122, 204, 255);
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