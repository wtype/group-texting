<template>
  <div>
    <header>
      <nav>
        <ul>
          <li>
            <a @click.prevent="currentComponent = 'Message'" href>Message</a>
          </li>
          <li>
            <a @click.prevent="currentComponent = 'Directory'" href>Directory</a>
          </li>
        </ul>
      </nav>
    </header>
    <keep-alive>
      <component :is="currentComponent" :members="members" :membersToText="membersToText">
        <h1>{{ currentComponent }}</h1>
      </component>
    </keep-alive>
  </div>
</template>

<script>
import Message from "./components/Message";
import Directory from "./components/Directory";

export default {
  name: "App",
  components: {
    Message,
    Directory
  },
  data() {
    return {
      currentComponent: "Message",
      members: [],
      membersToText: []
    };
  },
  created() {
    this.loadMembers();
    this.$on("updateMembers", () => this.loadMembers());
  },
  methods: {
    loadMembers() {
      const url = "http://localhost:9090/directory";
      fetch(url)
        .then(response => response.json())
        .then(members => {
          this.members = members;
        });
    }
  }
};
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
:root {
  font-size: 16px;
}
*:focus,
*:active {
  outline: none;
}
::selection {
  background: rgb(152, 240, 255);
  color: black;
}
body {
  font-family: -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
  padding: 0 5vw 5vw 5vw;
  background: rgb(8, 10, 18);
  margin: 0 auto;
  max-width: 1500px;
  overflow-x: hidden;
}
section {
  background: rgba(70, 70, 70, 0.15);
  margin-top: 4vw;
  padding: 4vw;
  border-radius: 0.02rem;
  position: relative;
}
h1 {
  color: white;
  font-size: 2.5rem;
}
ul {
  list-style: none;
  margin: 2rem 0rem;
  display: flex;
  flex-wrap: wrap;
}
li {
  font-size: 1.5rem;
  padding: 0.8rem 2rem;
  border-radius: 0.02rem;
  margin-right: 0.35rem;
  margin-bottom: 0.35rem;
  cursor: pointer;
  transition: 110ms ease;
}
header ul {
  justify-content: flex-end;
}
header ul li {
  padding: 0;
  margin: 0;
  margin-bottom: 0.5rem;
}
header ul li a {
  transition: 110ms ease;
  padding: 2rem;
  text-decoration: none;
  color: rgb(128, 128, 128);
}
header ul li a:hover {
  color: white;
  background: rgba(70, 70, 70, 0.15);
  box-shadow: 0px 0px 0px 3px rgba(40, 40, 40, 0.35);
}
.little {
  border-radius: 0.02rem;
  font-size: 1rem;
  padding: 0.25rem 1rem;
  position: absolute;
  right: 0.68rem;
  bottom: 0.68rem;
  background: rgba(70, 70, 70, 0.35);
  border: none;
  color: rgb(128, 128, 128);
  filter: brightness(1.5);
  cursor: pointer;
  transition: 110ms ease;
}
.little:hover {
  filter: brightness(2);
}
@media (min-width: 1200px) {
  body {
    padding: 0 5vw;
  }
  section {
    margin-top: 2vw;
  }
}
@media (max-width: 650px) {
  :root {
    font-size: 11px;
  }
  button {
    font-size: 1.5rem;
  }
}
</style>
