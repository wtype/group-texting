<template>
  <main id="app">
    <Members :members="members" @addMember="addMember" />
    <Texting :membersToText="membersToText" @removeMember="removeMember" />
    <Message :membersToText="membersToText" @sendMessage="sendMessage" />
  </main>
</template>

<script>
import Members from "./components/Members";
import Texting from "./components/Texting";
import Message from "./components/Message";
import { members } from "./allMembers";

export default {
  name: "App",
  data() {
    return {
      members,
      membersToText: []
    };
  },
  components: {
    Members,
    Texting,
    Message
  },
  methods: {
    addMember(member) {
      if (this.membersToText.includes(member)) {
        console.log("already added", member.name, "to the text");
        return;
      }
      this.membersToText.push(member);
    },
    removeMember(member) {
      const index = this.membersToText.indexOf(member);
      this.membersToText.splice(index, 1);
    },
    sendMessage(message) {
      const url = "http://localhost:9090/send";

      const payload = {
        message,
        members: this.membersToText
      };

      fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "content-type": "application/json"
        }
      })
        .then(() => {})
        .catch(err => console.log(err));

      this.membersToText.forEach(member => (member.addedToText = false));
      this.membersToText = [];
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
  background: darkslategrey;
  color: white;
}
body {
  font-family: -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
  padding: 5vw;
  background: rgb(8, 10, 18);
  margin: auto;
  max-width: 1500px;
}
section {
  background: rgba(70, 70, 70, 0.15);
  margin-top: 4vw;
  padding: 4vw;
  border-radius: 0.02rem;
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
}
</style>
